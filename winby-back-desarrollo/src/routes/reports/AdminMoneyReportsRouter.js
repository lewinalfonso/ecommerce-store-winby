const express = require('express')
const router = express.Router()
const AdminMoneyReportsController = require('../../controllers/reports/AdminMoneyReportsController')

/** Busca todas las coincidencias de categorías */
router.post('/money', AdminMoneyReportsController.getAdminMoney)
/** Busca todas las coincidencias de productos y servicios */
router.post('/search/all', AdminMoneyReportsController.getAllAdminMoneyReports)

module.exports = router