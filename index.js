const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

// Utilities
const handlers = require('./lib/handlers')
const handleUnauthorized = require('./lib/handle-unauthorized')

// Initialize a new router
const router = Router()

// CORS
router.use(cors())

// JWT
if (process.env.JWT_SECRET) {
  router.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [{ url: '/', methods: ['GET'] }, { url: '/docs', methods: ['GET'] }] }))
  router.use(handleUnauthorized)
}

// ROUTES
router.get('/', handlers.frontpage)
router.get('/docs', handlers.frontpage)
router.get('/agreements/:id', handlers.getAgreementById)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
