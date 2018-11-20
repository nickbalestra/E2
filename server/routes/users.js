const usersController = require('../controllers/users')

function setupUserRoutes(router) {
  router.get('/authenticate/:email/:password', usersController.authenticateUser)
  router.get('/:userId', usersController.getUser)
  router.get('/', usersController.getUsers)

  router.post('/', usersController.createUser)
}

module.exports = setupUserRoutes
