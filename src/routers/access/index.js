'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const router = express.Router()

router.post('/shop/signup', accessController.signup)

// yarn start - curl http://localhost:3055/

module.exports = router
