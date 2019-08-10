const axios = require('axios')
const generateToken = require('./generate-jwt-token')
const updateAgreement = require('./update-agreement')
const logger = require('./logger')

function isSigned (logs) {
  if (!Array.isArray(logs)) {
    logs = [logs]
  }
  const types = logs.map(log => log.type)
  return types.includes('SigneringsoppdragFullfort')
}

function isCancelled (logs) {
  if (!Array.isArray(logs)) {
    logs = [logs]
  }
  const types = logs.map(log => log.type)
  return types.includes('SigneringsoppdragAvvistAvMottaker')
}

module.exports = async document => {
  const avtaleId = document.aid
  if (document.signedByAdmin || document.signedByService) {
    logger('info', ['is-document-signed', 'aid', avtaleId, 'signature checked'])
    return true
  } else if (document.cancelledByService) {
    logger('info', ['is-document-signed', 'aid', avtaleId, 'cancellation checked'])
    return false
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
      const signedStatus = isSigned(data.logg)
      const cancelledStatus = isCancelled(data.logg)
      if (signedStatus) {
        logger('info', ['is-document-signed', 'aid', avtaleId, 'fid', forsendelseId, 'isSigned', 'saving status'])
        await updateAgreement(document._id, { signedByService: true, status: 'signed' })
      } else if (cancelledStatus) {
        logger('info', ['is-document-signed', 'aid', avtaleId, 'fid', forsendelseId, 'isCancelled', 'saving status'])
        await updateAgreement(document._id, { cancelledByService: true, status: 'cancelled' })
      }
      return signedStatus
    } catch (error) {
      logger('error', ['is-document-signed', 'aid', avtaleId, 'fid', forsendelseId, `${error.response.data || error}`])
      return false
    }
  }
}
