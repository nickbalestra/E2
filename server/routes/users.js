const usersController = require('../controllers/users')

function setupUserRoutes(router) {
  router.get('/authenticate/:email/:password', usersController.authenticateUser)

  router.get('/cartItems/', usersController.getCartItems)
  router.get('/cartItems/:userId', usersController.getCartItems)
  router.delete('/cartItems/:userId', usersController.deleteCartItems)
  router.delete('/cartItems/:userId/:cardId', usersController.deleteCartItem)
  router.post('/cartItems', usersController.createCartItem)
  router.put('/cartItems', usersController.updateCartItem)

  router.get('/:userId', usersController.getUser)
  router.get('/', usersController.getUsers)
  router.post('/', usersController.createUser)
}

module.exports = setupUserRoutes
