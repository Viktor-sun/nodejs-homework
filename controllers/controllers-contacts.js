const { HttpCode } = require('../helpers/constants')
const contactsModel = require('../model')

const getAll = async (_req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts()
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
    const contact = await contactsModel.getContactById(req.params)

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
    const contact = await contactsModel.removeContact(req.params)

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
    const contact = await contactsModel.addContact(req.body)
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
    const contact = await contactsModel.updateContact(req.params, req.body)

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
