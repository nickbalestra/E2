const usersController = require('../controllers/users')

function setupUserRoutes(router) {
  router.get('/authenticate', usersController.authenticateUser)
  router.get('/:userId', usersController.getUser)

  router.post('/', usersController.createUser)
}

module.exports = setupUserRoutes
