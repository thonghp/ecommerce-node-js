'use strict'

const {
  Types: { ObjectId },
} = require('mongoose')
const { product } = require('../../models/product.model')

const findAllDraftsForShop = async ({ query, limit, skip }) => {
  return queryProduct({ query, limit, skip })
}

const findAllPublishsForShop = async ({ query, limit, skip }) => {
  return queryProduct({ query, limit, skip })
}

const queryProduct = async ({ query, limit, skip }) => {
  return await product
    .find(query)
    .populate('product_shop', 'name email -_id')
    .sort({ updatedAt: -1 }) // mới nhất
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}

const publishProductByShop = async ({ product_id, product_shop }) => {
  const foundProduct = await product.findOne({
    product_shop: ObjectId.createFromHexString(product_shop),
    _id: ObjectId.createFromHexString(product_id),
  })
  if (!foundProduct) return null

  const { modifiedCount } = await product.updateOne(
    { _id: foundProduct._id },
    { $set: { isDraft: false, isPublished: true } }
  )

  return modifiedCount
}

const unPublishProductByShop = async ({ product_id, product_shop }) => {
  const foundProduct = await product.findOne({
    product_shop: ObjectId.createFromHexString(product_shop),
    _id: ObjectId.createFromHexString(product_id),
  })
  if (!foundProduct) return null

  const { modifiedCount } = await product.updateOne(
    { _id: foundProduct._id },
    { $set: { isDraft: true, isPublished: false } }
  )

  return modifiedCount
}

const searchProductByUser = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch)
  const results = await product
    .find(
      {
        isPublished: true,
        $text: { $search: regexSearch },
      },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()

  return results
}

module.exports = {
  findAllDraftsForShop,
  findAllPublishsForShop,
  publishProductByShop,
  unPublishProductByShop,
  searchProductByUser,
}
