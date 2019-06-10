const { ObjectId } = require('mongodb')

module.exports = id => {
  let isMongoDbId
  try {
    ObjectId(id)
    isMongoDbId = true
  } catch (error) {
    isMongoDbId = false
  }
  return isMongoDbId
}
