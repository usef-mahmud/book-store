const {body} = require('express-validator')

module.exports.userValidator = () => {
    return [
        body('name').isEmpty(),
        body('email').isEmail().isEmpty(),
        body('password').isLength({
            min: 8
        }).isEmpty(),
        body('age').isEmpty()
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