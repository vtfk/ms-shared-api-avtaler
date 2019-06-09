const test = require('ava')
const { ObjectId } = require('mongodb')

const resolveIdQuery = require('../../lib/resolve-id-query')

test('it returns _id for mongoDB ids', t => {
  const _id = '5cfba60a47289a8314684faf'
  t.deepEqual({ _id: ObjectId(_id) }, resolveIdQuery('5cfba60a47289a8314684faf'), 'This is an _id')
})

test('it returns aid for aids', t => {
  const aid = '5514ec16-59bf-4009-bd5d-452c57144a17'
  t.deepEqual({ aid: aid }, resolveIdQuery(aid), 'This is an aid')
})
