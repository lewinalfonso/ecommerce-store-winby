const express = require('express')
const router = express.Router()
const SearcherController = require('../../controllers/searcher/SearcherController')

/** Busca todas las coincidencias de categorías */
router.post('/categories/all', SearcherController.getAllMatchesCategories)
/** Busca todas las coincidencias de productos y servicios */
router.post('/products/all', SearcherController.getAllMatchesProducts)

module.exports = router