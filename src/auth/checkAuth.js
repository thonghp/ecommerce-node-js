'use strict'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}

const { findById } = require('../services/apikey.service')

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

/*
 * hàm xử lý bắt lỗi không cần try catch, khi lỗi xảy ra, catch sẽ tự động gọi next() với lỗi đó và lỗi
 * sẽ được truyền tới middleware xử lý lỗi
 * thường sử dụng khi ta không muốn tạo try catch hoặc có 100 route thì ta phải copy cả 100 cái try catch
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

module.exports = {
  apiKey,
  permission,
  asyncHandler,
}
