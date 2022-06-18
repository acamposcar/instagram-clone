require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const connectDB = require('./config/db')
const compression = require('compression')
require('./config/passport')

const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const authRouter = require('./routes/auth')

const isAuth = require('./middleware/auth').isAuth

const app = express()

connectDB()

app.use(compression())

app.use(passport.initialize())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/api/v1/users', isAuth, userRouter)
app.use('/api/v1/posts', isAuth, postRouter)
app.use('/api/v1/auth', authRouter)

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  console.log(err)
  res.status(err.status || 500)
  res.json({
    error: 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
})

module.exports = app
