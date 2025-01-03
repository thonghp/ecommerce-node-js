const app = require('./src/app')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3055
// khởi động server ==> node --watch server.js, server sẽ gọi callback và trả về thông báo
const server = app.listen(PORT, () => {
  console.log(`WSV start with ${PORT}`)
})
// SIGINT đại diện cho ctl + c
process.on('SIGINT', () => {
  // nhấn ctrl + c nó sẽ close server
  server.close(() => console.log('Exit server express'))
})
