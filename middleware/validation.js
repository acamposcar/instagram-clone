const { validationResult } = require('express-validator')
const { body } = require('express-validator')

exports.validationResult = (req, res, next) => {
  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    // if (err.name === 'ValidationError') {
    //   const messages = Object.values(err.errors).map(val => val.message);

    //   return res.status(400).json({
    //     success: false,
    //     error: messages
    //   });}

    return res.status(400).json({
      success: false,
      error: 'Validation error',
      validationErrors: validationErrors.array()
    })
  } else {
    next()
  }
}

exports.usernamePassword = () => [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')
    .isLength({ max: 20 })
    .withMessage('Username must be less than 20 characters')
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Username can only contain letters and numbers')
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('Password must be at least 5 characters')
    .isLength({ max: 50 })
    .withMessage('Password must be less than 50 characters')
]

exports.name = () => [
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape()
]

exports.post = () => [
  body('title', 'Title must be between 1 and 1000 characters').trim().isLength({ min: 1, max: 1000 }).escape(),
  // Content not escaped to avoid markdown conversion errors
  body('content', 'Content must not be empty').trim().isLength({ min: 1 }),
  body('published', 'Published must be a boolean').trim().isBoolean().escape(),
  body('summary', 'Summary must not be empty').trim().isLength({ min: 1 })
]

exports.comment = () => [
  body('content', 'Content must not be empty').trim().isLength({ min: 1 }).escape()
]
