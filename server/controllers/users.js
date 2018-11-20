const db = require('../utils/db')

const intId = (req, property) => parseInt(req.params[property], 10)

exports.getUser = async (req, res) => {
  const userAndCart = await db.getUser(intId(req, 'userId'))
  if (!userAndCart) {
    return res.status(404).send()
  }

  return res.json(userAndCart)
}

exports.getUsers = async (req, res) => {
  const users = await db.getUsers()
  return res.json(users)
}

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.params
  const isUser = await db.authenticateUser({ email, password })
  if (isUser) {
    return res.send('authenticated')
  }
  return res.status(401).send('unauthenticated')
}

exports.createUser = async (req, res) => {
  const createdUser = await db.insertUser(req.body)
  if (createdUser) {
    return res.json(createdUser)
  }
}

exports.getCartItems = async (req, res) => {
  const cartItems = await db.getCartItemsByUser(intId(req, 'userId'))
  if (!cartItems) {
    return res.status(404).send('no cart items found')
  }
  return res.json(cartItems)
}

exports.deleteCartItems = async (req, res) => {
  const cartItems = await db.deleteCartItemsByUser(intId(req, 'userId'))
  if (!cartItems) {
    return res.status(404)
  }
  return res.json(cartItems)
}

exports.createCartItem = async (req, res) => {
  const cartItem = await db.insertCartItem(req.body)
  if (!cartItem) {
    return res.status(404)
  }
  return res.json(cartItem)
}
exports.updateCartItem = async (req, res) => {
  const cartItem = await db.updateCartItem(req.body)
  if (!cartItem) {
    return res.status(404)
  }
  return res.json(cartItem)
}
exports.deleteCartItem = async (req, res) => {
  const cartItem = await db.deleteCartItem(intId(req, 'userId'), intId(req, 'cardId'))
  if (!cartItem) {
    return res.status(404)
  }
  return res.json(cartItem)
}
