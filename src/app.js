const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

// init middlewares
app.use(morgan('dev')) // log
app.use(helmet()) // security lọc http chặn đọc cookie
app.use(compression()) // giảm bớt băng thông

// init db
require('./dbs/init.mongodb')
// const { checkOverload } = require('./helpers/check.connect')
// checkOverload()

// init routes
app.get('/', (req, res, next) => {
  const strCompress = 'repeat 100000'

  return res.status(200).json({
    message: 'hello',
    metadata: strCompress.repeat(10000),
  })
})
// handling error

module.exports = app
