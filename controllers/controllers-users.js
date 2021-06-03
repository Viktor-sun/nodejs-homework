const usersRepository = require('../repositories/repository-users')
const { HttpCode } = require('../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_WORD

const signup = async (req, res, next) => {
  try {
    const user = await usersRepository.findByEmail(req.body.email)

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }

    const { id, email, subscription } = await usersRepository.createUser(
      req.body
    )

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      user: { id, email, subscription },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const user = await usersRepository.findByEmail(req.body.email)
  const isValidPassword = await user?.isValidPassword(req.body.password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
    })
  }
  const userId = user.id
  const payload = { userId }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' })
  await usersRepository.updateToken(userId, token)
  return res.json({
    status: 'success',
    code: HttpCode.OK,
    token,
    user: { email: user.email, subscription: user.subscription },
  })
}

const logout = async (req, res, next) => {}

const getCurrent = async (req, res, next) => {}

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
}
