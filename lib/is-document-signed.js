const axios = require('axios')
const generateToken = require('./generate-jwt-token')
const logger = require('./logger')

function isSigned (logs) {
  const types = logs.map(log => log.type)
  return types.includes('SigneringsoppdragFullfort')
}

module.exports = async document => {
  const avtaleId = document.aid
  if (document.signedByAdmin || document.signedByService) {
    logger('info', ['is-document-signed', 'aid', avtaleId, 'signature checked'])
    return true
  } else {
    const forsendelseId = document.fid
    const token = generateToken(process.env.SVARUT_SERVICE_SECRET)
    const instance = axios.create({
      baseURL: process.env.SVARUT_SERVICE_URL,
      headers: {
        common: {
          Authorization: token
        }
      }
    })
    logger('info', ['is-document-signed', 'aid', avtaleId, 'fid', forsendelseId, 'start'])
    try {
      const { data } = await instance.get(`/retrieveSigneringshistorikk/${forsendelseId}`)
      logger('info', ['is-document-signed', 'aid', avtaleId, 'fid', forsendelseId, 'success'])
      return isSigned(data.logg)
    } catch (error) {
      logger('error', ['is-document-signed', 'aid', avtaleId, 'fid', forsendelseId, `${error.response.data || error}`])
      return false
    }
  }
}
