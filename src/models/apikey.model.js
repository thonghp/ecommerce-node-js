'use strict'

// !mdbgum
const { model, Schema } = require('mongoose')
const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

// Người dùng sẽ add cái key này add vào header service kèm theo
const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0000', '1111', '2222'], // 0000 - chung thoả mãn
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '30d',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema)
