const { ObjectId } = require('mongodb')
const doQuery = require('./do-query')
const isMongoDbId = require('./is-mongodb-id')
const logger = require('./logger')

module.exports = async id => {
  let queryId
  logger('info', ['lib', 'resolve-query-id', 'id', id, 'start'])
  if (isMongoDbId(id)) {
    queryId = ObjectId(id)
  } else {
    logger('info', ['lib', 'resolve-query-id', 'id', id, 'looking up from aid'])
    const documents = await doQuery({ aid: id })
    queryId = ObjectId(documents[0]._id)
  }
  logger('info', ['lib', 'resolve-query-id', 'queryId', queryId, 'success'])
  return queryId
}
