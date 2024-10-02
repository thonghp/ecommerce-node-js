'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000

// check current number of connections in mongodb
const countConnect = () => {
  const numConnections = mongoose.connections.length
  console.log(`Number of connections: ${numConnections}`)
}

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss

    // Giả sử mỗi core của máy chịu được 5 connection, lưu ý không nên đặt chịu tải tối đa gần bằng máy
    const maxConnections = numCores * 5

    console.log(`Activate connections: ${numConnection}`)
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    if (numConnection > maxConnections) {
      console.log(`Connections overload detected`)
      // notify.send(...)
    }
  }, _SECONDS) // monitor every 5 seconds
}

// không cần disconnect db trên mongo vì bên mongo nó có pool tự làm rồi

module.exports = { countConnect, checkOverload }
