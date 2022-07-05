const jwt = require('jsonwebtoken');
const {jwtConfig} = require('../config');
const {User, Spot, Image, Review, Booking} = require('../db/models');

const {secret, expiresIn} = jwtConfig;

const setTokenCookie = (res, user) => {
    const token = jwt.sign(
        {data:user.toSafeObject()},
        secret,
        {expiresIn: parseInt(expiresIn)}
    );
    const isProduction = process.env.NODE_ENV === "production"

    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};




const restoreUser = (req,res,next) => {
    const {token} = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if(err){
            return next();
        }

        try {
            const {id} = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        }catch(e){
            res.clearCookie('token');
            return next();
        }

        if(!req.user) res.clearCookie('token');

        return next();
    });
};

const requireAuth = (req, _res, next) => {
    if(req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.message = 'Authentication required';
    //err.errors = ['Authentication required'];
    err.status = 401;
    return next(err);
}

const AuthorCheck = (req, _res, next) => {
    let currentUid = req.user.toJSON().id;
    if(currentUid !== req.permit){
        const err = new Error("Forbidden");
        err.title = "Forbidden";
        err.message = "Forbidden";
        err.status = 403;
        return next(err);
    }

    return next();
}

const spotReq = async (req, _res, next) => {
    let spot = await Spot.findByPk(req.params.id);
    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        err.message = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }
    req.spot = spot.toJSON();
    req.permit = req.spot.ownerId;
    return next();
}

const reviewReq = async (req, _res, next) => {
    let review = await Review.findByPk(req.params.id);
    req.review = review.toJSON();
    req.permit = req.review.userId;
    return next();
}

const bookingReq = async (req, _res, next) => {
    let booking = await Booking.findByPk(req.params.id);
    req.booking = booking.toJSON();
    req.permit = req.booking.userId;
    return next();
}

const imageReq = async (req, _res, next) => {

}



module.exports = {setTokenCookie, restoreUser, requireAuth, AuthorCheck, spotReq};
