const Joi = require('joi')
const { HttpCode } = require('../helpers/constants')

const signupSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().min(6).alphanum().required(),
})

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().min(6).alphanum().required(),
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

module.exports.validateSignup = (req, res, next) =>
  validate(signupSchema, req.body, next)

module.exports.validateLogin = (req, res, next) =>
  validate(loginSchema, req.body, next)
