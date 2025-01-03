'use strict'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}

const { findById } = require('../services/apikey.service')

/**
 * check if x api key is passed in header if so then check if this x api key is valid
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next middleware
 * @returns x api key info and pass to next middleware
 */
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })
    }

    const objKey = await findById(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error',
      })
    }

    req.objKey = objKey
    return next()
  } catch (error) {}
}

/**
 * check if permission is valid
 * @param {*} permission permission is passed in header
 * @returns next middleware
 */
const permission = (permission) => {
  return async (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }

    // console.log('permission::', req.objKey.permissions)
    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission denied',
      })
    }

    return next()
  }
}

module.exports = {
  apiKey,
  permission,
}
