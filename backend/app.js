const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { restoreUser } = require('./utils/auth.js');

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

app.get('/mypage', restoreUser, (req, res) => {
    const {user} = req;
    if(user) {
        return res.json({user: user.toSafeObject()});
    }else{
        return res.json({message:"You are not logged in!"});
    }
});

app.get('/', (req, res) => {
    res.json({message:"whyyyy"});
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
    err.errors = err.errors.map(e => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

app.use((err,_req,res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title:err.title || 'Server Error',
    message:err.message,
    errors:err.errors,
    stack: isProduction?null:err.stack
  });
});

module.exports = app;


module.exports = app;
