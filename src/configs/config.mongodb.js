'use strict'

// level 0
// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     user: 'demo',
//     pw: 'Lm46unV%40nWYpWVh',
//     db: 'nodejs1',
//   },
// }

// module.exports = config

// level 1
// const dev = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     user: 'demo',
//     pw: 'Lm46unV%40nWYpWVh',
//     db: 'dbDev',
//   },
// }

// const pro = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     user: 'demo',
//     pw: 'Lm46unV%40nWYpWVh',
//     db: 'dbPro',
//   },
// }
// const config2 = { dev, pro }
// const env = process.env.NODE_ENV || 'dev'
// module.exports = config2[env]

// level cao
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },
  db: {
    user: process.env.DEV_DB_USER || 'demo',
    pw: process.env.DEV_DB_PW || 'Lm46unV%40nWYpWVh',
    db: process.env.DEV_DB_NAME || 'nodejs1',
  },
}

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 3052,
  },
  db: {
    user: process.env.PRO_DB_USER || 'demo',
    pw: process.env.PRO_DB_PW || 'Lm46unV%40nWYpWVh',
    db: process.env.PRO_DB_NAME || 'dbPro',
  },
}
const config2 = { dev, pro }
const env = process.env.NODE_ENV || 'dev'
module.exports = config2[env]
