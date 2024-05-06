const { body } = require('express-validator');

exports.validate = (key) => {
    switch (key) {
        case 'create': {
            return [
                body('email', 'Email is required!').exists(),
                body('email', 'Email format is unknown!').isEmail(),
                body('password', 'Password is required!').exists()
            ]
        }
        case 'login': {
            return [
                body('email', 'Email is required!').exists(),
                body('email', 'Email format is unknown!').isEmail(),
                body('password', 'Password is required!').exists()
            ]
        }
    }
}