const express = require('express');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../../utils/validation.js');

const {setTokenCookie, requireAuth} = require('../../utils/auth.js');
const {User} = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({checkFalsy:true})
        .isEmail()
        .isLength({min:3})
        .withMessage('Please provide a valid email with at least 3 characters.'),
    check('username')
        .exists({checkFalsy: true})
        .isLength({min:4})
        .withMessage('Please provide a username with at least 4 characters'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .exists({checkFalsy:true})
        .isLength({min:1})
        .withMessage('Please provide a valid first name.'),
    check('lastName')
        .exists({checkFalsy:true})
        .isLength({min:1})
        .withMessage('Please provide a valid last name.'),
    check('password')
        .exists({checkFalsy:true})
        .isLength({min:6})
        .withMessage('Password must be 6 characters or more'),
    handleValidationErrors
];

router.post('/', validateSignup, async (req,res) => {
    const {email, password, username} = req.body;
    const user = await User.signup({email, username, password});

    await setTokenCookie(res, user);

    return res.json({user});
});

module.exports = router;
