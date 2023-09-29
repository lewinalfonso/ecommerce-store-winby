'use strict'
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const ShoppingCartController = require('../../controllers/shoppingCart/ShoppingCartController')

// Middelware que verifica el carrito
const cartValidatorMiddleware = (req, _res, next) => {
    if (!req.signedCookies?.shoppingcart) req.shoppingCart = { products: [], services: [], delivery: 0, invoicevendors: [] }
    else {
        try {
            const { products, services, delivery, invoicevendors, location } = jwt.verify(req.signedCookies.shoppingcart, process.env.JWT_SHOPPING_CART_KEY)
            req.shoppingCart = { products, services, delivery, location: location || {}, invoicevendors }
        } catch (_e) {
            req.shoppingCart = { products: [], services: [], delivery: 0, location: {}, invoicevendors: [] }
        }
    }
    next()
}

router.post('/', cartValidatorMiddleware, ShoppingCartController.getCartItems)
router.post('/add/newitem', cartValidatorMiddleware, ShoppingCartController.addNewItem)
router.post('/update/totalitem', cartValidatorMiddleware, ShoppingCartController.changeTotalItem)
router.post('/delete/item', cartValidatorMiddleware, ShoppingCartController.deleteItem)
router.post('/clean', cartValidatorMiddleware, ShoppingCartController.cleanCart)
router.post('/calculate/delivery', cartValidatorMiddleware, ShoppingCartController.calculateDelivery)
router.post('/create/invoice', cartValidatorMiddleware, ShoppingCartController.createInvoice)

module.exports = router