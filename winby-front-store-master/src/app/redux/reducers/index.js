import { combineReducers } from 'redux'
import { users, userRecoverAccount, delivery } from './user'
import { accounts, address, banks, categories, colors, countries, departments, identitys, municipality } from './utilities'
import { invoices } from './invoices'
import { products, services, schedulleServices, getViewsServices, getViewsProducts } from './products'
import { notifications } from './notifications'
import { partners } from './partner'
import { vendors, vendorsLegal } from './vendors'
import { searchCategories, searchProducts } from './search'
import { subCategoriesP, subCategoriesS, categoriesP, categoriesS } from './categories'
import { categoriesSerStore, categoriesProStore, servicesStore, productsStore, orderItemsStore, searchAlloffers, searchAllBanners, storeKits } from './store'
import { fornlanding, formContact, phoneContact } from './landing'
import { wallet, usermoney, moneyreport } from './wallet'
import { pqr } from './ayuda-pqr'

export default combineReducers({
    users, userRecoverAccount,
    delivery,
    invoices,
    accounts,
    address,
    banks,
    categories,
    colors,
    countries,
    departments,
    identitys,
    municipality,
    products, services, schedulleServices, getViewsServices, getViewsProducts,
    notifications,
    partners,
    vendors, vendorsLegal,
    subCategoriesP,
    subCategoriesS,
    categoriesP,
    categoriesS,
    categoriesSerStore,
    categoriesProStore,
    servicesStore,
    productsStore, orderItemsStore, searchAlloffers, searchAllBanners,
    searchCategories,
    searchProducts,
    fornlanding, formContact, phoneContact,
    wallet, usermoney, moneyreport, storeKits,
    pqr
})