const db = require('../utils/db')

exports.getUser = async (req, res) => {
  const user = await db.getUser(parseInt(req.params.userId, 10))
  if (!user) {
    return res.status(404).send()
  }
  const cart = await db.getCart(parseInt(req.params.userId, 10))

  return res.json({ user, cart })
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
