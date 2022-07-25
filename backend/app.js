const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { restoreUser, requireAuth, AuthorCheck, spotReq,spotImgReq } = require('./utils/auth.js');

const { environment } = require('./config');
const isProduction = environment === 'production';

const { ValidationError } = require('sequelize');

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
const routes = require('./routes');

if (!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(
    csurf({
        cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
        }
    })
);

app.get('/api/mypage',  restoreUser, requireAuth, (req, res) => {
    const {user} = req;
    if(user) {
        return res.json({user: user.toSafeObject()});
    }else{
        return res.json({message:"You are not logged in!"});
    }
});


app.get('/test-req-set/:id', restoreUser, requireAuth, spotReq, AuthorCheck, (req, res) => {
    //this is only the tester of request setter and auth checker
    return res.json(req.spot);
});

app.get('/test-image/:id', restoreUser, requireAuth, spotImgReq, AuthorCheck, (req, res) => {
    //this is only the tester of request setter and auth checker
    return res.json(req.image);
});


app.use(routes);


app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resouce Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  if(err instanceof ValidationError){
    // console.log(err)
    err.errors = err.errors.map(e => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err,_req,res, _next) => {
  res.status(err.status || 500);
  // console.error(err);
  let errors = [{
    title:isProduction?undefined:(err.title || 'Server Error'),
    message:err.message,
    statusCode:err.status,
    errors:err.errors,
    stack: isProduction?undefined:err.stack
  }]
  res.json({errors});
});

module.exports = app;
