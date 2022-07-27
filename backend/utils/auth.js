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

const refuseOwner = (req, _res, next) => {
    let currentUid = req.user.toJSON().id;
    if(currentUid === req.permit && req.spot){
        const err = new Error("You can't book or review your own spot.");
        err.title = "You can't book or review your own spot.";
        err.message = "You can't book or review your own spot.";
        err.status = 418;
        return next(err);
    }

    return next();
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
    req.spot = spot;
    req.permit = req.spot.toJSON().ownerId;
    return next();
}

const reviewReq = async (req, _res, next) => {
    let review = await Review.findByPk(req.params.id);
    if(!review){
        const err = new Error("Review couldn't be found");
        err.title = "Review couldn't be found";
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    }
    req.review = review;
    req.permit = req.review.toJSON().userId;
    return next();
}

const bookingReq = async (req, _res, next) => {
    let booking = await Booking.findByPk(req.params.id);
    if(!booking){
        const err = new Error("Booking couldn't be found");
        err.title = "Booking couldn't be found";
        err.message = "Booking couldn't be found";
        err.status = 404;
        return next(err);
    }
    req.booking = booking;
    // console.log(booking);
    req.permit = req.booking.toJSON().userId;
    return next();
}

/*

    For Someone testing this:
    image 1,2,3 are review images
    image 4,5,6,7 are spot images

*/

const imageReq = async (req, _res, next) => {
    let image = await Image.findByPk(req.params.id);
    if(!image){
        const err = new Error("Image couldn't be found");
        err.title = "Image couldn't be found";
        err.message = "Image couldn't be found";
        err.status = 404;
        return next(err);
    }
    req.image = image;
    let imgJson = image.toJSON();
    let target;
    if(imgJson.imageType === 'spot'){
        target = await Spot.findByPk(imgJson.spotId);
        req.permit = target.toJSON().ownerId;
    }else if(imgJson.imageType === 'review'){
        target = await Review.findByPk(imgJson.reviewId);
        req.permit = target.toJSON().userId;
    }else{
        const err = new Error("Wat? Server seems strange");
        err.title = "Wat? Server seems strange";
        err.message = "Wat? Server seems strange";
        err.status = 500;
        return next(err);
    }

    return next();
}

const spotImgReq = async (req, _res, next) => {
    let image = await Image.findByPk(req.params.id, {
        include:{
            model:Spot,
            attributes:['ownerId']
        }
    });
    if(!image){
        const err = new Error("Image couldn't be found");
        err.title = "Image couldn't be found";
        err.message = "Image couldn't be found";
        err.status = 404;
        return next(err);
    }

    req.image = image;
    currentImg = image.toJSON();
    if(currentImg.imageType !== 'spot'){
        const err = new Error("Not a spot image!");
        err.title = "Not a spot image!";
        err.message = "Not a spot image!";
        err.status = 400;
        return next(err);
    }

    req.permit = currentImg.Spot.ownerId;
    return next();
}

const reviewImgReq = async (req, _res, next) => {
    let image = await Image.findByPk(req.params.id, {
        include:{
            model:Review,
            attributes:['userId']
        }
    });

    if(!image){
        const err = new Error("Image couldn't be found");
        err.title = "Image couldn't be found";
        err.message = "Image couldn't be found";
        err.status = 404;
        return next(err);
    }


    req.image = image;
    currentImg = image.toJSON();

    if(req.image.imageType !== 'review'){
        const err = new Error("Not a review image!");
        err.title = "Not a review image!";
        err.message = "Not a review image!";
        err.status = 400;
        return next(err);
    }

    req.permit = currentImg.Review.userId;
    return next();
}




module.exports = {
    setTokenCookie, restoreUser, requireAuth,
    AuthorCheck,refuseOwner,
    reviewReq, spotReq, bookingReq,
    imageReq, spotImgReq, reviewImgReq};
