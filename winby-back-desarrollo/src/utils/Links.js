/** Usuario */
const {
    // Usuario
    UserProfilesModel, UsersModel, UserManagersModel, UserMembersModel, UserMoneysModel, UserPointsModel, UserRedsModel, UserSponsorsModel, UserSponsorVendorsModel,
    // Info
    CountriesModel, DepartmentsModel, MunicipalitiesModel, TypeManagersModel, TypeDeliveryCostsModel, InfoAdvertisingUrlsModel, InfoAdvertisingsModel, UserAdvertisingsModel,
    // Productos
    ProductPhotosModel, ProductOfferRowsModel, ProductOffersModel, ProductsModel, ProductLocalsModel,
    // Services
    ServicesModel, ServiceLocalsModel, ServicePhotosModel,
    // PQR
    TypeHelpPQRModel, HelpPQRModel,
    // Invoices
    InvoicesModel, InvoiceVendorsModel, InvoiceVendorStatusModel, InvoiceClientsModel, InvoiceProductsModel, InvoiceServicesModel,
    // Vendors
    VendorsModel, VendorsLocalsModel,
    // Debts
    DebtsReceivableModel,
    // Transporters
    TransportRoutesModel, TransportersModel, RoutesModel, DeliveryReportsModel
} = require('../models')
const { linkBelongsTo, linkHasMany } = require('./index')

module.exports = () => {
    // Usuario
    linkBelongsTo(UserManagersModel, UsersModel, 'u_id', 'uId')
    linkBelongsTo(UserManagersModel, CountriesModel, 'c_id', 'cId')
    linkBelongsTo(UserManagersModel, DepartmentsModel, 'd_id', 'dId')
    linkBelongsTo(UserManagersModel, TypeManagersModel, 'tmId', 'tmId')
    linkBelongsTo(UserProfilesModel, UsersModel, 'u_id', 'u_id')
    linkBelongsTo(UsersModel, UserProfilesModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, UserMembersModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, UserMoneysModel, 'u_id', 'u_id')
    linkBelongsTo(UserProfilesModel, UserPointsModel, 'u_id', 'u_id')
    linkHasMany(UserProfilesModel, UserRedsModel, 'u_id', 'u_idRed')
    linkHasMany(UserProfilesModel, UserSponsorsModel, 'up_code', 'us_code')
    linkBelongsTo(UserSponsorVendorsModel, UserProfilesModel, 'up_code', 'usvCode')
    // Productos
    linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')
    linkHasMany(ProductOfferRowsModel, ProductOffersModel, 'porId', 'porId')
    linkHasMany(ProductsModel, ProductLocalsModel, 'p_id', 'p_id')
    linkBelongsTo(ProductOffersModel, ProductsModel, 'p_id', 'pId')
    linkBelongsTo(ProductLocalsModel, VendorsLocalsModel, 'vl_id', 'vl_id')
    // Services
    linkHasMany(ServicesModel, ServiceLocalsModel, 's_id', 's_id')
    linkBelongsTo(ServiceLocalsModel, VendorsLocalsModel, 'vl_id', 'vl_id')
    linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')
    // PQR
    linkHasMany(TypeHelpPQRModel, HelpPQRModel, 'thpId', 'thpId')
    // Invoices
    linkHasMany(InvoicesModel, InvoiceVendorsModel, 'i_id', 'i_id')
    linkBelongsTo(InvoicesModel, InvoiceClientsModel, 'i_id', 'i_id')
    linkHasMany(InvoiceVendorsModel, InvoiceVendorStatusModel, 'iv_id', 'iv_id')
    linkBelongsTo(InvoiceVendorsModel, InvoicesModel, 'i_id', 'i_id')
    linkBelongsTo(InvoiceVendorsModel, CountriesModel, 'c_id', 'c_id')
    linkBelongsTo(InvoiceVendorsModel, VendorsModel, 'v_id', 'v_id')
    linkBelongsTo(InvoiceVendorsModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(InvoiceVendorsModel, MunicipalitiesModel, 'm_id', 'm_id')
    linkHasMany(InvoiceVendorsModel, InvoiceProductsModel, 'iv_id', 'iv_id')
    linkHasMany(InvoiceVendorsModel, InvoiceServicesModel, 'iv_id', 'iv_id')
    linkBelongsTo(InvoiceVendorsModel, VendorsLocalsModel, 'vl_id', 'vl_id')
    linkBelongsTo(VendorsLocalsModel, CountriesModel, 'c_id', 'c_id')
    linkBelongsTo(VendorsLocalsModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(VendorsLocalsModel, MunicipalitiesModel, 'm_id', 'm_id')
    // Clients
    linkBelongsTo(InvoiceClientsModel, CountriesModel, 'c_id', 'c_id')
    linkBelongsTo(InvoiceClientsModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(InvoiceClientsModel, MunicipalitiesModel, 'm_id', 'm_id')
    // Debts
    linkBelongsTo(DebtsReceivableModel, VendorsModel, 'v_id', 'v_id')
    // Vendors
    linkBelongsTo(VendorsLocalsModel, TypeDeliveryCostsModel, 'tdc_id', 'tdc_idLoc', 'localDelivery')
    linkBelongsTo(VendorsLocalsModel, TypeDeliveryCostsModel, 'tdc_id', 'tdc_idNat', 'nationalDelivery')
    linkBelongsTo(VendorsModel, UserMoneysModel, 'u_id', 'u_id')
    linkBelongsTo(VendorsModel, VendorsLocalsModel, 'v_id', 'v_id')
    // Transporters
    linkBelongsTo(TransportRoutesModel, MunicipalitiesModel, 'm_id', 'trOriId', 'source')
    linkBelongsTo(TransportRoutesModel, MunicipalitiesModel, 'm_id', 'trDestId', 'destination')
    linkBelongsTo(TransportRoutesModel, TransportersModel, 'tId', 'tId')
    linkBelongsTo( RoutesModel, MunicipalitiesModel, 'm_id', 'rOriId', 'source')
    linkBelongsTo( RoutesModel, MunicipalitiesModel, 'm_id', 'rDestId', 'destination')
    linkBelongsTo( RoutesModel, TransportersModel, 'tId', 'tId')
    linkBelongsTo(DeliveryReportsModel, TransportersModel, 'tId', 'tId')
    linkBelongsTo(DeliveryReportsModel, InvoiceVendorsModel, 'iv_id', 'iv_id')
    // Info
    linkHasMany(InfoAdvertisingsModel, InfoAdvertisingUrlsModel, 'ia_id', 'ia_id')
    linkBelongsTo(UserAdvertisingsModel, InfoAdvertisingUrlsModel, 'iauId', 'iauId')
    // Locations
    linkBelongsTo(MunicipalitiesModel, DepartmentsModel, 'd_id', 'd_id')
    linkBelongsTo(DepartmentsModel, CountriesModel, 'c_id', 'c_id')
}