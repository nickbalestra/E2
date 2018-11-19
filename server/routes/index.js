const express = require('express')
const setupCardRoutes = require('./cards')
const setupOrderRoutes = require('./orders')
const setupUserRoutes = require('./users')
const colors = require('../controllers/colors')

function setupRoutes(app) {
  const cardRouter = express.Router()
  setupCardRoutes(cardRouter)
  app.use('/api/cards', cardRouter)

  const userRouter = express.Router()
  setupUserRoutes(userRouter)
  app.use('/api/users', userRouter)

  const orderRouter = express.Router()
  setupOrderRoutes(orderRouter)
  app.use('/api/orders', orderRouter)

  app.get('/api/colors', colors.color)
}
module.exports = setupRoutes
