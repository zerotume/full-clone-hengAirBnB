const express = require('express');
const router = express.Router();
const {Spot, Image, Review, User, Booking, sequelize} = require('../../db/models');
const {setTokenCookie, restoreUser, requireAuth, AuthorCheck, refuseOwner, spotReq,spotImgReq} = require('../../utils/auth.js');
const {handleValidationErrors} = require('../../utils/validation.js');
const {check} = require('express-validator');
const user = require('../../db/models/user');
const { Op } = require('sequelize');
const { ResultWithContext } = require('express-validator/src/chain');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

// const validateBooking = [
//     check('startDate')
//         .exists({checkFalsy:true})
//         .notEmpty()
//         .isDate()
//         .withMessage('Start date YYYY-MM-DD is required'),
//     check('endDate')
//         .exists({checkFalsy:true})
//         .notEmpty()
//         .isInt({min:1, max:5})
//         .withMessage('End date YYYY-MM-DD is required'),
//     handleValidationErrors
// ];

// let imgExt = [
//     '.bmp',
//     '.tif',
//     '.tiff',
//     '.jpg',
//     '.jpeg',
//     '.gif',
//     '.png',
//     '.eps',
//     '.raw'];

const validateImage = [
    check('url')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Url must be a valid picture url'),
    handleValidationErrors
];

router.post('/:id/images', singleMulterUpload("image"), restoreUser, requireAuth, spotReq, AuthorCheck,
    async (req, res, next) => {
        // let {url} = req.body;
        let imgs = await Image.findAll({
            where:{
                spotId:req.params.id,
                imageType:'spot'
            },
            attributes:['id','url'],
            raw:true
        });
        if(imgs.length >= 5){
            const err = Error('Maximumly 5 images are permitted!');
            err.title = 'Maximumly 5 images are permitted!'
            err.message = 'Maximumly 5 images are permitted!';
            err.status = 400;
            return next(err);
        }
        const url = await singlePublicFileUpload(req.file);
        let reviewId = null;
        let spotId = req.spot.toJSON().id;
        let imageType = 'spot';
        let newImage;
        try{
            newImage = await Image.create({
                url,
                imageType,
                spotId,
                reviewId
            });
        }catch(err){
            next(err);
        }

        let result = await Image.findByPk(newImage.toJSON().id,{
            attributes:[
                'id',
                ['spotId','imageableId'],
                ['imageType','imageableType',],
                'url'
            ]
        });

        res.json(result);
    });

let d = new Date();
let today = d.toISOString().slice(0,10);

const validateBooking = [
    check('startDate')
        .exists({checkFalsy:true})
        .notEmpty()
        .isDate()
        .withMessage('Start date YYYY-MM-DD is required'),
    check('endDate')
        .exists({checkFalsy:true})
        .notEmpty()
        .isDate()
        .withMessage('End date YYYY-MM-DD is required'),
    handleValidationErrors
];

router.post('/:id/bookings', restoreUser, requireAuth, spotReq, refuseOwner,
    validateBooking, async (req,res,next) => {
        // console.log(req.body)
        let {startDate, endDate} = req.body;

        if(startDate < today || endDate < today){
            const err = Error('You cannot set the booking to the past.');
            err.title = 'You cannot set the booking to the past.'
            err.message = 'You cannot set the booking to the past.';
            err.status = 400;
            return next(err);
        }

        if(endDate < startDate){
            const err = Error('End date must be after the start date.');
            err.title = 'End date must be after the start date.';
            err.message = 'End date must be after the start date.';
            err.status = 400;
            return next(err);
        }

        let userId = req.user.toJSON().id;
        let spotId = req.spot.toJSON().id;

        const alredayBookings = bookings = await Booking.scope('notOwner').findAll({
            where:{spotId:spotId},
            raw:true
        });

        // console.log(alredayBookings);

        const conflict = alredayBookings.every(e => (startDate <= e.startDate && endDate <= e.startDate) ||
                                                    (startDate >= e.endDate && endDate >= e.endDate));

        if(!conflict){
            const err = Error('Booking conflict: this date interval is occupied.');
            err.title = 'Booking conflict: this date interval is occupied.'
            err.message = 'Booking conflict: this date interval is occupied.';
            err.status = 400;
            return next(err);
        }

        let newBooking;
        try{
            newBooking = await Booking.create({
                userId,
                spotId,
                startDate,
                endDate
            });
        }catch(e){
            if(e.name === 'SequelizeUniqueConstraintError'){
                const err = Error('Sorry, this spot is already booked for the specified dates');
                err.title = 'Sorry, this spot is already booked for the specified dates'
                err.message = 'Sorry, this spot is already booked for the specified dates';
                err.errors = {
                    startDate:"Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                };
                err.status = 403;
                return next(err);
            }else{
                return next(e);
            }
        }
        return res.json(newBooking);
});

router.get('/:id/bookings',restoreUser, requireAuth, spotReq,
    async (req,res) => {
        let currentUser = req.user.toJSON().id;
        let spot = req.spot.toJSON();
        let bookings;
        if(currentUser === spot.ownerId){
            bookings = await Booking.findAll({
                where:{spotId:spot.id},
                include:{
                    model:User,
                }
            });
        }else{
            bookings = await Booking.scope('notOwner').findAll({
                where:{spotId:spot.id}
            });
        }
        return res.json({Bookings:bookings});
});

router.get('/:id/reviews', restoreUser, spotReq, async (req, res) => {
    let currentUser = req.user.toJSON().id;
    let spot = req.spot.toJSON();
    let reviews = await Review.findAll({
        where:{
            spotId:req.params.id
        },
        include:[
            {
                model:User
            },
            {
                model:Image,
                as:'images',
                where:{
                    imageType:'review'
                },
                attributes:['id','url'],
                required:false,
                raw:true,
            }
        ],
    });
    // console.log(reviews);
    reviews = reviews.map(e => e.toJSON());
    // let booked = false;
    // if(currentUser !== spot.ownerId){
    //     let bookings = await Booking.findAll({
    //         where:{userId:currentUser},
    //         include:{
    //             model:Spot.scope('noCreateUpdate')
    //         },
    //         raw:true,
    //         nest:true
    //     });
    //     booked = bookings.some(e => e.spotId === spot.id)
    // }


    let reviewed = reviews.some(e => e.userId === currentUser);

    return res.json({Reviews:reviews,
                        // booked:booked,
                        reviewed:reviewed});
});


const validateReview = [
    check('review')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({checkFalsy:true})
        .notEmpty()
        .isInt({min:1, max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.post('/:id/reviews', restoreUser, requireAuth, spotReq, refuseOwner,
            validateReview, async (req, res, next) => {
    let userId = req.user.toJSON().id;
    let spotId = req.spot.toJSON().id;
    let {review,stars} = req.body;
    let newReview;
    try{
        newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        });
    }catch(e){
        if(e.name === 'SequelizeUniqueConstraintError'){
            const err = Error('User already has a review for this spot');
            err.title = 'User already has a review for this spot'
            err.message = 'User already has a review for this spot';
            err.status = 403;
            return next(err);
        }else{
            return next(e);
        }
    }

    return res.json(newReview);
});


router.get('/myspots', restoreUser, requireAuth, async (req,res) => {
    let myid = req.user.toJSON().id;

    let myspots = await Spot.findAll({
        where:{ownerId:myid},
        attributes:{

        },
        include:[
                {
                    model:Image,
                    as:'previewImage',
                    where:{imageType:'spot'},
                    attributes:['id','url'],
                    required:false,
                },

        ]
    });

    return res.json(myspots);
});

router.get('/:id', async (req, res, next) => {
    let result = await Spot.findOne({
        where:{
            id:req.params.id
        },
        attributes:{
            include:[
                [
                    sequelize.fn("COUNT", sequelize.col("Reviews.review")),
                    "numReviews"
                ],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ]
            ]
        },
        include:[
            {
                model:User,
                as:'Owner'
            },
            {
                model:Review,
                required:false,
                attributes:[]
            },
        ],
        group:['Spot.id','Owner.id']
    });

    if(!result){
        const err = Error('Spot couldn\'t be found');
        err.status = 404;
        err.title = 'Spot couldn\'t be found';
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }
    result = result.toJSON();
    let imgs = await Image.findAll({
        where:{
            spotId:req.params.id,
            imageType:'spot'
        },
        attributes:['id','url'],
        raw:true
    });
    result.images = imgs;
    return res.json(result);
});



const validateSpot = [
    check('name')
        .exists({checkFalsy:true})
        .notEmpty()
        .isLength({min:2, max:30})
        .withMessage('name is required and must be between 2 and 30 characters'),
    check('address')
        .exists({checkFalsy:true})
        .isLength({min:2, max:256})
        .withMessage('Street address is required and between 2 and 256 characters'),
    check('city')
        .exists({checkFalsy:true})
        .isLength({min:1, max:20})
        .withMessage('City is required and no more than 20 characters'),
    check('state')
        .exists({checkFalsy:true})
        .isLength({min:2, max:10})
        .withMessage('State is required and between 2 and 10 characters'),
    check('country')
        .exists({checkFalsy:true})
        .isLength({min:2, max:20})
        .withMessage('Country is required and between 2 than 20 characters'),
    check('lat')
        .exists({checkFalsy:false})
        .notEmpty()
        .isFloat({min:-89.9999999, max:89.9999999})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({checkFalsy:false})
        .notEmpty()
        .isFloat({min:-179.9999999, max:179.9999999})
        .withMessage('Longitude is not valid'),
    check('price')
            .exists({checkFalsy:true})
            .notEmpty()
            .isInt({min:1})
            .withMessage('Price per day is required and must be an integer bigger than 0'),
    check('description')
        .exists({checkFalsy:true})
        .isLength({min:2, max:256})
        .withMessage('Description is required between 2 and 256 characters'),
    handleValidationErrors
];

router.put('/:id', validateSpot,
        restoreUser, requireAuth, spotReq, AuthorCheck,
        async (req, res, next) => {
            let spot = req.spot;
            const {address,city,state,country,lat,lng,name,description,price} = req.body;
            try{
                spot.set({
                    address,
                    city,
                    state,
                    country,
                    lat,
                    lng,
                    name,
                    description,
                    price
                });
                await spot.save();
            }catch(e){
                if(e.name === 'SequelizeUniqueConstraintError'){
                    const err = Error('Spot already exists');
                    err.title = 'Spot already exists'
                    err.message = 'Spot already exists';
                    err.status = 403;
                    err.errors = {};
                    err.errors[(e.errors)[0].path] = `Spot with that ${(e.errors)[0].path} already exists.`
                    return next(err);
                }else{
                    return next(e);
                }
            }

            let updated = await Spot.findByPk(req.params.id);
            return res.json(updated);
});

router.post('/', validateSpot, restoreUser, requireAuth, async (req, res, next) => {
    const {address,city,state,country,lat,lng,name,description,price} = req.body;

    const ownerId = req.user.toJSON().id;
    let spot;
    try{
        spot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
    }catch(e){
        if(e.name === 'SequelizeUniqueConstraintError'){
            const err = Error('Spot already exists');
            err.title = 'Spot already exists'
            err.message = 'Spot already exists';
            err.status = 403;
            err.errors = {};
            err.errors[(e.errors)[0].path] = `Spot with that ${(e.errors)[0].path} already exists.`
            return next(err);
        }else{
            return next(e);
        }
    }
    return res.json({...spot.toJSON()});
});

router.delete('/:id',
    restoreUser, requireAuth, spotReq, AuthorCheck,
    async (req, res) => {
        let spot = req.spot;
        await spot.destroy();
        res.json({"message": "Successfully deleted","statusCode": 200});
});

const validateFilters = [
    check('page')
        .optional()
        .isInt({min:1})
        .withMessage('Page must be greater than or equal to 0'),
    check('size')
        .optional()
        .isInt({min:0})
        .withMessage('Size must be greater than or equal to 0'),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage('Maximum latitude is invalid'),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage('Minimum latitude is invalid'),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage('Maximum longitude is invalid'),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isFloat({min:0})
        .withMessage('Maximum price must be greater than 0'),
    check('maxPrice')
        .optional()
        .isFloat({min:0})
        .withMessage('Minimum price must be greater than 0'),
    handleValidationErrors
];

router.get('/', validateFilters, async (req, res) => {
    let {page,size,minLat,maxLat,minLng,maxLng,minPrice,maxPrice} = req.query;
    page = page?parseInt(page):1;
    //changed: page should be 1 minimumly
    size = size?parseInt(size):20;
    page = (page > 10)?10:page;
    //when size is 0, it gives nothing
    size = (size > 20)?20:size;

    let pagination = {};

    // if(page > 0){
    pagination.limit = size;
    pagination.offset = (page-1)*size;
    // }


    let opMinLat = minLat===undefined?({}):({[Op.gte]:minLat});
    let opMaxLat = maxLat===undefined?({}):({[Op.lte]:maxLat});
    let opMinLng = minLng===undefined?({}):({[Op.gte]:minLng});
    let opMaxLng = maxLng===undefined?({}):({[Op.lte]:maxLng});
    let opMinPri = minPrice===undefined?({}):({[Op.gte]:minPrice});
    let opMaxPri = maxPrice===undefined?({}):({[Op.lte]:maxPrice});

    let where = {};
    if(minLat !== undefined || maxLat !== undefined)where.lat = {...opMinLat, ...opMaxLat};
    if(minLng !== undefined || maxLng !== undefined)where.lng = {...opMinLng, ...opMaxLng};
    if(minPrice !== undefined || maxPrice !== undefined)where.price = {...opMinPri, ...opMaxPri};

    let result = {};
    result.Spots = await Spot.findAll({
        where,
        subQuery: false,
        attributes:{
            include:[
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ]
            ]
        },
        include:[

                    {
                        model:Review,
                        required:false,
                        attributes:[]
                    },
                    {
                        model:Image,
                        as:'previewImage',
                        attributes:['id','url'],
                        where:{
                            reviewId:null
                        },
                        required:false,
                    },
        ],
        order:[['id']],
        group:[['Spot.id'],["previewImage.id"]],
        // ...pagination
    });

    // result = result.toJSON();
    result.page = page;
    result.size = result.Spots.length;
    return res.json(result);
});

module.exports = router;
