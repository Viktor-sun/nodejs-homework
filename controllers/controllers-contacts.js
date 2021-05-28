const { HttpCode } = require('../helpers/constants')
const contactsRepository = require('../repositories/repository-contacts')

const getAll = async (_req, res, next) => {
  try {
    const contacts = await contactsRepository.listContacts()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const contact = await contactsRepository.getContactById(
      req.params.contactId
    )

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
      })
    }
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const contact = await contactsRepository.removeContact(req.params.contactId)

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact deleted',
        data: {},
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
      })
    }
  } catch (error) {
    next(error)
  }
}

const add = async (req, res, next) => {
  try {
    const contact = await contactsRepository.addContact(req.body)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'contact added',
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const contact = await contactsRepository.updateContact(
      req.params.contactId,
      req.body
    )

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact updated',
        data: {
          contact,
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
}
