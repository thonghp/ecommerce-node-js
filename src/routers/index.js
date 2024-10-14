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
// yarn start - curl http://localhost:3055/

module.exports = router
