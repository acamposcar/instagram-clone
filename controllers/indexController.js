const User = require('../models/user')

exports.getAllProjects = async (req, res, next) => {
  try {
    const posts = await User.find().populate('author').sort({ createdAt: -1 })
    return res.status(200).json({ posts })
  } catch (err) {
    return next(err)
  }
}
