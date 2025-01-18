'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

// check apiKey
router.use(apiKey)
// check permission
router.use(permission('0000'))

// check permission có quyền truy cập không

router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))
// yarn start - curl http://localhost:3055/

module.exports = router
