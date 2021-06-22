const express = require('express')
const router = express.Router()
const controllerUsers = require('../../controllers/controllers-users')
const {
  validateSignup,
  validateLogin,
  validateSubscription,
  validateVerify,
} = require('../../validation/validation-users')
const guard = require('../../helpers/guard')
const upload = require('../../helpers/upload-multer')

router
  .post('/signup', validateSignup, controllerUsers.signup)
  .post('/login', validateLogin, controllerUsers.login)
  .post('/logout', guard, controllerUsers.logout)

  .get('/current', guard, controllerUsers.getCurrent)
  .patch(
    '/subscription',
    guard,
    validateSubscription,
    controllerUsers.updateSubscription
  )
  .patch('/avatars', guard, upload.single('avatar'), controllerUsers.avatars)

  .get('/verify/:verificationToken', controllerUsers.verify)
  .post('/verify', validateVerify, controllerUsers.repeatEmailVerification)

module.exports = router
