const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')
const { HttpCode } = require('./helpers/constants')
const apiLimiter = require('./helpers/apiLimiter')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const contactsRouter = require('./routes/api/api-contacts')
const usersRouter = require('./routes/api/api-users')

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))

app.use('/api/', rateLimit(apiLimiter))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res, _next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Not found! You need use api on routes ${req.baseUrl}/api/contacts or /api/users`,
    data: 'Not Found',
  })
})

app.use((err, _req, res, _next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
  })
})

module.exports = app
