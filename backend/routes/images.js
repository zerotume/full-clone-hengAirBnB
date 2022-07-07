const express = require('express');
const router = express.Router();
const {Spot, Image, Review, User, Booking, sequelize} = require('../db/models');
const {setTokenCookie, restoreUser, requireAuth, AuthorCheck, refuseOwner, imageReq} = require('../utils/auth.js');
const {handleValidationErrors} = require('../utils/validation.js');
const {check} = require('express-validator');
const user = require('../db/models/user');



router.delete('/:id', restoreUser, requireAuth, imageReq, AuthorCheck,
    async (req, res) => {
        let image = req.image;

        await image.destroy();

        return res.json({
            message: "Successfully deleted",
            statusCode: 200
          });
});

module.exports = router;
