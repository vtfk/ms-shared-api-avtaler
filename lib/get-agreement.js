const mongo = require('./mongo')
const { ObjectId } = require('mongodb')
const logger = require('./logger')

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    const payload = { _id: ObjectId(id) }

    logger('info', ['get-stats', 'system', id])

    collection.find(payload).toArray((error, documents) => {
      if (error) {
        logger('error', ['get-agreement', id, JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['get-agreement', id, 'success', documents.length])
        resolve(documents)
      }
    })
  })
}
