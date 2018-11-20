const db = require('../utils/db')

exports.createCard = async (req, res) => {
  const newCard = await db.insertCard(req.body)
  if (newCard) {
    return res.json(newCard)
  }
  return res.status(404).send()
}

exports.getCards = async (req, res) => {
  const cards = await db.getCards()
  if (cards) {
    return res.json(cards)
  }
  return res.status(404).send()
}

exports.updateCard = async (req, res) => {
  const newCard = await db.updateCard(parseInt(req.params.cardId, 10), req.body)
  if (newCard) {
    return res.json(newCard)
  }
  return res.status(404).send()
}
exports.deleteCard = async (req, res) => {
  const deletedCard = await db.deleteCard(parseInt(req.params.cardId, 10))
  if (deletedCard) {
    return res.json(deletedCard)
  }
  return res.status(404).send()
}

exports.getCard = async (req, res) => {
  const card = await db.getCard(parseInt(req.params.cardId, 10))
  if (card) {
    return res.json(card)
  }
  return res.status(404).send()
}
