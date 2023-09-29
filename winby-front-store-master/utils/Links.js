/** Usuario */
const {
    // Admin
    AdminMoneyReportsModel, AdminMoneysModel,
    // Categorias
    AttributeSubCategoryProductsModel, AttributeSubCategoryServicesModel, CategoryProductsModel, CategoryServicesModel, SubCategoryProductsModel, SubCategoryServicesModel, TypeAttributeSubCategoryProductsModel, TypeAttributeSubCategoryServicesModel,
    // Info
    AccountTypesModel, CategoriesModel, ColorsModel, ConsecutivesModel, CountriesModel, DepartmentsModel, GendersModel, GeneralBannersModel, ImgHomeModel, InfoAdvertisingsModel, InfoSelesModel, MenuChargesModel, MenusModel, MoneyNetworkDatesModel, MoneyNetworkReportsModel, MoneyNetworkUsersModel, MoneyNetworksModel, MunicipalitiesModel, SubCategoriesModel, SubMenuChargesModel, SubMenusModel, TypeAddressModel, TypeAttributesModel, TypeBanksModel, TypeCryptocurrenciesModel, TypeDeliveryCostsModel, TypeIdentitysModel, TypeManagersModel, UserChargesModel,
    // Facturas
    InvoiceClientsModel, InvoiceProductsModel, InvoiceServiceCalendarHoursModel, InvoiceServiceCalendarsModel, InvoiceServicesModel, InvoiceVendorsModel, InvoicesModel,
    // Productos
    ProductsModel, ProductPhotosModel, ProductOfferRowsModel, ProductOffersModel, ProductLocalsModel, ProductAttributesModel,
    // servicio
    ServiceAttributesModel, ServiceCalendarHoursModel, ServiceCalendarModel, ServiceLocalsModel, ServicePhotosModel, ServicesModel,
    // tienda
    StoreKitItemsModel, StoreKitsModel,
    // Usuario
    UsersModel, UserManagersModel, UserProfilesModel, UserMembersModel, UserMoneysModel, UserPointsModel, UserRedsModel, UserSponsorsModel, MoneyReportsModel, PointReportsModel, UserAdvertisingsModel, UserBankEntitiesModel, UserContactsModel, UserMenusModel, UserNetworkLiquidations, UserNotificationsModel, UserSponsorVendorsModel, UserStoreCategoryProductsModel, UserStoreCategoryServicesModel, UserStoreProductsModel, UserStoreServicesModel, UserSubMenusModel
} = require('../models')
const { linkBelongsTo, linkHasMany } = require('./index')

module.exports = () => {
    // Productos
    linkHasMany(ProductsModel, ProductPhotosModel, 'p_id', 'p_id')
    // Servicios
    linkHasMany(ServicesModel, ServicePhotosModel, 's_id', 's_id')
}