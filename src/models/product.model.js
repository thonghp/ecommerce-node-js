'use strict'

const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME_PRODUCT = 'Product'
const COLLECTION_NAME_PRODUCT = 'Products'

const DOCUMENT_NAME_CLOTHING = 'Clothing'
const COLLECTION_NAME_CLOTHING = 'Clothes'

const DOCUMENT_NAME_ELECTRONIC = 'Electronic'
const COLLECTION_NAME_ELECTRONIC = 'Electronics'

const DOCUMENT_NAME_FURNITURE = 'Furniture'
const COLLECTION_NAME_FURNITURE = 'Furnitures'

const productSchema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      default: true,
    },
    product_description: String,
    product_slug: String,
    product_price: {
      type: Number,
      required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_type: {
      type: String,
      required: true,
      enum: ['Electronic', 'Clothing', 'Furniture'],
    },
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    product_ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
    },
    // tại sao không đặt prefix product ở trước vì nó không dùng để select nên không cần đặt prefix
    isDraft: {
      type: Boolean,
      default: true, // nó là nháp nên khong được public
      index: true, // đánh index nó luôn vì thằng này hay được sử dụng nhiều nhất
      select: false, // Mỗi lần ta document findOne,... thì nó sẽ không lấy field này
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME_PRODUCT,
  }
)

// Document middleware, run before save and create
productSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true })
  next()
})

// Create index for full text search
productSchema.index({ product_name: 'text', product_description: 'text' })

const clothingSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME_CLOTHING,
  }
)

const electronicSchema = new Schema(
  {
    manufacturer: {
      type: String,
      required: true,
    },
    model: String,
    color: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME_ELECTRONIC,
  }
)

const furnitureSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    size: String,
    material: String,
    product_shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME_FURNITURE,
  }
)
//Export the model
module.exports = {
  product: model(DOCUMENT_NAME_PRODUCT, productSchema),
  clothing: model(DOCUMENT_NAME_CLOTHING, clothingSchema),
  electronic: model(DOCUMENT_NAME_ELECTRONIC, electronicSchema),
  furniture: model(DOCUMENT_NAME_FURNITURE, furnitureSchema),
}
