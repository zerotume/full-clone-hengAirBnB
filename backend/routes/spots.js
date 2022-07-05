const express = require('express');
const router = express.Router();
const {Spot, Image, Review, User, sequelize} = require('../db/models');
const {setTokenCookie, restoreUser, requireAuth} = require('../utils/auth.js');


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



module.exports = router;
