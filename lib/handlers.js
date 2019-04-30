const { readFileSync } = require('fs')
const md = require('markdown-it')()
const { json, send } = require('micro')
const getAgreement = require('./get-agreement')
const addAgreement = require('./add-agreement')
const deleteAgreement = require('./delete-agreement')
const searchAgreements = require('./search-agreements')
const logger = require('./logger')

module.exports.frontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = readFileSync(`${__dirname}/../README.md`, 'utf-8')
  send(response, 200, md.render(readme))
}

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
