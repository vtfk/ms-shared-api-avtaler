const mongo = require('./mongo')
const { ObjectId } = require('mongodb')
const logger = require('./logger')

function doQuery (payload) {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    collection.find(payload).toArray((error, documents) => {
      if (error) {
        logger('error', ['get-agreement', 'doQuery', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['get-agreement', 'doQuery', 'success', documents.length])
        resolve(documents)
      }
    })
  })
}

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
