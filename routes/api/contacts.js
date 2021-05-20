const express = require('express')
const router = express.Router()
const controllerContacts = require('../../controllers/controllers-contacts')

router
  .get('/', controllerContacts.getAll)
  .get('/:contactId', controllerContacts.getById)
  .post('/', controllerContacts.add)
  .delete('/:contactId', controllerContacts.remove)
  .patch('/:contactId', controllerContacts.update)

module.exports = router
