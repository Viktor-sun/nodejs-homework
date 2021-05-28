const Contact = require('../model/schema-contacts')

const listContacts = async () => {
  const contacts = await Contact.find()
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await Contact.findOne({ _id: contactId })
  return contacts
}

const removeContact = async (contactId) => {
  const contacts = await Contact.findOneAndRemove({ _id: contactId })
  return contacts
}

const addContact = async (body) => {
  const contacts = await Contact.create(body)
  return contacts
}

const updateContact = async (contactId, body) => {
  const contacts = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  )
  return contacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
