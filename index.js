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
  router.use(jwt({ secret: process.env.JWT_SECRET }))
  router.use(handleUnauthorized)
}

// ROUTES
router.post('/agreements/search', handlers.searchAllAgreements)
router.get('/agreements/:id', handlers.getAgreementById)
router.post('/agreements/:id', handlers.updateAgreementById)
router.post('/agreements/:id/sign', handlers.signAgreementById)
router.delete('/agreements/:id', handlers.deleteAgreementById)
router.get('/agreements/parent/:fid', handlers.getParentByFid)
router.put('/agreements', handlers.addNewAgreement)

module.exports = (request, response) => {
  router(request, response, finalhandler(request, response))
}
