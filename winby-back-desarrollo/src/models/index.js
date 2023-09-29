// Usuario
const UserManagersModel = require('../models/users/UserManagersModel')
const UsersModel = require('../models/users/UsersModel')
const UserProfilesModel = require('../models/users/UserProfilesModel')
const UserMembersModel = require('../models/users/UserMembersModel')
const UserMoneysModel = require('../models/users/UserMoneysModel')
const UserPointsModel = require('../models/users/UserPointsModel')
const UserRedsModel = require('../models/users/UserRedsModel')
const UserSponsorsModel = require('../models/users/UserSponsorsModel')
const UserSponsorVendorsModel = require('../models/users/UserSponsorVendorsModel')

// Info
const CountriesModel = require('./info/CountriesModel')
const DepartmentsModel = require('./info/DepartmentsModel')
const MunicipalitiesModel = require('./info/MunicipalitiesModel')
const TypeManagersModel = require('./info/TypeManagersModel')
const TypeDeliveryCostsModel = require('./info/TypeDeliveryCostsModel')
const InfoAdvertisingsModel = require('./info/InfoAdvertisingsModel')
const InfoAdvertisingUrlsModel = require('./info/InfoAdvertisingUrlsModel')
const UserAdvertisingsModel = require('./users/UserAdvertisingsModel')

// Productos
const ProductsModel = require('./products/ProductsModel')
const ProductPhotosModel = require('./products/ProductPhotosModel')
const ProductOfferRowsModel = require('./products/ProductOfferRowsModel')
const ProductOffersModel = require('./products/ProductOffersModel')
const ProductLocalsModel = require('./products/ProductLocalsModel')

// Services
const ServicesModel = require('./services/ServicesModel')
const ServiceLocalsModel = require('./services/ServiceLocalsModel')
const ServicePhotosModel = require('./services/ServicePhotosModel')

// PQR
const TypeHelpPQRModel = require('./info/TypeHelpPQRModel')
const HelpPQRModel = require('./info/HelpPQRModel')

// Invoices
const InvoicesModel = require('./invoice/InvoicesModel')
const InvoiceVendorsModel = require('./invoice/InvoiceVendorsModel')
const InvoiceVendorStatusModel = require('./invoice/InvoiceVendorStatusModel')
const InvoiceClientsModel = require('./invoice/InvoiceClientsModel')
const InvoiceProductsModel = require('./invoice/InvoiceProductsModel')
const InvoiceServicesModel = require('./invoice/InvoiceServicesModel')

// Debts
const DebtsReceivableModel = require('./debts/DebtsReceivableModel')

// Vendors
const VendorsModel = require('./vendors/VendorsModel')
const VendorsLocalsModel = require('./vendors/VendorsLocalsModel')

// Transporters
const TransportRoutesModel = require('./transporters/TransportRoutesModel')
const RoutesModel = require('./transporters/RoutesModel')
const TransportersModel = require('./transporters/TransportersModel')
const DeliveryReportsModel = require('./transporters/DeliveryReportsModel')

module.exports = {
    // Usuario
    UsersModel,
    UserManagersModel,
    UserProfilesModel,
    UserMembersModel,
    UserMoneysModel,
    UserPointsModel,
    UserRedsModel,
    UserSponsorsModel,
    UserSponsorVendorsModel,
    // Info
    CountriesModel,
    DepartmentsModel,
    MunicipalitiesModel,
    TypeManagersModel,
    TypeDeliveryCostsModel,
    InfoAdvertisingsModel,
    InfoAdvertisingUrlsModel,
    UserAdvertisingsModel,
    // Productos
    ProductsModel,
    ProductPhotosModel,
    ProductOfferRowsModel,
    ProductOffersModel,
    ProductLocalsModel,
    // Services
    ServicesModel,
    ServiceLocalsModel,
    ServicePhotosModel,
    // PQR
    TypeHelpPQRModel,
    HelpPQRModel,
    // Invoices
    InvoicesModel,
    InvoiceVendorsModel,
    InvoiceVendorStatusModel,
    InvoiceClientsModel,
    InvoiceProductsModel,
    InvoiceServicesModel,
    // Vendors
    VendorsModel,
    VendorsLocalsModel,
    // Debts
    DebtsReceivableModel,
    // Transporters
    TransportRoutesModel,
    RoutesModel,
    TransportersModel,
    DeliveryReportsModel
}