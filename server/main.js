/* eslint-disable no-console */

const app = require('./app')
const isDevelopment = process.env.NODE_ENV !== 'production'
const port = isDevelopment ? 3000 : process.env.PORT

// Starting express
if (!module.parent) {
  app.listen(port, err => {
    if (err) console.error(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
