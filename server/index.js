const path = require('path')
const express = require('express')
const app = express()
const isDev = process.env.NODE_ENV !== 'production'
const port = isDev ? 3000 : process.env.PORT


if (isDev) {
  require('./webpackServeBundle')(app)
} else {
  app.use(express.static(path.join(__dirname + '/../dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/../dist/index.html'))
  )
}

if (!module.parent) {
  app.listen(port, err => {
    if (err) console.log(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
