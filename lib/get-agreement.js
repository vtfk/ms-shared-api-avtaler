const doQuery = require('./do-query')
const isDocumentSigned = require('./is-document-signed')
const logger = require('./logger')

module.exports = async id => {
  const payload = { _id: id }
  logger('info', ['get-agreement', 'id', id])
  const documents = await doQuery(payload)
  let document = documents[0]
  document.isSigned = await isDocumentSigned(document)
  const query = { partOf: document.aid }
  const parts = await doQuery(query)
  return Object.assign({}, document, { parts: parts })
}
