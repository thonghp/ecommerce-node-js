const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

// init middlewares-------------------------------------------------------------
app.use(morgan('dev')) // log
app.use(helmet()) // security lọc http chặn đọc cookie
app.use(compression()) // nén các response http giúp giảm băng thông

// convert json to object js
app.use(express.json()) // xử lý request với content type application/json
app.use(express.urlencoded({ extended: true })) // content type application/x-www-form-urlencoded

// init db----------------------------------------------------------------------
require('./dbs/init.mongodb')
// const { checkOverload } = require('./helpers/check.connect')
// checkOverload()

// init routes------------------------------------------------------------------
app.use('/', require('./routers'))

// handling error---------------------------------------------------------------
app.use((req, res, next) => {
  // tạo error 404 xử lý không có route nào khớp
  const error = new Error('Not found')
  error.status = 404
  next(error) // chuyển sang middleware xử lý error
})

app.use((error, req, res, next) => {
  // xử lý đọc error (bao gồm error ở trên)
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    //    stack: error.stack, // dùng để log ra xem lỗi dòng bao nhiêu
    message: error.message || 'Internal Server Error',
  })
})

module.exports = app
