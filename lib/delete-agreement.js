const mongo = require('./mongo')
const { ObjectId } = require('mongodb')
const logger = require('./logger')

module.exports = id => {
  return new Promise(async (resolve, reject) => {
    const payload = { _id: ObjectId(id) }
    logger('info', ['delete-agreement', 'id', id])
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    collection.deleteOne(payload, (error, data) => {
      if (error) {
        logger('error', ['delete-agreement', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['delete-agreement', 'success'])
        resolve(data)
      }
    })
  })
}
