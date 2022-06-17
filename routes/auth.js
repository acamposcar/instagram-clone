const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const isAuth = require('../middleware/auth').isAuth

router.route('/login').post(authController.login)
router.route('/register').post(authController.register)
router.route('/validate').get(isAuth, authController.validateToken)

module.exports = router
