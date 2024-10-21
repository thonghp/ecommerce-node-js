'use strict'

const keytokenModel = require('../models/keytoken.model')

class KeyTokenService {
  // static createKeyToken = async ({ userId, publicKey }) => { // cách nâng cao
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

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

module.exports = KeyTokenService
