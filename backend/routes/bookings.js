const express = require('express');
const router = express.Router();
const {Spot, Image, Review, User, Booking, sequelize} = require('../db/models');
const {setTokenCookie, restoreUser, requireAuth, AuthorCheck, refuseOwner, bookingReq} = require('../utils/auth.js');
const {handleValidationErrors} = require('../utils/validation.js');
const {check} = require('express-validator');
const user = require('../db/models/user');

router.get('/mybooking', restoreUser, requireAuth, async (req, res) => {
    let myId = req.user.toJSON().id;

    let bookings = await Booking.findAll({
        where:{userId:myId},
        include:{
            model:Spot.scope('noCreateUpdate')
        }
    });

    res.json({Bookings:bookings});
});

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

module.exports = router;
