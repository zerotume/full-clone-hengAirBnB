const express = require('express');
const router = express.Router();
const {Spot, Image, sequelize} = require('../db/models');

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
            attributes:[]
        },
        where:{
            reviewId:null
        },
        raw:true
    });
    return res.json(result);
});

module.exports = router;
