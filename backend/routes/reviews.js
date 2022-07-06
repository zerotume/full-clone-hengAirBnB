const express = require('express');
const router = express.Router();
const {Spot, Image, Review, User, Booking, sequelize} = require('../db/models');
const {setTokenCookie, restoreUser, requireAuth, AuthorCheck, refuseOwner, reviewReq} = require('../utils/auth.js');
const {handleValidationErrors} = require('../utils/validation.js');
const {check} = require('express-validator');
const user = require('../db/models/user');

router.get('/myreview', restoreUser, requireAuth, async (req, res) => {
    let myId = req.user.toJSON().id;

    let reviews = await Review.findAll({
        where:{userId:myId},
        include:[
            {
                model:User
            },
            {
                model:Spot.scope('noCreateUpdate')
            },
            {
                model:Image,
                as:'images',
                where:{imageType:'review'},
                attributes:['url']
            }
        ]
    });

    res.json({Reviews:reviews});
});

module.exports = router;
