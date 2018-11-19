exports.createCard = async (req, res) => {
  const card = ['hi']
  if (card) {
    return res.json(card)
  }
  return res.status(404).send()
}

exports.getCards = async (req, res) => {
  const cards = ['Groceries', 'Brianna a Babe']
  if (cards) {
    return res.json(cards)
  }
  return res.status(404).send()
}

exports.updateCard = async (req, res) => {
  const card = {
    id: 1,
  }
  if (card) {
    return res.json(card)
  }
  return res.status(404).send()
}
exports.deleteCard = async (req, res) => {
  const card = {
    id: req.params.cardId,
  }
  if (card) {
    return res.json(card)
  }
  return res.status(404).send()
}

exports.getCard = async (req, res) => {
  const card = {
    id: 23423,
  }
  if (card) {
    return res.json(card)
  }
  return res.status(404).send()
}
