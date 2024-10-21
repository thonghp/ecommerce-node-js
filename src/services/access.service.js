'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError, AuthFailureError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')

const RoleShop = {
  SHOP: 'SHOP',
  EDITOR: 'EDITOR',
  WRITTER: 'WRITTER',
  ADMIN: 'ADMIN',
}

class AccessService {
  /*
   * Cái refreshtoken ở đây mang theo để khi user login lại nhung mà có cookie rồi thì bảo ae fe cũng
   * phải mang cái cookie đó đi theo để chúng ta biết user này hồi xưa dùng token này nè, muốn login
   * lại thì ta xoá cookie cũ đi khỏi truy vấn db làm cái gì để cho nó nhanh
   */
  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email })
    if (!foundShop) throw new BadRequestError('Shop not registered')

    const match = bcrypt.compare(password, foundShop.password)
    if (!match) throw new AuthFailureError('Authentication error')

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const { _id: userId } = foundShop
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    )

    await KeyTokenService.createKeyToken({
      userId,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    })

    return {
      shop: getInfoData({
        fileds: ['_id', 'name', 'email'],
        object: foundShop,
      }),
      tokens,
    }
  }

  static signup = async ({ name, email, password }) => {
    // try {
    const holderShop = await shopModel.findOne({ email }).lean()
    if (holderShop) {
      // return {
      //   code: 'xxxx',
      //   message: 'Error: Email already exists',
      // }
      throw new BadRequestError('Error: Email already exists')
    }

    // 10 là đẹp lớn hơn thì cpu phải mạnh
    const passwordHash = await bcrypt.hash(password, 10)
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    })

    if (newShop) {
      // cách cơ bản
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      // cách nâng cao
      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem',
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem',
      //   },
      // })
      // console.log({ privateKey, publicKey })

      // save publicKey into database
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      })

      // cách nâng cao
      // const publicKeyString = await KeyTokenService.createKeyToken({
      //   userId: newShop._id,
      //   publicKey,
      // })

      // if (!publicKeyString) { // cách nâng cao
      if (!keyStore) {
        return {
          code: 'xxxx',
          message: 'keyStore error!',
          // message: 'publicKeyString error!',
        }
      }

      // cách nâng cao
      // console.log(`publicKeyString:`, publicKeyString)
      // const publicKeyObject = crypto.createPublicKey(publicKeyString) // convert string to object
      // console.log(`publicKeyObject:`, publicKeyObject)

      // const tokens = await createTokenPair(
      //   { userId: newShop._id, email },
      //   publicKeyString,
      //   privateKey
      // )

      const tokens = await createTokenPair(
        { userId: newShop._id, email },
        publicKey,
        privateKey
      )
      console.log('created token successful', tokens)
      return {
        code: 201,
        metadata: {
          shop: getInfoData({
            fileds: ['_id', 'name', 'email'],
            object: newShop,
          }),
          tokens,
        },
      }
    }

    return {
      code: 200,
      metadata: null,
    }
    // } catch (error) {
    //   return {
    //     code: 'xxx',
    //     message: error.message,
    //     status: 'error',
    //   }
    // }
  }
}

module.exports = AccessService
