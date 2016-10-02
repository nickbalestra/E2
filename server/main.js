const path = require('path')
const express = require('express')
const app = express()
const isDevelopment = process.env.NODE_ENV !== 'production'
const port = isDevelopment ? 3000 : process.env.PORT

// API endpoints
const routes = require('./routes')
app.set('json spaces', 2)
app.get('/color', routes.color)

// Serving compiled elm client
if (isDevelopment) {
  require('./webpackServeBundle')(app)
} else {
  app.use(express.static(path.join(__dirname, '/../dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/../dist/index.html'))
  )
}

// Starting express
if (!module.parent) {
  app.listen(port, err => {
    if (err) console.log(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
