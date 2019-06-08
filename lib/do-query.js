const mongo = require('./mongo')
const isDocumentSigned = require('./is-document-signed')
const logger = require('./logger')

module.exports = async payload => {
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  try {
    const documents = await collection.find(payload).toArray()
    logger('info', ['do-query', 'success', documents.length])
    const jobs = documents.map(async document => Object.assign({}, document, { isSigned: await isDocumentSigned(document) }))
    const results = await Promise.all(jobs)
    return results
  } catch (error) {
    logger('error', ['do-query', JSON.stringify(error)])
    throw error
  }
}
