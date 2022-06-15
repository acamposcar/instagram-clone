const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const isAuth = require('../middleware/auth').isAuth

router.route('/login').post(userController.login)
router.route('/register').post(userController.register)
router.route('/avatar').post(isAuth, userController.uploadAvatar)
router.route('/validate').get(isAuth, userController.validateToken)
router.route('/accounts/:username').get(isAuth, userController.getProfile)

module.exports = router
