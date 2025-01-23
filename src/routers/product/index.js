'use strict'

const express = require('express')
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.get(
  '/search/:keySearch',
  asyncHandler(productController.getListSearchProducts)
)

router.use(authentication)
router.post('', asyncHandler(productController.createProduct))
router.post(
  '/publish/:id',
  asyncHandler(productController.publishProductByShop)
)
router.post(
  '/unpublish/:id',
  asyncHandler(productController.unPublishProductByShop)
)

router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
// publish hiển thị với role là shop
router.get(
  '/published/all',
  asyncHandler(productController.getAllPublishsForShop)
)

module.exports = router
