const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const verifySignUp = require('../middlewares/verifySignUp')
const validateSignupData = require('../middlewares/validateSignup')
const validateSigninData = require('../middlewares/validateSignin')

router.post(
    '/signup',
    [
        validateSignupData,
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRole
    ],
    authController.signup,
)

router.post('/signin', validateSigninData, authController.signin)

module.exports = router