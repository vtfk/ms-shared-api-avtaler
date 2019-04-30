'use strict'

const jwt = require('jsonwebtoken')
const { name, version } = require('../package.json')

module.exports = secret => {
  const payload = {
    name: `${name}`,
    description: `${name} - ${version}`
  }

  const options = {
    expiresIn: '1m',
    issuer: 'https://auth.t-fk.no'
  }

  return jwt.sign(payload, secret, options)
}
