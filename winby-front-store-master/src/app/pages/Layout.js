import React, { Component } from 'react'
import LayoutV from '../components/layout'
import toastr from 'toastr'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfileUser, postLocationDelivery } from '../redux/actions/user'
import { getNotificationsChangeState, getNotificationsSearchAll } from '../redux/actions/notifications'
import { getAllCatPro, getAllCatSer } from '../../app/redux/actions/categories'
import axios from 'axios'
import { EsriProvider, AlgoliaProvider } from 'leaflet-geosearch'
import { getOneUserMoney } from '../redux/actions/wallet'
import { getRegIdentities } from '../redux/actions/user'
import { getAllCountries, getAllDepartments, getAllMunicipality } from '../redux/actions/utilities'
import { getRegInvoices, getConEpaInvoices } from '../redux/actions/invoices'
import { getDataLS, validationFormTwo, validationPhoneTwo, validationsSelectTwo, validationsTwo } from '../utils'
import { url_base } from '../redux/types'

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMenu: null,
            menuActive: 0,
            buttonActive: 0,
            login: false,
            username: '',
            countShoppingCart: 0,
            countNotifications: 0,
            visible: false,
            options: [],
            store: false,
            search: '',
            dataProfile: {},
            visibleModal: 0,
            show: false,
            subMenu: false,
            location: false,
            categories: [],
            products: [],
            locationMap: { lat: 11.0033528, lon: -74.8095802 }, searchOptions: [], error: {},
            code: getDataLS('code', true) || 'Winby',
            id: false,
            values: {}
        }
    }

    isMount = true

    async componentDidMount() {
        this.isMount = true

        this.searchCategories()
        const u_id = localStorage.getItem('u_id')
        let infProfile = localStorage.getItem('infProfile')

        this.notifications(u_id)

        if (infProfile === 'undefined') {
            localStorage.removeItem('infProfile')
            infProfile = '{}'
        }

        !!infProfile && this.setState({ dataProfile: JSON.parse(infProfile).userprofile })

        navigator.geolocation.getCurrentPosition(position => {
            if (position.coords) {
                this.setState({ positionMap: { lat: position.coords.latitude, lon: position.coords.longitude } })
            }
        })

        /** Verificando si ya hay datos en el store de redux */
        if (!this.props.countries.success) {
            this.setState({ loading: true })
            /** peticiones */
            await this.props.getAllCountries(1)
        }

        const path = this.props.location.pathname
        let shoppingCard = localStorage.getItem('shoppingCard')
        if (path.indexOf('store/') > -1) this.setState({ path: path.substr(7, path.length) })
        if (!shoppingCard) localStorage.setItem('shoppingCard', JSON.stringify({ i_sub: 0, i_delivery: 0, i_vendor: JSON.parse(localStorage.getItem('code')) || 'Winby', invoiceproducts: [], invoiceservices: [], invoicevendors: [] }))
        else localStorage.setItem('shoppingCard', JSON.stringify({ ...JSON.parse(shoppingCard), i_vendor: JSON.parse(localStorage.getItem('code')) || 'Winby' }))

        if (u_id) {
            await this.props.getProfileUser({ u_id })
            if (this.props.users.data) {
                this.setState({ login: true, username: this.props.users?.data?.u_phoNum })
                localStorage.setItem('infProfile', JSON.stringify(this.props.users.data))
            } else {
                localStorage.removeItem('u_id')
                localStorage.removeItem('infProfile')
            }
        }
        shoppingCard = localStorage.getItem('shoppingCard')
        if (shoppingCard) {
            const cart = JSON.parse(shoppingCard) || {}

            this.setState({ countShoppingCart: (cart?.invoiceproducts?.length + cart?.invoiceservices?.length) || 0 })
        }

        if (shoppingCard) {
            const cart = JSON.parse(shoppingCard) || {}

            this.setState({ countShoppingCart: (cart?.invoiceproducts?.length + cart?.invoiceservices?.length) || 0 })
        }
        /** Verificando si ya hay datos en el store de redux */
        if (!this.props.countries.success) {
            this.setState({ loading: true })
            /** peticiones */
            await this.props.getAllCountries(1)
        }
        this.isMount && this.setState({ loading: false })

    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) window.scrollTo(0, 0)
        if (this.state.show) document.getElementById('searchInput').focus()
    }

    handleMenu = e => {
        e.preventDefault()
        this.setState({ activeMenu: !this.state.activeMenu })
    }

    handleLogin = ({ member, u_id, infProfile, code }) => {
        localStorage.setItem('infProfile', JSON.stringify(infProfile))
        localStorage.setItem('u_id', u_id)
        localStorage.setItem('member', member)
        this.notifications(u_id)
        if (code) {
            const currentCode = JSON.parse(localStorage.getItem('code'))
            localStorage.setItem('code', code)
            let shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
            shoppingCard = { ...shoppingCard, i_vendor: JSON.parse(code) }
            localStorage.setItem('shoppingCard', JSON.stringify(shoppingCard))
            if (currentCode !== 'Winby' && currentCode !== JSON.parse(code)) localStorage.setItem('lastCode', JSON.stringify(currentCode))
        }

        this.setState({ login: true, username: infProfile?.u_phoNum, dataProfile: infProfile?.userprofile })
    }

    closeSession = () => {
        axios.post(`${url_base}cart/clean`, null, { withCredentials: true })
            .then(() => {
                localStorage.removeItem('infProfile')
                localStorage.removeItem('u_id')
                localStorage.removeItem('member')
                localStorage.setItem('shoppingCard', JSON.stringify({ i_sub: 0, i_delivery: 0, i_vendor: JSON.parse(localStorage.getItem('code')) || 'Winby', invoiceproducts: [], invoiceservices: [], invoicevendors: [] }))
                toastr.success('Has cerrado sesión')
                this.setState({ login: false, username: '', totalNoti: 0, countShoppingCart: 0 })
                this.props.history.push('/')
            })
    }

    countShoppingCart = (data, reset = false) => {
        if (reset) return this.setState({ countShoppingCart: 0 })
        if (data === 1) this.setState({ countShoppingCart: parseInt(this.state.countShoppingCart) + 1 })
        else this.setState({ countShoppingCart: parseInt(this.state.countShoppingCart) - 1 })
    }

    handleSearch = (e, type) => {
        e.preventDefault()
        const { search } = this.state
        if (search.length > 0) {
            if (type) e.keyCode === 13 && this.props.history.push(`/busqueda/${search}`)
        } else e.keyCode === 13 && this.props.history.push('/')
    }

    onChangeIput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    notifications = async (u_id, type) => {
        if (!u_id) return
        let notificationsN = []
        !!notificationsN.length && this.isMount && this.setState({ loading: true })
        notificationsN = []

        /** peticion */
        await this.props.getNotificationsSearchAll({ u_id, max: 5, un_type: 1 })
        const notiBuys = this.props.notifications?.data || []
        await this.props.getNotificationsSearchAll({ u_id, max: 5, un_type: 2 })
        const notiMembers = this.props.notifications?.data || []
        await this.props.getNotificationsSearchAll({ u_id, max: 5, un_type: 3 })
        const notiOther = this.props.notifications?.data || []

        /** respuesta */
        if (type === 3) {
            notificationsN = notiOther
        } else if (type === 2) notificationsN = notiMembers
        else notificationsN = notiBuys

        // if (resN?.success && this.isMount) notificationsN = resN.data

        // let notiBuys = [], notiMembers = [], notiOther = []
        let totalNoti = 0
        // if (notificationsN.length) {
        //     notiBuys = notificationsN.filter(x => x.un_type === 1) // Compras
        //     notiMembers = notificationsN.filter(x => x.un_type === 2) // Licencias
        //     notiOther = notificationsN.filter(x => x.un_type === 3) // otras
        notiBuys.forEach(x => x.un_state === 2 ? totalNoti++ : undefined)
        notiMembers.forEach(x => x.un_state === 2 ? totalNoti++ : undefined)
        notiOther.forEach(x => x.un_state === 2 ? totalNoti++ : undefined)
        // }
        this.isMount && this.setState({ loading: false, notifications: notificationsN, totalNoti, notiBuys, notiMembers, notiOther })
        // this.isMount && this.setState({ loading: false, notiBuys, notiMembers, notiOther, totalNoti })

    }
    onChangeSelect = async (v, id) => {
        validationsSelectTwo(id)
        this.setState({ values: { ...this.state.values, [id]: v[id] } })
        if (id === 'c_id') {
            /** peticion */
            this.setState({ loading: true })
            await this.props.getAllDepartments({ id: v[id], state: 1 })
            this.setState({ loading: false })
            /** resultado */
            const res = this.props.departments
            if (res.success) this.setState({ departments: res.data, c_name: v.c_name, d_name: undefined, m_name: undefined, values: { ...this.state.values, [id]: v[id], d_id: undefined, m_id: undefined } })
        } else if (id === 'd_id') {
            /** peticion */
            this.setState({ loading: true })
            await this.props.getAllMunicipality({ id: v[id], state: 1 })
            this.setState({ loading: false })
            /** resultado */
            const res = this.props.municipality
            if (res.success) this.setState({ municipalities: res.data, d_name: v.d_name, m_name: undefined, values: { ...this.state.values, [id]: v[id], m_id: undefined } })
        } else if (id === 'm_id') this.setState({ m_name: v.m_name })
    }

    /** busca todo las categorias */
    searchCategories = async () => {

        await this.props.getAllCatSer({ cs_state: 1, min: this.state.start, max: this.state.increment, typeOrder: 1 })
        await this.props.getAllCatPro({ cp_state: 1, min: this.state.start, max: this.state.increment, typeOrder: 1 })

        const resCS = this.props.categoriesS, resCP = this.props.categoriesP

        if (this.isMount) {
            /** variables necesarias */
            const res = resCS?.data?.length > resCP?.data?.length ? resCS?.data : (resCP?.data || [])
            const { categories } = this.state
            let itemsAll = [...categories]

            res.forEach((x, i) => {
                if (!categories?.find(z => (z.cs_id || z.cp_id) === (x.cs_id || x.cp_id))) {
                    itemsAll = [...itemsAll, x]
                    if (x.cs_id) !!resCP?.data.length && !!resCP?.data[i] && (itemsAll = [...itemsAll, resCP?.data[i]])
                    else !!resCS?.data.length && !!resCS?.data[i] && (itemsAll = [...itemsAll, resCS?.data[i]])
                }
            })
            this.setState({ categories: [...itemsAll] })

        }
    }
    //Peticiones para ubicaciones globales
    onChangeSelect = async (v, id) => {
        validationsSelectTwo(id)
        this.setState({ values: { ...this.state.values, [id]: v[id] } })
        if (id === 'c_id') {
            /** peticion */
            this.setState({ loading: true })
            await this.props.getAllDepartments({ id: v[id], state: 1 })
            this.setState({ loading: false })
            /** resultado */
            const res = this.props.departments
            if (res.success) this.setState({ departments: res.data, c_name: v.c_name, d_name: undefined, m_name: undefined, values: { ...this.state.values, [id]: v[id], d_id: undefined, m_id: undefined } })
        } else if (id === 'd_id') {
            /** peticion */
            this.setState({ loading: true })
            await this.props.getAllMunicipality({ id: v[id], state: 1 })
            this.setState({ loading: false })
            /** resultado */
            const res = this.props.municipality
            if (res.success) this.setState({ municipalities: res.data, d_name: v.d_name, m_name: undefined, values: { ...this.state.values, [id]: v[id], m_id: undefined } })
        } else if (id === 'm_id') this.setState({ m_name: v.m_name })
    }
    /**
      * Busca la direccion en el mapa.
      * @returns {null} no hay retorno.
     */
    handleSearchInput = async () => {
        const { searchIcon, search } = this.state

        if (searchIcon) {
            const provider = new EsriProvider();
            const provider2 = new AlgoliaProvider();
            const results = await provider.search({ query: `${search}` })
            this.setState({ searchOptions: results })
            const results2 = await provider2.search({ query: `${search}` })
            this.setState({ searchOptions: [...results, ...results2] })
        } else this.setState({ search: undefined, searchIcon: false })
    }

    /**
      * cuando presiónan el mapa para una locación.
      * @param {boolean} onBlur indica si pertenece al onblur o el boton.
      * @param {number} index indica si pertenece al onblur o el boton.
      * @returns {null} no hay retorno.
     */
    handleMap = async () => {
        this.setState({ menuActive: 5 })
        const { values, m_name, d_name, c_name } = this.state, provider = new EsriProvider(), searchLocation = `${values.up_location ? `${values.up_location}, ` : ''}${m_name ? `${m_name}, ` : ''}${d_name ? `${d_name}, ` : ''}${c_name ? `${c_name}` : ''}`
        const result = await provider.search({ query: searchLocation })
        if (result.length) this.setState({ locationMap: { lat: result[0].y, lon: result[0].x }, values: { ...values, up_lat: result[0].y, up_lon: result[0].x } })
        this.setState({ searchLocation, searchIcon: true })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { error, values, calDelivery } = this.state, errorForm = validationFormTwo(e.target.elements, error)
        if (calDelivery) return toastr.warning('Calculando domicilio espere por favor.')
        let uLat = values.up_lat, uLon = values.up_lon

        if (!errorForm && !calDelivery) {
            const provider = new EsriProvider();
            const country = this.props.countries?.data?.find(x => x.c_id === values.c_id)
            const deparment = this.props.departments?.data?.find(x => x.d_id === values.d_id)
            const municipality = this.props.municipalities?.data?.find(x => x.m_id === values.m_id)
            const results = await provider.search({ query: `${values.up_location}, ${municipality ? municipality.m_name : ''} ${deparment ? deparment.d_name : ''} ${country ? country.c_name : ''}` })
            if (results?.length) {
                uLat = results[0].y
                uLon = results[0].x
            }

            if (values.invoicevendors.length) {
                /** comprueba el resultado */
                this.setState({ isMapInit: true, loading: true, delivery: false, values: { ...values, i_delivery: 0 }, calDelivery: true })
                let i_delivery = 0
                let invoicevendors = []

                for (let i = 0; i < values.invoicevendors.length; i++) {
                    const { iv_lat, iv_lon, iv_domFre, iv_cosKM, typedelivery, iv_domLoc, iv_domNat } = values.invoicevendors[i]
                    let iv_delivery = 0
                    // Valor calculado
                    if (typedelivery?.tdc_type === 1) {
                        let meters = 0
                        /** calcular la ruta en metros */
                        const result = await axios.post(`${url_base}info/map/calculating`, { uLat, uLon, ivLat: iv_lat, ivLon: iv_lon })
                        const res = result?.data
                        if (res?.data?.rows?.length) {
                            if (res?.data?.rows[0].elements?.length) meters = res?.data?.rows[0].elements[0].distance?.value || 0
                        }
                        iv_delivery = iv_domFre < meters ? (meters / 1000) * iv_cosKM : 0
                        invoicevendors = [...invoicevendors, { ...values.invoicevendors[i], iv_delivery }]
                        // Valor fijo
                    } else if (typedelivery?.tdc_type === 2) {
                        // Valor para envios locales
                        if (values.m_id === values.invoicevendors[i].m_id) iv_delivery = iv_domLoc || 0
                        else iv_delivery = iv_domNat || 0
                        invoicevendors = [...invoicevendors, { ...values.invoicevendors[i], iv_delivery }]
                    }
                    i_delivery += iv_delivery
                }
                return this.setState({ calDelivery: false, delivery: true, loading: false, values: { ...this.state.values, invoicevendors, i_delivery: Math.round(i_delivery) } })
            } else this.setState({ loading: false, delivery: true, calDelivery: false, i_delivery: 0 })
            return setTimeout(() => this.setState({ calDelivery: false, loading: false }), 10000)
        }
        return toastr.warning('Por favor revise los campos obligatorios.')
    }

    saveUserLocation = async () => {
        this.setState({ menuActive: 1 })
        const { values, m_name } = this.state
        await this.props.postLocationDelivery({ ...values, u_id: localStorage.getItem('u_id') })
        if (this.props.delivery?.success) {
            const ls = localStorage.getItem('infProfile')
            const lsData = ls ? JSON.parse(ls) : false

            if (lsData) {
                const infProfile = { ...lsData, userprofile: { ...lsData.userprofile, ...values } }
                localStorage.setItem('infProfile', JSON.stringify(infProfile))
                this.setState({ dataProfile: { ...this.state.dataProfile, ...values, m_name } })
            }
            toastr.success(this.props.delivery.message)
            this.setState({ menuActive: 0 })
        } else {
            toastr.warning(this.props.delivery.message)
        }
    }

    TooltipOptions = un_id => {
        let { options } = this.state
        if (!options.find(x => x === un_id)) this.setState({ options: [...this.state.options, un_id] })
        else {
            options = options.filter(x => x !== un_id)
            this.setState({ options })
        }
    }
    delNotifications = async un_id => {
        const u_id = localStorage.getItem('u_id')
        await this.props.getNotificationsChangeState({ un_id, un_state: 0 })
        this.props.notifications.success ? toastr.success(this.props.notifications.message) : toastr.warning(this.props.notifications.message)

        this.notifications(u_id)
    }
    handleNotifications = (e, type) => {
        const u_id = localStorage.getItem('u_id')
        this.notifications(u_id, type)
    }
    handleTooltip = () => {
        const { visible, notiBuys, notiMembers, notiOther } = this.state
        if (visible && localStorage.getItem('u_id')) {
            notiBuys.forEach(x => this.props.getNotificationsChangeState({ un_id: x.un_id, un_state: 1 }))
            notiMembers.forEach(x => this.props.getNotificationsChangeState({ un_id: x.un_id, un_state: 1 }))
            notiOther.forEach(x => this.props.getNotificationsChangeState({ un_id: x.un_id, un_state: 1 }))
        }
        this.setState({ visible: !this.state.visible, store: false, options: [], totalNoti: 0 })
    }

    /**
      * si mueven el market capturar el evento.
      * @param {object} e evento
      * @returns {null} no hay retorno.
     */
    handleDragMarket = e => {
        const value = e.target.getLatLng()
        if (value) this.setState({ values: { ...this.state.values, up_lat: value.lat, up_lon: value.lng }, locationMap: { lat: value.lat, lon: value.lng } })
    }
    render() {
        return (
            <LayoutV children={this.props.children} state={this.state} handleMenu={this.handleMenu} handleLogin={this.handleLogin} closeSession={this.closeSession}
                countShoppingCart={this.countShoppingCart} handleSearch={this.handleSearch} onChangeIput={this.onChangeIput} updateCode={code => { this.setState({ code }); localStorage.setItem('code', `"${code}"`) }}
                handleTooltip={this.handleTooltip} handleTooltipOptions={this.TooltipOptions}
                handleTooltipStore={() => this.setState({ store: !this.state.store, visible: false, options: [] })}
                handleDelete={this.delNotifications}
                handleShow={() => { this.setState({ show: !this.state.show }) }}
                handleSubCategory={this.handleSubCategory}
                /* MODALTYPE */
                handleMenuModal={type => this.setState({ menuActive: type === this.state.menuActive ? 0 : type })}
                handelDrag={type => this.setState({ buttonActive: type === this.state.buttonActive ? 0 : type })}

                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                onChangeSelect={this.onChangeSelect}
                onChangeCheck={e => this.setState({ [e.target.name]: e.target.checked })}
                onChangeRadio={e => this.setState({ [e.target.name]: e.target.value })}
                onChangeSearch={e => this.setState({ [e.target.name]: e.target.value, searchIcon: true })}
                handleOption={position => this.setState({ search: position.label, values: { ...this.state.values, up_lat: position.y, up_lon: position.x }, locationMap: { lat: position.y, lon: position.x }, searchOptions: [], searchIcon: false })}
                handleLeafletMap={e => this.setState({ values: { ...this.state.values, up_lat: e.latlng.lat, up_lon: e.latlng.lng }, searchOptions: [], searchIcon: false })}
                handleSearchInput={this.handleSearchInput}
                handleMap={this.handleMap}
                handleSubmit={this.handleSubmit}
                refL={ref => this.map = ref}
                map={this.map}
                handlePlus={this.handlePlus}
                handleBin={this.handleBin}
                handleShop={this.handleShop}
                handleDragMarket={this.handleDragMarket}
                saveUserLocation={this.saveUserLocation}
                handleNotifications={this.handleNotifications}
                updateDataProfile={newDataProfile => this.setState({ dataProfile: { ...this.state.dataProfile, ...newDataProfile } })}
                resetSearch={() => this.setState({ search: '' })}
            />
        )
    }
}

export default withRouter(connect(({ users, notifications, categoriesS, categoriesP, countries, departments, municipality, invoices, usermoney, delivery }) => ({ users, notifications, categoriesS, categoriesP, countries, departments, municipality, invoices, usermoney, delivery }), { getProfileUser, getNotificationsChangeState, getNotificationsSearchAll, getAllCatPro, getAllCatSer, getAllCountries, getRegIdentities, getAllDepartments, getAllMunicipality, getRegInvoices, getConEpaInvoices, getOneUserMoney, postLocationDelivery })(Layout))