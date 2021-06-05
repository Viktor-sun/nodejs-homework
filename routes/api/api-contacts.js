const express = require('express')
const router = express.Router()
const controllerContacts = require('../../controllers/controllers-contacts')
const {
  validateAddContacts,
  validateUpdateContacts,
  validateUpdateStatusContacts,
  validateMongoId,
} = require('../../validation/validation-contacts')
const guard = require('../../helpers/guard')

router
  .get('/', guard, controllerContacts.getAll)

  .get('/:contactId', guard, validateMongoId, controllerContacts.getById)
  .post('/', guard, validateAddContacts, controllerContacts.add)
  .delete('/:contactId', guard, validateMongoId, controllerContacts.remove)
  .put(
    '/:contactId',
    guard,
    validateMongoId,
    validateUpdateContacts,
    controllerContacts.update
  )
  .patch(
    '/:contactId/favorite',
    guard,
    validateMongoId,
    validateUpdateStatusContacts,
    controllerContacts.update
  )

module.exports = router
