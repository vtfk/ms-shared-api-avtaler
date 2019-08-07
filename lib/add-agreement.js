const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async payload => {
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  const now = new Date()
  try {
    payload.created = now
    payload.updated = now
    const data = await collection.insertOne(payload)
    logger('info', ['add-agreement', 'success'])
    return data
  } catch (error) {
    logger('error', ['add-agreement', JSON.stringify(error)])
    throw error
  }
}
