'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')
const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
}
// create token pair with RSA algorithm
// const createTokenPair = async (payload, publicKey, privateKey) => {
//   try {
//     const accessToken = await JWT.sign(payload, privateKey, {
//       algorithm: 'RS256',
//       expiresIn: '2 days',
//     })

//     const refreshToken = await JWT.sign(payload, privateKey, {
//       algorithm: 'RS256',
//       expiresIn: '7 days',
//     })

//     JWT.verify(accessToken, publicKey, (err, decode) => {
//       if (err) {
//         console.log('error verify ', err)
//       } else {
//         console.log('decode verify ', decode)
//       }
//     })

//     return {
//       accessToken,
//       refreshToken,
//     }
//   } catch (error) {}
// }

/**
 * to generate a pair of access and refresh tokens using 2 keys of symmetric algorithm
 * @param {*} payload data to encode
 * @param {*} publicKey public key
 * @param {*} privateKey private key
 * @returns accessToken and refreshToken
 */
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      // symmetric should using public key
      expiresIn: '2 days',
    })

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    })

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error('error verify ', err)
      } else {
        console.log('decode verify ', decode)
      }
    })

    return {
      accessToken,
      refreshToken,
    }
  } catch (error) {}
}

/**
 * check if user id and access token are passed in header if yes then decode access token to check if this is token of user id in header
 */
const authentication = asyncHandler(async (req, res, next) => {
  // check userId missing
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid Request')

  // get access token
  const keyStore = await findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found keyStore')

  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid Request')

  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeUser.userId)
      throw new AuthFailureError('Invalid userId')
    req.keyStore = keyStore
    return next()
  } catch (error) {
    throw error
  }
})
module.exports = {
  createTokenPair,
  authentication,
}
