exports.getOrders = async (req, res) => {
  const orders = ['Groceries', 'Brianna a Babe']
  if (orders) {
    return res.json(orders)
  }
  return res.status(404).send()
}

exports.getOrder = async (req, res) => {
  const order = {
    id: 23423,
  }
  if (order) {
    return res.json(order)
  }
  return res.status(404).send()
}

exports.getOrderTotal = async (req, res) => {
  const amount = 23423
  return res.json(amount)
}

exports.getCardsSoldByCategory = async (req, res) => {
  const categories = [
    {
      category: 'Christmas',
      quantity: 301,
    },
    {
      category: 'Birthday',
      quantity: 5130,
    },
  ]
  if (categories) {
    return res.json(categories)
  }
  return res.status(404).send()
}
