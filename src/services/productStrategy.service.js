'use strict'

const {
  product,
  clothing,
  electronic,
  furniture,
} = require('../models/product.model')
const { BadRequestError } = require('../core/error.response')

// define factory class to create product
class ProductStrategy {
  static productRegistry = {} // key - class

  static registerProductType(type, classRef) {
    ProductStrategy.productRegistry[type] = classRef
  }

  static async createProduct(type, payload) {
    const productClass = ProductStrategy.productRegistry[type]
    if (!productClass)
      throw new BadRequestError(`Invalid product types ${type}`)
    return new productClass(payload).createProduct()
  }
}

// define base product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_type,
    product_shop,
    product_attributes,
    product_quantity,
  }) {
    // payload
    this.product_name = product_name
    this.product_thumb = product_thumb
    this.product_description = product_description
    this.product_price = product_price
    this.product_type = product_type
    this.product_shop = product_shop
    this.product_attributes = product_attributes
    this.product_quantity = product_quantity
  }

  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id })
  }
}

// define sub-class for different product types clothing
class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes, // not use product_attributes: this.product_attributes
      product_shop: this.product_shop,
    })
    if (!newClothing) {
      throw new BadRequestError('create new clothing error')
    }

    const newProduct = await super.createProduct(newClothing._id)
    if (!newProduct) {
      throw new BadRequestError('create new product error')
    }

    return newProduct
  }
}

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    })
    if (!newElectronic) {
      throw new BadRequestError('create new electronic error')
    }
    const newProduct = await super.createProduct(newElectronic._id)
    if (!newProduct) {
      throw new BadRequestError('create new product error')
    }

    return newProduct
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes, // not use product_attributes: this.product_attributes
      product_shop: this.product_shop,
    })
    if (!newFurniture) {
      throw new BadRequestError('create new furniture error')
    }

    const newProduct = await super.createProduct(newFurniture._id)
    if (!newProduct) {
      throw new BadRequestError('create new product error')
    }

    return newProduct
  }
}

ProductStrategy.registerProductType('Clothing', Clothing)
ProductStrategy.registerProductType('Electronic', Electronic)
ProductStrategy.registerProductType('Furniture', Furniture)
// ProductStrategy.registerProductType('xxx', xxx)

module.exports = ProductStrategy
