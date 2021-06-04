const Joi = require('joi')
const mongoose = require('mongoose')
const { HttpCode } = require('../helpers/constants')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'mail', 'gmail'] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .optional(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'mail', 'gmail'] },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/)
    .optional(),
  favorite: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'favorite')

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = (schema, body, next) => {
  if (Object.keys(body).length === 0) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: 'missing fields',
      data: 'Bad Request',
    })
  }
  const { error } = schema.validate(body)

  if (error) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: error.details[0].message.replace(/"/g, ''),
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateAddContacts = (req, res, next) =>
  validate(schemaAddContact, req.body, next)

module.exports.validateUpdateContacts = (req, res, next) =>
  validate(schemaUpdateContact, req.body, next)

module.exports.validateUpdateStatusContacts = (req, res, next) =>
  validate(schemaUpdateStatusContact, req.body, next)

module.exports.validateMongoId = (req, _res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return next({
      status: 400,
      message: 'Invalid ObjectId',
    })
  }
  next()
}
