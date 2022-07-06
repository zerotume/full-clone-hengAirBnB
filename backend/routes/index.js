const express = require('express');
const router = express.Router();


const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const bookingRouter = require('./bookings.js');
const reviewRouter = require('./reviews.js');

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/bookings', bookingRouter);
router.use('/reviews', reviewRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
