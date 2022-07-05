const express = require('express');
const router = express.Router();
const {Spot, Image, Review, User, sequelize} = require('../db/models');
const {setTokenCookie, restoreUser, requireAuth, AuthorCheck, spotReq,spotImgReq} = require('../utils/auth.js');
const {handleValidationErrors} = require('../utils/validation.js');
const {check} = require('express-validator');

router.get('/myspots', restoreUser, requireAuth, async (req,res) => {
    let myid = req.user.toJSON().id;

    let myspots = await Spot.findAll({
        where:{ownerId:myid},
        attributes:{
            include:[
                [sequelize.col('Images.url'), 'previewImage']//so alias will be used here
            ]
        },
        include:{
            model:Image,
            where:{imageType:'spot'},
            attributes:[]
        }
    })

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
                required:true,
                attributes:[]
            },
        ],
    });

    result = result.toJSON();
    if(!result.id){
        const err = Error('Spot couldn\'t be found');
        err.status = 404;
        err.title = 'Spot couldn\'t be found';
        err.message = 'Spot couldn\'t be found';
        return next(err);
    }

    let imgs = await Image.findAll({
        where:{
            spotId:req.params.id
        },
        attributes:['url'],
        raw:true
    });
    result.images = imgs.map(e => e.url);
    return res.json(result);
});

router.get('/', async (req, res) => {
    let result = {};
    result.Spots = await Spot.findAll({
        attributes:{
            include:[
                [sequelize.col('Images.url'), 'previewImage']//so alias will be used here
            ]
        },
        include:{
            model:Image,
            attributes:[],
            where:{
                reviewId:null
            }
        },
        raw:true,
        order:[['id']]
    });
    return res.json(result);
});

const validateSpot = [
    check('address')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({checkFalsy:true})
        .notEmpty()
        .isFloat({min:-89.9999999, max:89.9999999})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({checkFalsy:true})
        .notEmpty()
        .isFloat({min:-179.9999999, max:179.9999999})
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({checkFalsy:true})
        .notEmpty()
        .isLength({min:1, max:50})
        .withMessage('name is required and must be less than 50 characters'),
    check('description')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Price per day is required'),
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
                    err.statusCode = 403;
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
            err.statusCode = 403;
            err.errors = {};
            err.errors[(e.errors)[0].path] = `Spot with that ${(e.errors)[0].path} already exists.`
            return next(err);
        }else{
            return next(e);
        }
    }
    return res.json({...spot.toJSON()});
});

module.exports = router;
