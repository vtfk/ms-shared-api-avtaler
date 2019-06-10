const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async id => {
  const payload = { _id: id }
  logger('info', ['delete-agreement', 'id', id])
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  try {
    const data = await collection.deleteOne(payload)
    logger('info', ['delete-agreement', 'success'])
    return data
  } catch (error) {
    logger('error', ['delete-agreement', JSON.stringify(error)])
    throw error
  }
}
