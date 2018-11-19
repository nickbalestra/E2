const ordersController = require('../controllers/orders')

function setupOrderRoutes(router) {
  router.get('/', ordersController.getOrders)
  router.get('/orderTotal', ordersController.getOrderTotal)
  router.get('/cardsSoldByCategory', ordersController.getCardsSoldByCategory)
  router.get('/:orderId', ordersController.getOrder)
}

module.exports = setupOrderRoutes
