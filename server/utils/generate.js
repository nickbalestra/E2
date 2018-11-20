const faker = require('faker')

const cardUrls = [
  'https://cdn.shopify.com/s/files/1/0558/4569/products/PC226-MERCI_400x.jpg?v=1446402893',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/DOBS-THANKS2_400x.jpg?v=1404225912',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/ALWAYS-FOREVER3_400x.jpg?v=1404230274',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/AVERYHBD2_400x.jpg?v=1508760077',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/PC210-ABSTRACTTHINKING_400x.jpg?v=1422898512',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/PC225-ABSTRACTTY_400x.jpg?v=1446402754',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/ALL-THE-DAYS1_400x.jpg?v=1420127707',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/BDAY-STRETCH1_400x.jpg?v=1404160766',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/PC203-BIGSTAR_400x.jpg?v=1422897871',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/PC234-BDAYFORECAST_400x.jpg?v=1446402589',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/ALPHA-BLK-WIDE_400x.jpg?v=1438884418',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/BROWSER-HISTORY1_400x.jpg?v=1420127498',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/BDAY-WISHES1_400x.jpg?v=1508964914',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/HEART-GOLD-WIDE_400x.jpg?v=1438884573',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/CAT-ANGEL_400x.jpg?v=1404246149',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/CARPE-DIEM-WIDE_400x.jpg?v=1438884451',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/PC215-BUTTTHANKS_400x.jpg?v=1422899073',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/CLUB-BABY2_400x.jpg?v=1404234539',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/JOY1_400x.jpg?v=1446490387',
  'https://cdn.shopify.com/s/files/1/0558/4569/products/CHEERS-WHT_400x.jpg?v=1416259320',
]

const generate = {
  card: () => ({
    cardId: faker.random.number(),
    title: faker.commerce.productName(),
    imageUrl: cardUrls[faker.random.number({ min: 0, max: cardUrls.length - 1 })],
    cost: faker.random.number({ min: 100, max: 1500 }),
    category: faker.commerce.productAdjective(),
  }),
  cards: numberToCreate => {
    const cards = Array.from({ length: numberToCreate }, () => generate.card())
    return cards
  },
  id: () => faker.random.number(),
  orderDate: () => faker.date.past(),
  orderLines: cards => {
    const orderLines = cards.map(card => ({
      orderLineId: faker.random.number(),
      card,
      quantity: faker.random.number({ min: 1, max: 30 }),
    }))
    return orderLines
  },
  user: overrides => ({
    userId: faker.random.number(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: false,
    ...overrides,
  }),
}

module.exports = generate
