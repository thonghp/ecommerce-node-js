'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.post('/shop/signup', asyncHandler(productController.signup))
router.post('/shop/login', asyncHandler(productController.login))

// authentication sẽ kiểm tra trước khi vào các router bên dưới
router.use(authentication)
router.post('/shop/logout', asyncHandler(productController.logout))
router.post('/shop/handleRefreshToken', asyncHandler(productController.handleRefreshToken))
// yarn start - curl http://localhost:3055/

module.exports = router
