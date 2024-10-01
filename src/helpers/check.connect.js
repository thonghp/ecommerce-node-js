'use strict'
const mongoose = require('mongoose')
// check current number of connections in mongodb
const countConnect = () => {
  const numConnections = mongoose.connections.length
  console.log(`Number of connections: ${numConnections}`)
}

module.exports = { countConnect }
