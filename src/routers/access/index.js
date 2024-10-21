'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')
const router = express.Router()

router.post('/shop/signup', asyncHandler(accessController.signup))
router.post('/shop/login', asyncHandler(accessController.login))

// yarn start - curl http://localhost:3055/

module.exports = router
