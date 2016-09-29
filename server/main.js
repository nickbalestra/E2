const path = require('path')
const express = require('express')
const app = express()

// API endpoints
const routes = require('./routes')
app.set('json spaces', 2)
app.get('/foo', routes.foo)

// Serving compiled elm client
const isDevelopment = process.env.NODE_ENV !== 'production'
if (isDevelopment) {
  require('./webpackServeBundle')(app)
} else {
  app.use(express.static(path.join(__dirname, '/../dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/../dist/index.html'))
  )
}

// Starting express
const port = isDevelopment ? 3000 : process.env.PORT
if (!module.parent) {
  app.listen(port, err => {
    if (err) console.log(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
