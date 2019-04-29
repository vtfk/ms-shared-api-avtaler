const { readFileSync } = require('fs')
const md = require('markdown-it')()
const { json, send } = require('micro')
const getAgreement = require('./get-agreement')
const logger = require('./logger')

module.exports.frontpage = async (request, response) => {
  logger('info', ['handlers', 'frontpage'])
  const readme = readFileSync(`${__dirname}/../README.md`, 'utf-8')
  send(response, 200, md.render(readme))
}

module.exports.getAgreementById = async (request, response) => {
  const { id } = request.params
  const data = await json(request)
  logger('info', [data])
  let result = {}
  try {
    result = await getAgreement(id)
  } catch (error) {
    result.error = error.message
  }
  const status = result.error ? 500 : 200
  send(response, status, result)
}
