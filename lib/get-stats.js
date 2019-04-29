const mongo = require('./mongo')
const logger = require('./logger')

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    const payload = { system: id }

    logger('info', ['get-stats', 'system', id])

    collection.find(payload).toArray((error, documents) => {
      if (error) {
        logger('error', ['get-stats', id, JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['get-stats', id, 'success', documents.length])
        resolve(documents)
      }
    })
  })
}
