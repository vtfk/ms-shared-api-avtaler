const mongo = require('./mongo')
const logger = require('./logger')

module.exports = payload => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    collection.find(payload).toArray((error, documents) => {
      if (error) {
        logger('error', ['do-query', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['do-query', 'success', documents.length])
        resolve(documents)
      }
    })
  })
}
