const express = require('express');
const router = express.Router();


const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingRouter = require('./bookings.js');
const reviewRouter = require('./reviews.js');
const imageRouter = require('./images.js');

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingRouter);
router.use('/reviews', reviewRouter);
router.use('/images', imageRouter);

// router.get("/api/csrf/restore", (req, res) => {
//   const csrfToken = req.csrfToken();
//   res.cookie("XSRF-TOKEN", csrfToken);
//   res.status(200).json({
//     'XSRF-Token': csrfToken
//   });
// });

module.exports = router;
