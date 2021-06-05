const Contact = require('../model/schema-contacts')

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    owner = null,
    limit = 4,
    offset = 0,
  } = query
  const optionsSearch = { owner: userId }
  if (favorite !== null) {
    optionsSearch.favorite = favorite
  }
  const contacts = await Contact.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: owner ? { path: 'owner', select: ' email subscription' } : '',
  })
  return contacts
}

const getContactById = async (userId, contactId) => {
  const contacts = await Contact.findOne({ _id: contactId, owner: userId })
  return contacts
}

const removeContact = async (userId, contactId) => {
  const contacts = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })
  return contacts
}

const addContact = async (userId, body) => {
  const contacts = await Contact.create({ owner: userId, ...body })
  return contacts
}

const updateContact = async (userId, contactId, body) => {
  const contacts = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
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
