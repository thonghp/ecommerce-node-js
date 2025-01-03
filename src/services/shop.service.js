'use strict'

const shopModel = require('../models/shop.model')

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 1,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  /*
   * select dùng để chỉ định field nào sẽ trả về, chỉ định số dương để thể hiện là những trường này
   * sẽ hiển thị khi trả về, thường dùng 1 để thể hiện là hiển thị, 0 để thể hiện là không hiển thị
   */
  return await shopModel.findOne({ email }).select(select).lean()
}

module.exports = {
  findByEmail,
}
