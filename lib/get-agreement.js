const { ObjectId } = require('mongodb')
const doQuery = require('./do-query')
const logger = require('./logger')

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    const payload = { _id: ObjectId(id) }
    logger('info', ['get-agreement', 'id', id])
    const documents = await doQuery(payload)
    const document = documents[0]
    const query = { partOf: document.aid }
    const parts = await doQuery(query)
    return resolve(Object.assign({}, document, { parts: parts }))
  })
}
