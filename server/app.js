/* eslint-disable no-console */
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const errorHandlers = require('./handlers/errorHandlers')
const setupRoutes = require('./routes')
const db = require('./utils/db')
const generate = require('./utils/generate')

// initialize the application and create the routes
const app = express()

app.use(helmet())

// allow cors so my site can communicate with my back-end.
app.use(cors())

// so that I can look at the body of post requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

setupRoutes(app)

// API endpoints
app.set('json spaces', 2)

const isDevelopment = process.env.NODE_ENV !== 'production'

/* Initialize the database with some information */
const users = Array.from({ length: 9 }, () => generate.user())
users.push(generate.user({ userId: 1, isAdmin: true }))
const cards = generate.cards(10)
const orders = users.map((user, index) => ({
  orderId: generate.id(),
  user,
  orderLines: generate.orderLines([cards[index], cards[(index % 2) + 1], cards[(index % 3) + 1]]),
  orderDate: generate.orderDate(),
}))
const cartItems = users.map((user, index) => ({
  userId: user.userId,
  cardId: cards[index].cardId,
  quantity: index,
}))
db.users = users
db.cards = cards
db.orders = orders
db.cartItems = cartItems

// Serving compiled elm client
if (isDevelopment) {
  require('./webpackServeBundle')(app)
} else {
  app.use(express.static(path.join(__dirname, '/../dist')))
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/../dist/index.html')))
}

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (isDevelopment) {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

module.exports = app
