'use strict'

/*
 * nhờ vào require khi ta đăng ký một module thì nó sẽ kết lại không gọi nữa nhưng trong java nó sẽ tạo
 * một kết nối mới mỗi khi export hay require một module khác nhưng mà không phải trên môi trường node
 * dẫn đến nhiều connect được tạo ra cho cùng 1 database dễ gây ra sự cố tải kết nối
 */
const mongoose = require('mongoose')

const connectString =
  'mongodb+srv://demo:Lm46unV%40nWYpWVh@cluster0demo.vn9ld.mongodb.net/nodejs1'

mongoose
  .connect(connectString)
  .then((_) => console.log('Connected mongodb successful'))
  .catch((err) => console.log('Error connect'))

// dev
if (1 === 1) {
  mongoose.set('debug', true)
  mongoose.set('debug', { color: true })
}

module.exports = mongoose
