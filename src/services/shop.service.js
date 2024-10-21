'use strict'

const shopModel = require('../models/shop.model')

const findByEmail = async ({
  email,
  select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1,
  },
}) => {
  /*
   * select dùng để chỉ định field nào sẽ trả về, chỉ định số dương để thể hiện là những trường này
   * sẽ hiển thị khi trả về
   * lean để convert object mongosee sang pojo js vì đối tượng gốc nó nặng do chứa nhiều state để
   * theo dõi thay đổi
   */
  return await shopModel.findOne({ email }).select(select).lean()
}

module.exports = {
  findByEmail,
}
