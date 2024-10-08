'use strict'

const express = require('express')
const router = express.Router()

// router.get('/', (req, res, next) => {
//   return res.status(200).json({
//     message: 'hello',
//   })
// })
router.use('/v1/api', require('./access'))
// yarn start - curl http://localhost:3055/

module.exports = router
