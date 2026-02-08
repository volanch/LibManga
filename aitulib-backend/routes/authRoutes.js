const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const verifySignUp = require('../middlewares/verifySignUp')

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRole],
  authController.signup,
)

router.post('/signin', authController.signin)

module.exports = router
