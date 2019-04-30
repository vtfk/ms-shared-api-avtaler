const mongo = require('./mongo')
const logger = require('./logger')

module.exports = payload => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    collection.insertOne(payload, (error, data) => {
      if (error) {
        logger('error', ['add-agreement', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['add-agreement', 'success'])
        resolve(data)
      }
    })
  })
}
