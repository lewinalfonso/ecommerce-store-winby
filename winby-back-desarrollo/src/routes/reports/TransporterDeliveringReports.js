const express = require('express')
const router = express.Router()
const TransporterDeliveringReports = require('../../controllers/reports/TransporterDeliveringReports')

router.post('/transporters/delivery', TransporterDeliveringReports.generateReport)

module.exports = router