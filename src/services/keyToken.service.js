'use strict'

const {
  Types: { ObjectId },
} = require('mongoose')
const keytokenModel = require('../models/keytoken.model')

class KeyTokenService {
  /**
   * save key and user id to db if id exists then update if not exist then create new
   * @returns publicKey
   */
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      // code rsa
      // const publicKeyString = publicKey.toString()
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey: publicKeyString,
      // })

      // level 0------------------------------------------------------
      // const tokens = await keytokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // })

      // level xxx----------------------------------------------------
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
        options = { upsert: true, new: true }
      /*
       * upsert true => nếu userId không tồn tại => create, có rồi => update
       * new true => trả về document sau khi update hoặc create, mặc định là trả về document trước update
       */
      const tokens = await keytokenModel.findOneAndUpdate(
        filter,
        update,
        options
      )

      // --------------đoạn dưới này xài chung cho cả 3 level
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }

  static findByUserId = async (userId) => {
    return await keytokenModel
      .findOne({ user: ObjectId.createFromHexString(userId) })
  }

  static removeKeyById = async (id) => {
    const delKey = await keytokenModel.deleteOne({ _id: id })

    return delKey
  }

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await keytokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean()
  }

  static deleteKeyById = async (userId) => {
    return await keytokenModel.deleteOne({
      user: ObjectId.createFromHexString(userId),
    })
  }

  static findByRefreshToken = async (refreshToken) => {
    return await keytokenModel.findOne({ refreshToken: refreshToken })
  }
}

module.exports = KeyTokenService
