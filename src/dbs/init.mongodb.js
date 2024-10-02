'use strict'

// nên dùng cách singleton này để connect db
const mongoose = require('mongoose')
const { countConnect } = require('../helpers/check.connect')

const connectString =
  'mongodb+srv://demo:Lm46unV%40nWYpWVh@cluster0demo.vn9ld.mongodb.net/nodejs1'

class Database {
  constructor() {
    this.connect()
  }
  // type = 'mongodb' sau này muốn xài db khác thì thay type
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    // default maxPoolSize = 100
    /*
     * nhóm kết nối là tập hợp các kết nối của database mà có thể tái sử dụng được duy trì bởi database
     * khi ứng dụng yêu cầu kết nối nó sẽ kiểm tra nhóm kết nối trong poolsize, nếu có thì nó sẽ sử
     * dụng cho kết nối mới còn không có kết nối nào thì nó sẽ tạo kết nối mới và thêm vào trong nhóm
     * cơ chế này giống connection pool
     */
    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) => {
        console.log(`Connected mongodb successful`, countConnect())
      })
      .catch((err) => console.log('Error connect'))
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongoDB = Database.getInstance()
module.exports = instanceMongoDB
