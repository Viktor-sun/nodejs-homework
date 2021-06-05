const { HttpCode } = require('./constants')

const apiLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json({
      status: 'error',
      code: HttpCode.TOO_MANY_REQUESTS,
      message: 'Too many requests, please try again later.',
    })
  },
}

module.exports = apiLimiter
