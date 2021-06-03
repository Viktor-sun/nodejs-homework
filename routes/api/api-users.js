const express = require('express')
const router = express.Router()
const controllerUsers = require('../../controllers/controllers-users')
// const {
//   validateAddContacts,
//   validateUpdateContacts,
//   validateUpdateStatusContacts,
//   validateMongoId,
// } = require('../../validation/validation-contacts')

router
  .post('/signup', controllerUsers.signup)
  .post('/login', controllerUsers.login)
  .post('/logout', controllerUsers.logout)

  .post('/current', controllerUsers.getCurrent)

module.exports = router
