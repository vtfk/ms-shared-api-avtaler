const doQuery = require('./do-query')
const logger = require('./logger')

module.exports = async fid => {
  const payload = {
    fid: fid
  }
  logger('info', ['get-parent-agreement', fid, 'start'])
  const agreements = await doQuery(payload)
  const agreement = agreements[0]
  if (agreement.partOf === '') {
    logger('info', ['get-parent-agreement', fid, 'isParent', 'success'])
    return agreement
  } else {
    logger('info', ['get-parent-agreement', fid, 'lookup parent', agreement.partOf, 'start'])
    const parent = await doQuery({ aid: agreement.partOf })
    logger('info', ['get-parent-agreement', fid, 'got parent', agreement.partOf, 'success'])
    return parent
  }
}
