const {validationResult} = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        // console.log(validationErrors.array())

        // const errors = validationErrors
        //                 .array().map(e => `${e.msg}`);
        const errorArray = validationErrors.array();
        let errors = {};
        for(let e of errorArray){
            if(e.msg !== 'Invalid value' && errors[e.param] === undefined){
                errors[e.param] = e.msg;
            }
        }

        const err = Error('Validation error');
        err.errors = errors;
        err.status = 400;
        err.title = 'Validation error';
        err.message = 'Validation error';
        next(err);
    }
    next();
}

module.exports = { handleValidationErrors };
