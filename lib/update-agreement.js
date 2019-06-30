const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async (id, updates) => {
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  const payload = { _id: id }
  const historyItem = {
    timeStamp: new Date().getTime(),
    changes: updates
  }
  updates.updated = new Date()
  try {
    const data = await collection.updateOne(payload, { '$set': updates, '$push': { history: historyItem } })
    logger('info', ['update-agreement', 'success'])
    return data
  } catch (error) {
    logger('error', ['update-agreement', JSON.stringify(error)])
    throw error
  }
}
