'use strict'

// !mdbgum
const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Shop' // name of the model used when calling model
const COLLECTION_NAME = 'Shops' // name of the collection in mongodb

// Declare the Schema of the Mongo model
const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    verify: {
      type: Schema.Types.Boolean, // type of MongoDB
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true, // Automatically insert two is createdAt and updatedAt
    collection: COLLECTION_NAME, // specify collection name instead of mongoose generated
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema)
