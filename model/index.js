const fs = require('fs/promises')
const path = require('path')
const shortid = require('shortid')
const contactPath = path.join(__dirname, '/contacts.json')

const readContacts = async () => {
  const contacts = await fs.readFile(contactPath, 'utf-8')
  return JSON.parse(contacts)
}

const listContacts = async () => readContacts()

const getContactById = async ({ contactId }) => {
  const contacts = await readContacts()
  return await contacts.find(({ id }) => String(id) === contactId)
}

const removeContact = async ({ contactId }) => {
  const contacts = await readContacts()
  const removedContact = contacts.filter(({ id }) => String(id) !== contactId)
  const hasContact = contacts.some(({ id }) => String(id) === contactId)

  if (hasContact) {
    await fs.writeFile(contactPath, JSON.stringify(removedContact, null, 2))
    return true
  } else {
    return false
  }
}

const addContact = async (body) => {
  const contacts = await readContacts()
  const newContact = {
    id: shortid.generate(),
    name: body.name ? body.name : 'NoName',
    email: body.email,
    phone: body.phone,
  }
  contacts.push(newContact)
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async ({ contactId }, body) => {
  const contacts = await readContacts()
  const hasContact = contacts.some(({ id }) => String(id) === contactId)

  if (hasContact) {
    const removedContact = contacts.filter(({ id }) => String(id) !== contactId)
    const updatedContact = {
      id: contactId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    }
    removedContact.push(updatedContact)
    await fs.writeFile(contactPath, JSON.stringify(removedContact, null, 2))
    return updatedContact
  } else {
    return null
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
