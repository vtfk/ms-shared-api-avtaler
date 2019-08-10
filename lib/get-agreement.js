const doQuery = require('./do-query')
const isDocumentSigned = require('./is-document-signed')
const calculateInvoiceUid = require('./calculate-invoice-uid')
const logger = require('./logger')

module.exports = async id => {
  const payload = { _id: id }
  logger('info', ['lib', 'get-agreement', 'id', id])
  const documents = await doQuery(payload)
  const document = documents[0]
  const signedStatus = await isDocumentSigned(document)
  document.isSigned = signedStatus
  logger('info', ['lib', 'get-agreement', 'id', id, 'looking up parts', 'aid', document.aid])
  const query = { partOf: document.aid }
  const parts = await doQuery(query)
  const output = Object.assign({}, document, { parts: parts })
  output.sendInvoiceToUid = calculateInvoiceUid(output)
  return output
}
