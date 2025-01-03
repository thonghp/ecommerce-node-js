'use strict'

const crypto = require('node:crypto')
const apikeyModel = require('../models/apikey.model')

const createXApiKey = async () => {
  const newKey = await apikeyModel.create({
    key: crypto.randomBytes(64).toString('hex'),
    permissions: ['0000'],
  })
  // console.log(newKey) // để test, thường key này do đối tác tạo trước
  return newKey
}

const findById = async (key) => {
  const objKey = await apikeyModel.findOne({ key, status: true }).lean()

  return objKey
}

module.exports = {
  findById, createXApiKey
}
