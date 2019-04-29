const mongo = require('./mongo')
const logger = require('./logger')

module.exports = options => {
  return new Promise(async (resolve, reject) => {
    const db = await mongo()
    const collection = db.collection(process.env.MONGODB_COLLECTION)
    const payload = Object.assign(options.data, { system: options.id })
    const mongoOptions = {
      query: { system: options.id },
      update: { '$set': payload },
      new: true,
      upsert: true
    }

    logger('info', ['set-stats', 'system', options.id])

    collection.findAndModify(mongoOptions, (error, document) => {
      if (error) {
        logger('error', ['set-stats', options.id, JSON.stringify(error)])
        reject(error)
      } else {
        logger('info', ['set-stats', options.id, 'success'])
        resolve(document)
      }
    })
  })
}
