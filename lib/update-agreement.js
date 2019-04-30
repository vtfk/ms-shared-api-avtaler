const mongo = require('./mongo')
const { ObjectId } = require('mongodb')
const logger = require('./logger')

module.exports = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const query = { _id: ObjectId(id) }
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    collection.updateOne(query, { '$set': updates }, (error, data) => {
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
