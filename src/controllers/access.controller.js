'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
  handleRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: 'get token success!',
      metadata: await AccessService.handleRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res)
  }

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout success!',
      metadata: await AccessService.logout(req.keyStore),
    }).send(res)
  }

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body),
    }).send(res)
  }

  signup = async (req, res, next) => {
    // return res.status(201).json(await AccessService.signup(req.body))

    new CREATED({
      message: 'Register ok!',
      metadata: await AccessService.signup(req.body),
      // giả sử ta muốn truyền thêm option thì làm như dưới
      // options: {
      //   limit: 10,
      // },
    }).send(res)

    // cách dùng static
    // CREATED.create({
    //   message: 'Register ok!',
    //   metadata: await AccessService.signup(req.body),
    // }).send(res)
  }
}

module.exports = new AccessController()
