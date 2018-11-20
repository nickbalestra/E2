const db = require('../utils/db')

const intId = (req, property) => parseInt(req.params[property], 10)

exports.getOrders = async (req, res) => {
  const orders = await db.getOrders()
  if (orders) {
    return res.json(orders)
  }
  return res.status(404).send()
}

exports.getOrder = async (req, res) => {
  const order = await db.getOrder(intId(req, 'orderId'))
  if (order) {
    return res.json(order)
  }
  return res.status(404).send()
}

exports.getOrderTotal = async (req, res) => {
  const orderTotal = await db.getOrderTotal()
  return res.json(orderTotal)
}

exports.getCardsSoldByCategory = async (req, res) => {
  const cardsSoldByCategory = await db.getCardsSoldByCategory()
  if (cardsSoldByCategory) {
    return res.json(cardsSoldByCategory)
  }
  return res.status(404).send()
}
