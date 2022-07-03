const express = require('express');
const router = express.Router();


const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
