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

async function getUser(userId) {
  const userCartItems = await getCartItemsByUser(userId)
  const cards = await getCards()
  let cart
  if (userCartItems) {
    cart = cards.reduce((arr, card) => {
      const cartItem = userCartItems.filter(c => card.cardId === c.cardId && c.userId === userId)[0]
      if (cartItem) {
        arr.push({ ...card, quantity: cartItem.quantity })
      }
      return arr
    }, [])
  }
  const user = (await getUsers(u => u.userId === userId))[0]
  return { user, cart }
}

async function updateUser(userId, newInfo) {
  const user = await getUser(userId)
  if (!user) {
    return null
  }
  // doing this to make a new copy of the user to avoid subtle bugs
  // that rely on mutation.
  const newUserWithUpdates = Object.assign({}, user, newInfo)
  db.users[db.users.indexOf(user)] = newUserWithUpdates
  return newUserWithUpdates
}

async function deleteUser(userId) {
  const user = await getUser(userId)
  db.users = db.users.filter(u => u.userId !== userId)
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

async function getCard(cardId) {
  return (await getCards(c => c.cardId === cardId))[0]
}

async function updateCard(cardId, newInfo) {
  const card = await getCard(cardId)
  if (!card) {
    return null
  }
  // doing this to make a new copy of the card to avoid subtle bugs
  // that rely on mutation.
  const newCardWithUpdates = Object.assign({}, card, newInfo)
  db.cards[db.cards.indexOf(card)] = newCardWithUpdates
  return newCardWithUpdates
}

async function deleteCard(cardId) {
  const card = await getCard(cardId)
  if (!card) {
    return null
  }
  db.cards = db.cards.filter(c => c.cardId !== cardId)
  return card
}

/** Orders */

const getOrders = async filter => (filter ? db.orders.filter(filter) : [...db.orders])
const getOrder = async orderId => {
  const order = (await getOrders(o => o.orderId === orderId))[0]
  if (!order) {
    return null
  }
  return order
}
const getOrderTotal = async () =>
  db.orders.reduce((tot, order) => {
    let myTotal = tot
    order.orderLines.forEach(orderLine => (myTotal += orderLine.card.cost * orderLine.quantity))
    return myTotal
  }, 0)

const getCardsSoldByCategory = async () => {
  const cards = await getCards()
  const ordersByCategory = db.orders.reduce((arr, order) => {
    order.orderLines.forEach(orderLine => {
      const card = cards.filter(c => c.cardId === orderLine.card.cardId)[0]
      arr.push({ category: card.category, quantity: orderLine.quantity })
    })
    return arr
  }, [])
  const cardsSoldByCategory = ordersByCategory.reduce((arr, cur) => {
    const categoryIndex = arr.findIndex(val => val.category === cur.category)
    if (categoryIndex > -1) {
      arr[categoryIndex].quantity += cur.quantity
      return arr
    }
    arr.push(cur)
    return arr
  }, [])
  return cardsSoldByCategory
}

/** Cart */

const getCartItemsByUser = async userId => {
  const cartItems = userId ? db.cartItems.filter(cartItem => cartItem.userId === userId) : [...db.cartItems]
  if (cartItems.length === 0) {
    return null
  }
  return cartItems
}

const deleteCartItemsByUser = async userId => {
  const hasAtLeastOne = db.cartItems.some(cartItem => cartItem.userId === userId)
  if (!hasAtLeastOne) {
    return null
  }
  db.cartItems = db.cartItems.filter(cartItem => cartItem.userId !== userId)
  return 'deleted'
}

const insertCartItem = async cartItem => {
  db.cartItems.push(cartItem)
  return cartItem
}
const updateCartItem = async newInfo => {
  const cartItem = db.cartItems.filter(i => i.userId === newInfo.userId && i.cardId === newInfo.cardId)[0]
  if (!cartItem) {
    return null
  }
  // doing this to make a new copy of the card to avoid subtle bugs
  // that rely on mutation.
  const newCartItemWithUpdates = Object.assign({}, cartItem, newInfo)
  db.cartItems[db.cartItems.indexOf(cartItem)] = newCartItemWithUpdates
  return newCartItemWithUpdates
}

async function deleteCartItem(userId, cardId) {
  const cartItem = db.cartItems.filter(i => i.userId === userId && i.cardId === cardId)[0]
  if (!cartItem) {
    return null
  }
  db.cartItems = db.cartItems.filter(i => i.userId !== userId && i.cardId !== cardId)
  return cartItem
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
  getOrder,
  getOrderTotal,
  getCardsSoldByCategory,

  getCartItemsByUser,
  deleteCartItemsByUser,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
}

module.exports = db
