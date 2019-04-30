const doQuery = require('./do-query')
const getAgreement = require('./get-agreement')
const logger = require('./logger')

module.exports = payload => {
  return new Promise(async (resolve, reject) => {
    let query = {
      uid: { '$in': payload.uids }
    }
    if (payload.type) {
      query.type = payload.type
    }
    const agreements = await doQuery(query)
    logger('info', ['search-agreements', 'success', agreements.length])
    const jobs = agreements.map(document => getAgreement(document._id))
    const results = await Promise.all(jobs)
    return resolve(results)
  })
}
