const { ObjectId } = require('mongodb')
const doQuery = require('./do-query')
const isMongoDbId = require('./is-mongodb-id')

module.exports = async id => {
  let queryId
  if (isMongoDbId(id)) {
    queryId = ObjectId(id)
  } else {
    const documents = await doQuery({ aid: id })
    console.log(documents)
    queryId = ObjectId(documents[0]._id)
  }
  return queryId
}
