const express = require('express')
const router = express.Router()
const UserBankEntitiesController = require('../../controllers/users/UserBankEntitiesController')
const UserAdvertisingsController = require('../../controllers/users/UserAdvertisingsController')
const UsersController = require('../../controllers/users/UsersController')
const UserMoneysController = require('../../controllers/users/UserMoneysController')
const MoneyReportsController = require('../../controllers/users/MoneyReportsController')
const UsersSponsorsController = require('../../controllers/users/UsersSponsorsController')
const UsersRedController = require('../../controllers/users/UsersRedController')
const UserRecoverAccount = require('../../controllers/users/UserRecoverAccount')

const multer = require('multer')
const path = require('path')

let storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../temp'),
    filename: (req, file, next) => {
        next(null, file.originalname)
    }
})

/** API GET */
/** Empresario */
/** busca el email de un usuario por el codigo */
router.get('/search/email/:code', UsersController.getEmailCodUser)
/** busca la informacion de la billetera */
router.get('/search/wallet/:u_id', UsersController.getInfoWallet)
/** busca la informacion de la red */
router.get('/search/red/:u_id', UsersController.getRedUser)
/** busca los directos de un usuario franquisia */
router.get('/search/network/direct/:u_id', UsersController.networkDirectUser)
/** END GET */

/** API POST */

/**
 * Delivery
 */

// Actuliza la dirección de envio del usuario
router.post('/update/delivery', UsersController.updateUserDelivery)

// Utiles
/** Obtiene todos los usuarios de la red de liquidación. */
router.post('/search/all/network/liquidations', UsersController.getAllUserNetLiq)
/** Agrega un usuario a la lista de liquidación de red */
router.post('/register/network/liquidations', UsersController.registerUserNetLiq)
/** ELimina un usuario de la lista de liquidación */
router.post('/delete/network/liquidations', UsersController.deleteUserNetLiq)
/** Edita un usuario de la lista de liquidación */
router.post('/edit/network/liquidations', UsersController.editUserNetLiq)
/** Admin */
/** Perfil de empresario */
router.post('/profile', UsersController.profileUser)
/** Perfil de empresario, con codigo */
router.post('/profile/with-code', UsersController.profileUserWithCode)
/** Perfil de empresario */
router.post('/search/one/id', UsersController.getID)
/** Inicio de Sesion web Admin */
router.post('/admin/web/login', UsersController.loginWebAdmin)
/** Inicio de Sesion web Store */
router.post('/shop/web/login', UsersController.loginWebShop)
/** Registro de Cliente */
router.post('/shop/user/web/register', UsersController.registerWebUser)
/** Registro de Empresario */
router.post('/shop/franchise/web/register', UsersController.registerWebFranchise)
/** Registro del proveedor */
router.post('/shop/partner/web/register', UsersController.registerShopPartner)
// Permite al winber ser aliado comercial
router.post('/admin/winber/to-vendor', UsersController.winberToVendor)
// Verifica el estado de peticion de winber a aliado comercial
router.post('/admin/winber/to-vendor/status', UsersController.getStateWinberToVendor)
/** Editar el proveedor */
router.post('/shop/partner/web/edit', UsersController.editShopPartner)
/** Registro documentos del proveedor */
router.post('/shop/partner/web/register/documents', multer({ storage }).array('files'), UsersController.registerShopPartnerDocuments)
/** Actualización de la imagen de banner del aliado */
router.post('/shop/partner/web/register/img-banner', multer({ storage }).array('files'), UsersController.updateVendorShopImgBanner)
/** Registro de codigo de usuario */
router.post('/profile/code/register', UsersController.regCodProUser)
/** Registro de identificación del usuario */
router.post('/register/identities', UsersController.registerIdentities)
/** Activar Red del usuario */
router.post('/red/active', UsersController.redActiveUser)
/** Cambiar ubicación de red */
router.post('/red/change/location', UsersController.redChangeLocation)
/** registro de categorias de producto en la tienda */
router.post('/store/products/categories/register', UsersController.registerShopCategoryProducts)
/** eliminar de categorias de producto en la tienda */
router.post('/store/products/categories/delete', UsersController.deleteStoreCategoryProducts)
/** eliminar de categorias de producto en la tienda */
router.post('/store/products/categories/delete/all', UsersController.deleteAllStoreCategoryProducts)
/** registro de producto en la tienda */
router.post('/store/products/register', UsersController.registerStoreProducts)
/** eliminar de producto en la tienda */
router.post('/store/products/delete', UsersController.deleteStoreProducts)
/** eliminar todos los productos en la tienda */
router.post('/store/products/delete/all', UsersController.deleteAllStoreProducts)
/** registro de categorias de servicios en la tienda */
router.post('/store/services/categories/register', UsersController.registerShopCategoryServices)
/** eliminar de categorias de servicios en la tienda */
router.post('/store/services/categories/delete', UsersController.deleteStoreCategoryServices)
/** eliminar de categorias de servicios en la tienda */
router.post('/store/services/categories/delete/all', UsersController.deleteAllStoreCategoryServices)
/** registro de servicios en la tienda */
router.post('/store/services/register', UsersController.registerStoreServices)
/** eliminar de servicios en la tienda */
router.post('/store/services/delete', UsersController.deleteStoreServices)
/** eliminar todos los servicios en la tienda */
router.post('/store/services/delete/all', UsersController.deleteAllStoreServices)
/** busca las categorias de productos del usuario */
router.post('/store/products/categories/search/all', UsersController.getAllStoreCategoryProducts)
/** busca las categorias de servicio del usuario */
router.post('/store/services/categories/search/all', UsersController.getAllStoreCategoryServices)
/** busca las categorias de productos del usuario */
router.post('/store/products/categories/search/one', UsersController.getOneStoreCategoryProducts)
/** busca las categorias de servicio del usuario */
router.post('/store/services/categories/search/one', UsersController.getOneStoreCategoryServices)
/** busca los productos del usuario */
router.post('/store/products/search/all', UsersController.getAllStoreProducts)
/** busca los servicio del usuario */
router.post('/store/services/search/all', UsersController.getAllStoreService)
/** Organiza los productos y servicios en la tienda del usuario */
router.post('/store/items/organized', UsersController.organizeStoreItems)
/** Organiza las categorias en la tienda del usuario */
router.post('/store/category/organized', UsersController.organizeStoreCategories)

/** DINERO DEL USUARIO */
/** Realiza el retiro de dinero */
router.post('/money/withdrawals', UserMoneysController.withdrawals)
/** busca la información de dinero del usuario */
router.post('/money/search/one', UserMoneysController.getOne)
/** Acepta o rechaza una solicitud de retiro */
router.post('/money/withdrawals/change/state', MoneyReportsController.withdrawalChangeState)
/** Busca la información de un Usuario relacionado a una entidad Bancaria */
router.post('/money/report/search/all', MoneyReportsController.getAll)
router.post('/money/retire/search/all', MoneyReportsController.getWithdrawalRequests)
/** FIN DEL DINERO DEL USUARIO */

/** BANCO DE USUARIOS */
/** Busca la información de todos los Usuarios relacionado a las entidades Bancarias */
router.post('/bank/search/all', UserBankEntitiesController.getAll)
/** Registra un Usuario a una entidad Bancaria */
router.post('/bank/register', multer({ storage }).single('file'), UserBankEntitiesController.register)
/** desactiva una entidad Bancaria del usuario */
router.post('/bank/delete', UserBankEntitiesController.delete)
/** FIN BANCO DE USUARIOS */

/** PUBLICIDAD DEL USUARIO */
/** todas las publicidades */
router.post('/advertising/search/all', UserAdvertisingsController.getAll)
/** registro de publicidad */
router.post('/advertising/register', UserAdvertisingsController.register)
/** FIN PUBLICIDAD DEL USUARIO */

/** SPONSORS */
/** Busca todos los invitados del usuario */
router.post('/network/directs/search/all', UsersSponsorsController.getAllSponsorGuests)
router.post('/network/binary/search/all', UsersRedController.getAllUserRed)

// Contactos de usuario
router.use('/contacts', require('./UserContactsRouter'))

// Recuperación de cuenta
router.post('/recover-account', UserRecoverAccount.createRecover)
router.post('/recover-account/validate-token', UserRecoverAccount.validateToken)
router.post('/recover-account/change-pass', UserRecoverAccount.recoverAccount)

// Notificaciones
router.use('/notifications', require('./UserNotificationsRouter'))

// Manager
router.use('/manager', require('./UserManagersRouter'))

// Winber
router.post('/active/stock', UsersController.activeWinberStock)
router.post('/points', UsersController.getUserPoints)
router.post('/search/bonus', UsersController.getUserBonus)

// Access, auth
// router.post('/permissions', UsersController.getPermissions)

module.exports = router