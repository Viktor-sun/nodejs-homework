const express = require('express')
const router = express.Router()
const controllerContacts = require('../../controllers/controllers-contacts')
const {
  validateAddContacts,
  validateUpdateContacts,
} = require('../../validation/validation-contacts')

router
  .get('/', controllerContacts.getAll)
  .get('/:contactId', controllerContacts.getById)
  .post('/', validateAddContacts, controllerContacts.add)
  .delete('/:contactId', controllerContacts.remove)
  .patch('/:contactId', validateUpdateContacts, controllerContacts.update)

module.exports = router
