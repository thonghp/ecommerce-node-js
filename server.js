const app = require('./src/app')

const PORT = 3055

const server = app.listen(PORT, () => {
  console.log(`WSV start with ${PORT}`)
})

process.on('SIGINT', () => {
  // nhấn ctrl + c nó sẽ close server
  server.close(() => console.log('Exit server express'))
})
