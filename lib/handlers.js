const resolveQueryId = require('./resolve-query-id')
const getAgreement = require('./get-agreement')
const addAgreement = require('./add-agreement')
const deleteAgreement = require('./delete-agreement')
const searchAgreements = require('./search-agreements')
const updateAgreement = require('./update-agreement')
const signAgreement = require('./sign-agreement')
const getParentAgreement = require('./get-parent-agreement')
const logger = require('./logger')

module.exports.getAgreementById = async (request, response) => {
  logger('info', ['lib', 'handlers', 'getAgreementById', 'start'])
  const { id } = request.params
  let result = {}
  const queryId = await resolveQueryId(id)
  logger('info', ['lib', 'handlers', 'getAgreementById', 'queryId', queryId])
  try {
    result = await getAgreement(queryId)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}

module.exports.addNewAgreement = async (request, response) => {
  const data = await request.body
  let result = {}
  try {
    result = await addAgreement(data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}

module.exports.deleteAgreementById = async (request, response) => {
  const { id } = request.params
  let result = {}
  const queryId = await resolveQueryId(id)
  try {
    result = await deleteAgreement(queryId)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}

module.exports.searchAllAgreements = async (request, response) => {
  const data = await request.body
  let result = {}
  try {
    result = await searchAgreements(data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}

module.exports.updateAgreementById = async (request, response) => {
  const { id } = request.params
  const data = await request.body
  let result = {}
  const queryId = await resolveQueryId(id)
  try {
    result = await updateAgreement(queryId, data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}

module.exports.signAgreementById = async (request, response) => {
  const { id } = request.params
  const data = await request.body
  let result = {}
  const queryId = await resolveQueryId(id)
  try {
    result = await signAgreement(queryId, data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}

module.exports.getParentByFid = async (request, response) => {
  const { fid } = request.params
  let result = {}
  try {
    result = await getParentAgreement(fid)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  response.status(status)
  response.json(result)
}
