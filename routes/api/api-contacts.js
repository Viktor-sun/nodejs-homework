const express = require('express')
const router = express.Router()
const controllerContacts = require('../../controllers/controllers-contacts')
const {
  validateAddContacts,
  validateUpdateContacts,
  validateUpdateStatusContacts,
  validateMongoId,
} = require('../../validation/validation-contacts')

router
  .get('/', controllerContacts.getAll)
  .get('/:contactId', validateMongoId, controllerContacts.getById)
  .post('/', validateAddContacts, controllerContacts.add)
  .delete('/:contactId', validateMongoId, controllerContacts.remove)
  .put(
    '/:contactId',
    validateMongoId,
    validateUpdateContacts,
    controllerContacts.update
  )
  .patch(
    '/:contactId/favorite',
    validateMongoId,
    validateUpdateStatusContacts,
    controllerContacts.update
  )

module.exports = router
