const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()

// init middlewares-------------------------------------------------------------
app.use(morgan('dev')) // log
app.use(helmet()) // security lọc http chặn đọc cookie
app.use(compression()) // giảm bớt băng thông

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

module.exports = app
