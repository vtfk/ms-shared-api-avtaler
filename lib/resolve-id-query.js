const { ObjectId } = require('mongodb')

module.exports = id => {
  let query = {}
  try {
    query._id = ObjectId(id)
  } catch (error) {
    query.aid = id
  }
  return query
}
