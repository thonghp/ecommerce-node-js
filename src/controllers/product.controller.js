'use strict'

const ProductService = require('../services/productStrategy.service')
const { CREATED } = require('../core/success.response')

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
}

module.exports = new ProductController()
