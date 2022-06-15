const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, './public/uploads/posts')
    } else {
      cb(null, './public/uploads/avatar')
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const config = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  },
  limits: {
    // 2MB limit size
    fileSize: 1024 * 1024 * 2
  }
})

const uploadImage = (req, res, next) => {
  config.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      })
    }
    next()
  })
}

const uploadAvatar = (req, res, next) => {
  config.single('avatar')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      })
    }
    next()
  })
}

module.exports = { uploadImage, uploadAvatar }
