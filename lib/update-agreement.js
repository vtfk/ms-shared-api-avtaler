const mongo = require('./mongo')
const { ObjectId } = require('mongodb')
const logger = require('./logger')

module.exports = (id, updates) => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const query = { _id: ObjectId(id) }
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    const historyItem = {
      timeStamp: new Date().getTime(),
      changes: updates
    }
    collection.updateOne(query, { '$set': updates, '$push': { history: historyItem } }, (error, data) => {
      if (error) {
        logger('error', ['update-agreement', JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['update-agreement', 'success'])
        resolve(data)
      }
    })
  })
}
