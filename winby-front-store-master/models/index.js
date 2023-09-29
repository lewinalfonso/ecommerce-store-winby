// Admin
const AdminMoneyReportsModel = require('./admin/AdminMoneyReportsModel')
const AdminMoneysModel = require('./admin/AdminMoneysModel')

// Categorias
const AttributeSubCategoryProductsModel = require('./categories/AttributeSubCategoryProductsModel')
const AttributeSubCategoryServicesModel = require('./categories/AttributeSubCategoryServicesModel')
const CategoryProductsModel = require('./categories/CategoryProductsModel')
const CategoryServicesModel = require('./categories/CategoryServicesModel')
const SubCategoryProductsModel = require('./categories/SubCategoryProductsModel')
const SubCategoryServicesModel = require('./categories/SubCategoryServicesModel')
const TypeAttributeSubCategoryProductsModel = require('./categories/TypeAttributeSubCategoryProductsModel')
const TypeAttributeSubCategoryServicesModel = require('./categories/TypeAttributeSubCategoryServicesModel')

// Info
const AccountTypesModel = require('./info/AccountTypesModel')
const CategoriesModel = require('./info/CategoriesModel')
const ColorsModel = require('./info/ColorsModel')
const ConsecutivesModel = require('./info/ConsecutivesModel')
const CountriesModel = require('./info/CountriesModel')
const DepartmentsModel = require('./info/DepartmentsModel')
const GendersModel = require('./info/GendersModel')
const GeneralBannersModel = require('./info/GeneralBannersModel')
const ImgHomeModel = require('./info/ImgHomeModel')
const InfoAdvertisingsModel = require('./info/InfoAdvertisingsModel')
const InfoSelesModel = require('./info/InfoSelesModel')
const MenuChargesModel = require('./info/MenuChargesModel')
const MenusModel = require('./info/MenusModel')
const MoneyNetworkDatesModel = require('./info/MoneyNetworkDatesModel')
const MoneyNetworkReportsModel = require('./info/MoneyNetworkReportsModel')
const MoneyNetworkUsersModel = require('./info/MoneyNetworkUsersModel')
const MoneyNetworksModel = require('./info/MoneyNetworksModel')
const MunicipalitiesModel = require('./info/MunicipalitiesModel')
const SubCategoriesModel = require('./info/SubCategoriesModel')
const SubMenuChargesModel = require('./info/SubMenuChargesModel')
const SubMenusModel = require('./info/SubMenusModel')
const TypeAddressModel = require('./info/TypeAddressModel')
const TypeAttributesModel = require('./info/TypeAttributesModel')
const TypeBanksModel = require('./info/TypeBanksModel')
const TypeCryptocurrenciesModel = require('./info/TypeCryptocurrenciesModel')
const TypeDeliveryCostsModel = require('./info/TypeDeliveryCostsModel')
const TypeIdentitysModel = require('./info/TypeIdentitysModel')
const TypeManagersModel = require('./info/TypeManagersModel')
const UserChargesModel = require('./info/UserChargesModel')

// facturas
const InvoiceClientsModel = require('./invoice/InvoiceClientsModel')
const InvoiceProductsModel = require('./invoice/InvoiceProductsModel')
const InvoiceServiceCalendarHoursModel = require('./invoice/InvoiceServiceCalendarHoursModel')
const InvoiceServiceCalendarsModel = require('./invoice/InvoiceServiceCalendarsModel')
const InvoiceServicesModel = require('./invoice/InvoiceServicesModel')
const InvoiceVendorsModel = require('./invoice/InvoiceVendorsModel')
const InvoicesModel = require('./invoice/InvoicesModel')

// productos
const ProductAttributesModel = require('./products/ProductAttributesModel')
const ProductLocalsModel = require('./products/ProductLocalsModel')
const ProductsModel = require('./products/ProductsModel')
const ProductPhotosModel = require('./products/ProductPhotosModel')
const ProductOfferRowsModel = require('./products/ProductOfferRowsModel')
const ProductOffersModel = require('./products/ProductOffersModel')

// servicios
const ServiceAttributesModel = require('./services/ServiceAttributesModel')
const ServiceCalendarHoursModel = require('./services/ServiceCalendarHoursModel')
const ServiceCalendarModel = require('./services/ServiceCalendarModel')
const ServiceLocalsModel = require('./services/ServiceLocalsModel')
const ServicePhotosModel = require('./services/ServicePhotosModel')
const ServicesModel = require('./services/ServicesModel')

// tienda
const StoreKitItemsModel = require('./sotore/StoreKitItemsModel')
const StoreKitsModel = require('./sotore/StoreKitsModel')

// Usuario
const UserManagersModel = require('./users/UserManagersModel')
const UsersModel = require('./users/UsersModel')
const UserProfilesModel = require('./users/UserProfilesModel')
const UserMembersModel = require('./users/UserMembersModel')
const UserMoneysModel = require('./users/UserMoneysModel')
const UserPointsModel = require('./users/UserPointsModel')
const UserRedsModel = require('./users/UserRedsModel')
const UserSponsorsModel = require('./users/UserSponsorsModel')
const MoneyReportsModel = require('./users/MoneyReportsModel')
const PointReportsModel = require('./users/PointReportsModel')
const UserAdvertisingsModel = require('./users/UserAdvertisingsModel')
const UserBankEntitiesModel = require('./users/UserBankEntitiesModel')
const UserContactsModel = require('./users/UserContactsModel')
const UserMenusModel = require('./users/UserMenusModel')
const UserNetworkLiquidations = require('./users/UserNetworkLiquidations')
const UserNotificationsModel = require('./users/UserNotificationsModel')
const UserSponsorVendorsModel = require('./users/UserSponsorVendorsModel')
const UserStoreCategoryProductsModel = require('./users/UserStoreCategoryProductsModel')
const UserStoreCategoryServicesModel = require('./users/UserStoreCategoryServicesModel')
const UserStoreProductsModel = require('./users/UserStoreProductsModel')
const UserStoreServicesModel = require('./users/UserStoreServicesModel')
const UserSubMenusModel = require('./users/UserSubMenusModel')

// Productos

module.exports = {
    // Admin
    AdminMoneyReportsModel,
    AdminMoneysModel,
    // Categorias
    AttributeSubCategoryProductsModel,
    AttributeSubCategoryServicesModel,
    CategoryProductsModel,
    CategoryServicesModel,
    SubCategoryProductsModel,
    SubCategoryServicesModel,
    TypeAttributeSubCategoryProductsModel,
    TypeAttributeSubCategoryServicesModel,
    // Info
    AccountTypesModel,
    CategoriesModel,
    ColorsModel,
    ConsecutivesModel,
    CountriesModel,
    DepartmentsModel,
    GendersModel,
    GeneralBannersModel,
    ImgHomeModel,
    InfoAdvertisingsModel,
    InfoSelesModel,
    MenuChargesModel,
    MenusModel,
    MoneyNetworkDatesModel,
    MoneyNetworkReportsModel,
    MoneyNetworkUsersModel,
    MoneyNetworksModel,
    MunicipalitiesModel,
    SubCategoriesModel,
    SubMenuChargesModel,
    SubMenusModel,
    TypeAddressModel,
    TypeAttributesModel,
    TypeBanksModel,
    TypeCryptocurrenciesModel,
    TypeDeliveryCostsModel,
    TypeIdentitysModel,
    TypeManagersModel,
    UserChargesModel,
    // Facturas
    InvoiceClientsModel,
    InvoiceProductsModel,
    InvoiceServiceCalendarHoursModel,
    InvoiceServiceCalendarsModel,
    InvoiceServicesModel,
    InvoiceVendorsModel,
    InvoicesModel,
    // Productos
    ProductsModel,
    ProductPhotosModel,
    ProductOfferRowsModel,
    ProductOffersModel,
    ProductLocalsModel,
    ProductAttributesModel,
    // servicio
    ServiceAttributesModel,
    ServiceCalendarHoursModel,
    ServiceCalendarModel,
    ServiceLocalsModel,
    ServicePhotosModel,
    ServicesModel,
    // tienda
    StoreKitItemsModel,
    StoreKitsModel,
    // Usuario
    UsersModel,
    UserManagersModel,
    UserProfilesModel,
    UserMembersModel,
    UserMoneysModel,
    UserPointsModel,
    UserRedsModel,
    UserSponsorsModel,
    MoneyReportsModel,
    PointReportsModel,
    UserAdvertisingsModel,
    UserBankEntitiesModel,
    UserContactsModel,
    UserMenusModel,
    UserNetworkLiquidations,
    UserNotificationsModel,
    UserSponsorVendorsModel,
    UserStoreCategoryProductsModel,
    UserStoreCategoryServicesModel,
    UserStoreProductsModel,
    UserStoreServicesModel,
    UserSubMenusModel
}