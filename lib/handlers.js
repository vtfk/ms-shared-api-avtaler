const { json, send } = require('micro')
const getAgreement = require('./get-agreement')
const addAgreement = require('./add-agreement')
const deleteAgreement = require('./delete-agreement')
const searchAgreements = require('./search-agreements')
const updateAgreement = require('./update-agreement')
const signAgreement = require('./sign-agreement')
const getParentAgreement = require('./get-parent-agreement')

module.exports.getAgreementById = async (request, response) => {
  const { id } = request.params
  let result = {}
  try {
    result = await getAgreement(id)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}

module.exports.addNewAgreement = async (request, response) => {
  const data = await json(request)
  let result = {}
  try {
    result = await addAgreement(data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}

module.exports.deleteAgreementById = async (request, response) => {
  const { id } = request.params
  let result = {}
  try {
    result = await deleteAgreement(id)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}

module.exports.searchAllAgreements = async (request, response) => {
  const data = await json(request)
  let result = {}
  try {
    result = await searchAgreements(data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}

module.exports.updateAgreementById = async (request, response) => {
  const { id } = request.params
  const data = await json(request)
  let result = {}
  try {
    result = await updateAgreement(id, data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}

module.exports.signAgreementById = async (request, response) => {
  const { id } = request.params
  const data = await json(request)
  let result = {}
  try {
    result = await signAgreement(id, data)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
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
  send(response, status, result)
}
