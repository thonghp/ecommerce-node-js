'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')
const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESHTOKEN: 'x-token-id',
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
 * If there is refresh and access token check if it is valid then pass it all to the next middleware
 */
const authentication = asyncHandler(async (req, res, next) => {
  // check userId missing
  const userId = req.headers[HEADER.CLIENT_ID]
  if (!userId) throw new AuthFailureError('Invalid Request')

  // get entire keyStore
  const keyStore = await findByUserId(userId)
  if (!keyStore) throw new NotFoundError('Not found keyStore')

  if (req.headers[HEADER.REFRESHTOKEN]) {
    try {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN]
      const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)
      if (userId !== decodeUser.userId) {
        throw new AuthFailureError('Invalid userId')
      }
      req.keyStore = keyStore
      req.user = decodeUser
      req.refreshToken = refreshToken
      return next()
    } catch (error) {
      throw error
    }
  }

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

// verify thành công sẽ lấy được userId và email
const verifyJWT = async (token, keySecret) => {
  return await JWT.verify(token, keySecret)
}

module.exports = {
  createTokenPair,
  authentication,
  verifyJWT,
}
