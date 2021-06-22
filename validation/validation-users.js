const Joi = require('joi')
const { HttpCode, Subscription } = require('../helpers/constants')

const signupSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'mail', 'gmail'] },
    })
    .required(),

  password: Joi.string().min(6).alphanum().required(),
})

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'mail', 'gmail'] },
    })
    .required(),

  password: Joi.string().min(6).alphanum().required(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().alphanum().required(),
})

const verifySchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'mail', 'gmail'] },
    })
    .required(),
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

const validateSignup = (req, res, next) =>
  validate(signupSchema, req.body, next)

const validateLogin = (req, res, next) => validate(loginSchema, req.body, next)

const validateSubscription = (req, res, next) => {
  if (!Object.values(Subscription).includes(req.body.subscription)) {
    next({
      status: HttpCode.BAD_REQUEST,
      message: `field must contain: ${Object.values(Subscription).join(', ')}`,
      data: 'Bad Request',
    })
  }
  console.log(req.body)
  validate(subscriptionSchema, req.body, next)
}

const validateVerify = (req, res, next) => {
  if (!Object.values(req.body).includes()) {
  }
  validate(verifySchema, req.body, next)
}

module.exports = {
  validateSignup,
  validateLogin,
  validateSubscription,
  validateVerify,
}
