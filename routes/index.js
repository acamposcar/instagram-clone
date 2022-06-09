const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')

router.route('/').get(indexController.getAllProjects)

module.exports = router
