const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async (id, signee) => {
  const db = await mongo()
  const query = { _id: id }
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  const updates = {
    signedByAdmin: signee,
    updated: new Date()
  }
  const historyItem = {
    timeStamp: new Date().getTime(),
    changes: updates
  }
  try {
    const data = await collection.updateOne(query, { '$set': updates, '$push': { history: historyItem } })
    logger('info', ['sign-agreement', 'success'])
    return data
  } catch (error) {
    logger('error', ['sign-agreement', JSON.stringify(error)])
    throw error
  }
}
