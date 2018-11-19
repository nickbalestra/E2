const cardsController = require('../controllers/cards')

function setupCardRoutes(router) {
  router.get('/', cardsController.getCards)
  router.post('/:cardId', cardsController.createCard)
  router.put('/:cardId', cardsController.updateCard)
  router.delete('/:cardId', cardsController.deleteCard)
}

module.exports = setupCardRoutes
