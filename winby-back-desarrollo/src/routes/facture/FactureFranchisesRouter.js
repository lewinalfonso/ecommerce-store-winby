const express = require('express')
const router = express.Router()
const FactureFranchisesController = require('../../controllers/facture/FactureFranchisesController')

/** API GET */
/** END GET */

/** API POST */
/** Registro de factura */
router.post('/web/register', FactureFranchisesController.register)
/** Confirmar Factura */
router.post('/web/confirm', FactureFranchisesController.confirm)
/** END POST */

module.exports = router