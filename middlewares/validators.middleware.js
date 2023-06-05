const {body} = require('express-validator')

module.exports.userValidator = () => {
    return [
        body('name')
            .notEmpty().withMessage('name can not be empty'),
        body('email')
            .isEmail().withMessage('email format is not true')
            .notEmpty().withMessage('email can not be empty'),
        body('password')
            .isLength({
                min: 8
            }).withMessage('password length should be at least 8 characters')
            .notEmpty().withMessage('password can not be empty'),
        body('age')
            .notEmpty().withMessage('age can not be empty')
    ]
}

module.exports.bookValidator = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('title can not be empty'),
        body('author')
            .notEmpty()
            .withMessage('author can not be empty'),
        body('price')
            .isNumeric().withMessage('price should me numeric')
            .notEmpty().withMessage('price can not be empty'),
        body('discount')
            .optional()
            .isNumeric().withMessage('discount can not be empty'),
        body('description')
            .isLength({
                min: 10,
                max: 500
            }).withMessage('description length should be between 10 and 500 characters')
            .notEmpty().withMessage('description can not be empty')
    ]
}