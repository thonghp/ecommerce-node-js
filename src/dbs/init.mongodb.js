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

    mongoose
      .connect(connectString)
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
