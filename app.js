require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')
const connectDB = require('./config/db')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')

const app = express()

connectDB()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

// Passport configuration
require('./config/passport')
app.use(passport.initialize())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/api/v1', indexRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)

// app.use('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
// })

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
