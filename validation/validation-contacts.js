const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.number().integer().required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),
  phone: Joi.number().integer().optional(),
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
