const express = require('express')
const router = express.Router()
const TransporterController = require('../../controllers/transporters/TransportersControllers')
const TransporterRoutesController = require('../../controllers/transporters/TransportersRoutesControllers')
const RoutesControllers = require('../../controllers/transporters/RoutesControllers')

/** API POST */
router.post('/search/all', TransporterController.getAllTransporters)
router.post('/edit', TransporterController.editTransporter)
router.post('/transportersroutes/search/all', TransporterRoutesController.getAllTransportersRoutes)
router.post('/transportersroutes/register', TransporterRoutesController.registerTransporterRoutes)
router.post('/transportersroutes/delete', TransporterRoutesController.delete)
router.post('/routes/search/all', RoutesControllers.getAllRoutes)
router.post('/routes/register', RoutesControllers.registerRoute)
router.post('/routes/delete', RoutesControllers.delete)

/** END POST */

module.exports = router