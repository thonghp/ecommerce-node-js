'use strict'

const { CREATED, SuccessResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
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
