const express = require('express');
const router = express.Router();
const {Spot, Image, Review, sequelize} = require('../db/models');

router.get('/:id', async (req, res) => {

    let result = await Spot.findAll({
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
                model:Review,
                required:false
            },
            {
                model:Image,
                required:false
            },

        ],

    });
    return res.json(result);
});

router.get('/', async (req, res) => {
    let result = {};
    result.Spots = await Spot.findAll({
        attributes:{
            include:[
                [sequelize.col('Images.url'), 'previewImage']
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
