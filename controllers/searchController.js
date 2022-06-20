const User = require('../models/user')
const validationMiddleware = require('../middleware/validation')

// @desc    Search user
// @route   POST /api/v1/search
// @access  Users
exports.search = [
  validationMiddleware.searchQuery(),
  async (req, res, next) => {
    if (req.body.query === '') return res.status(200).json([])
    // Starts with...
    const query = new RegExp('^' + req.body.query, 'i')

    try {
      const user = await User.find({ username: query }).lean()
      return res.status(200).json(user)
    } catch (err) {
      return next(err)
    }
  }
]
