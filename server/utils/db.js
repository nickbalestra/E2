const generate = require('./generate')

/** Users */

async function insertUser(user) {
  const newUser = {
    ...user,
    userId: generate.id(),
  }
  db.users.push(newUser)
  return newUser
}

async function getUsers(filter) {
  return filter ? db.users.filter(filter) : [...db.users]
}

async function getUser(id) {
  return (await getUsers(u => u.userId === id))[0]
  const cartItems = await getCartItems(id)
  const cards = await getCards()
  const cart = {
    items: cartItems.map(cartItem => cards.filter(card => card.cardId === cartItem.cardId)),
  }
}

async function updateUser(id, newInfo) {
  const user = await getUser(id)
  if (!user) {
    return null
  }
  // doing this to make a new copy of the user to avoid subtle bugs
  // that rely on mutation.
  const newUserWithUpdates = Object.assign({}, user, newInfo)
  db.users[db.users.indexOf(user)] = newUserWithUpdates
  return newUserWithUpdates
}

async function deleteUser(id) {
  const user = await getUser(id)
  db.users = db.users.filter(u => u.id !== id)
  return user
}

async function authenticateUser(auth) {
  const user = (await getUsers(u => u.email === auth.email))[0]
  if (!user) {
    return null
  }
  return user.password === auth.password
}

/** Cards */

async function insertCard(card) {
  const newCard = {
    ...card,
    cardId: generate.id(),
  }
  db.cards.push(newCard)
  return newCard
}

async function getCards(filter) {
  return filter ? db.cards.filter(filter) : [...db.cards]
}

async function getCard(id) {
  return (await getCards(c => c.cardId === id))[0]
}

async function updateCard(id, newInfo) {
  const card = await getCard(id)
  if (!card) {
    return null
  }
  // doing this to make a new copy of the card to avoid subtle bugs
  // that rely on mutation.
  const newCardWithUpdates = Object.assign({}, card, newInfo)
  db.cards[db.cards.indexOf(card)] = newCardWithUpdates
  return newCardWithUpdates
}

async function deleteCard(id) {
  const card = await getCard(id)
  if (!card) {
    return null
  }
  db.cards = db.cards.filter(c => c.cardId !== id)
  return card
}

/** Orders */

const getOrders = async filter => (filter ? db.orders.filter(filter) : [...db.orders])

/** Cart */

const getCartItems = async userId => {
  const cartItems = cartItems.filter(cartItem => cartItem.userId === userId)
  return cartItems
}

const db = {
  users: [],
  cards: [],
  orders: [],
  cartItems: [],

  insertUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  authenticateUser,

  insertCard,
  getCard,
  getCards,
  updateCard,
  deleteCard,

  getOrders,
}

module.exports = db
