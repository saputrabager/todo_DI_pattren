const express = require('express');
const router = express.Router()
const { validate } = require('./validation');
const Auth = require('./controller');

const AuthController = require('./controller');
const AuthRepository = require('./repository');

const authRepository = new AuthRepository();
const authController = new AuthController(authRepository);

router.post('/v1/signup', validate('create'), authController.create.bind(authController));
router.post('/v1/signin', validate('login'), authController.signIn.bind(authController));
router.post('/v1/auth', authController.isAuthenticated.bind(authController));


module.exports = router;