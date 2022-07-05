const express = require('express');
const {check} = require('express-validator');
const {handleValidationErrors} = require('../utils/validation.js');

const {setTokenCookie, restoreUser, requireAuth} = require('../utils/auth.js');
const {User} = require('../db/models');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({checkFalsy: true})
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Password is required'),
    handleValidationErrors
];

router.post('/login', validateLogin, async (req,res,next) => {
    //console.log("why I'm here")
    const {credential, password} = req.body;

    const user = await User.login({credential, password});
    //console.log(user);
    if(!user){
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Invalid credentials';
        err.message = 'Invalid credentials';
        //err.errors = ['The provided credentials were invalid.']
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({user});
});

router.delete('/', restoreUser, requireAuth, (_req, res) => {
    res.clearCookie('token');
    return res.json({message:'success'});
});


const validateSignup = [
    check('email')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Email is required'),
    check('email')
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
        .withMessage('First Name is required.'),
    check('lastName')
        .exists({checkFalsy:true})
        .isLength({min:1})
        .withMessage('Last Name is required.'),
    check('password')
        .exists({checkFalsy:true})
        .notEmpty()
        .withMessage('Password is required'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be 6 characters or more'),
    handleValidationErrors
];

router.post('/signup', validateSignup, async (req,res,next) => {
    const {email, password, username, firstName, lastName} = req.body;
    let user;
    try{
        user = await User.signup({email, password, username, firstName, lastName});
    }catch(e){
        if(e.name === 'SequelizeUniqueConstraintError'){
            const err = Error('User already exists');
            err.title = 'User already exists'
            err.message = 'User already exists';
            err.statusCode = 403;
            err.errors = {};
            err.errors[(e.errors)[0].path] = `User with that ${(e.errors)[0].path} already exists.`
            return next(err);
        }else{
            return next(e);
        }
    }

    await setTokenCookie(res, user);

    return res.json({user});

    /*
    test data:
    {
        "username":"catuser4",
        "email":"mewfour@cat.com",
        "password":"password4",
        "firstName":"MeowFour",
        "lastName":"Nyan"
    }
    */
});

module.exports = router;
