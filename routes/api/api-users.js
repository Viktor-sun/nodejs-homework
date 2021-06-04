const express = require('express')
const router = express.Router()
const controllerUsers = require('../../controllers/controllers-users')
const {
  validateSignup,
  validateLogin,
  validateSubscription,
} = require('../../validation/validation-users')
const guard = require('../../helpers/guard')

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

module.exports = router
