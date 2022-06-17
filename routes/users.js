const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.route('/:username').get(userController.getProfile).post(userController.updateAvatar).put(userController.updateProfile)
router.route('/:username/follow').post(userController.followUser)

module.exports = router
