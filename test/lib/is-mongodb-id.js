const test = require('ava')

const isMongoDbId = require('../../lib/is-mongodb-id')

test('it returns true for mongoDB ids', t => {
  t.is(true, isMongoDbId('5cfba60a47289a8314684faf'), 'This is an _id')
})

test('it returns false for aids', t => {
  t.is(false, isMongoDbId('5514ec16-59bf-4009-bd5d-452c57144a17'), 'This is an aid')
})
