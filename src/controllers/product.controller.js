'use strict'

const ProductService = require('../services/productStrategy.service')
const { CREATED, SuccessResponse } = require('../core/success.response')

class ProductController {
  createProduct = async (req, res, next) => {
    new CREATED({
      message: 'Create new product success!',
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.userId,
      }),
    }).send(res)
  }

  getAllDraftsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list draft success!',
      metadata: await ProductService.findAllDraftsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res)
  }

  getAllPublishsForShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list publish success!',
      metadata: await ProductService.findAllPublishsForShop({
        product_shop: req.user.userId,
      }),
    }).send(res)
  }

  publishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'publish product success!',
      metadata: await ProductService.publishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res)
  }

  unPublishProductByShop = async (req, res, next) => {
    new SuccessResponse({
      message: 'unpublish product success!',
      metadata: await ProductService.unPublishProductByShop({
        product_id: req.params.id,
        product_shop: req.user.userId,
      }),
    }).send(res)
  }

  getListSearchProducts = async (req, res, next) => {
    new SuccessResponse({
      message: 'get list search product success!',
      metadata: await ProductService.searchProduct(req.params),
    }).send(res)
  }
}

module.exports = new ProductController()
