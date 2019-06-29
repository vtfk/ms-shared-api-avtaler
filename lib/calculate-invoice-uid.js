const getAge = require('get-age')
const dateFromPersonalId = require('birthdate-from-id')

module.exports = document => {
  const isMinor = getAge(dateFromPersonalId(document.uid)) < 18
  // false if isMinor or not is signed
  let invoiceUid = isMinor ? false : document.isSigned ? document.uid : false
  if (isMinor) {
    const signedParts = document.parts.filter(part => part.isSigned)
    invoiceUid = signedParts.length > 0 ? signedParts[0].uid : false
  }
  return invoiceUid
}
