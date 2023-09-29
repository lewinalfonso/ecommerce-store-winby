import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import axios from 'axios'
import { DatesFactures } from '../../components/shoppingCart/datesfactures'  
import { EsriProvider, AlgoliaProvider } from 'leaflet-geosearch'
import { openModal } from '../../common/Modals'
import { getOneUserMoney } from '../../redux/actions/wallet'
import { getRegIdentities } from '../../redux/actions/user'
import { getAllCountries, getAllDepartments, getAllMunicipality } from '../../redux/actions/utilities'
import { getRegInvoices, getConEpaInvoices } from '../../redux/actions/invoices'
import { validationFormTwo, validationPhoneTwo, validationsSelectTwo, validationsTwo } from '../../utils'
import { url_base } from '../../redux/types'

class DatesFacturesV extends Component {
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
            id: false,
            values: {}
        }
    }
    async componentDidMount() {
        /** variables */
        this.isMount = true
        const u_id = localStorage.getItem('u_id'), infProfile = localStorage.getItem('infProfile')
        const code = JSON.parse(localStorage.getItem('code')), lastCode = JSON.parse(localStorage.getItem('lastCode'))
        const member = localStorage.getItem('member')

        if (!u_id) {
            toastr.info('Es necesario registrarse para poder hacer una compra.')
            return this.props.history.push('/user/registro', { cart: true })
        }
        navigator.geolocation.getCurrentPosition(position => {
            if (position.coords) {
                this.setState({ positionMap: { lat: position.coords.latitude, lon: position.coords.longitude } })
            }
        })

        if (infProfile === 'undefined') {
            localStorage.removeItem('infProfile')
        }
        !!infProfile && this.setState({ dataProfile: JSON.parse(infProfile).userprofile })
        
        /** Verificando si ya hay datos en el store de redux */
        if (!this.props.countries.success) {
            this.setState({ loading: true })
            /** peticiones */
            await this.props.getAllCountries(1)
        }

        const data = infProfile ? JSON.parse(infProfile) : {}
        /** busca los departamentos para el usuario */

        if (this.isMount && !!data.userprofile?.department && !this.props.departments.success) await this.props.getAllDepartments({ id: data.userprofile.country?.c_id, state: 1 })
        /** busca los municipios para el usuario */
        if (this.isMount && !!data.userprofile?.municipality && !this.props.municipality.success) await this.props.getAllMunicipality({ id: data.userprofile?.department?.d_id, state: 1 })
        let franchiseTerm = false
        const shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        shoppingCard?.invoiceproducts?.length && shoppingCard.invoiceproducts.forEach(x => x?.ip_franchise && (franchiseTerm = true))
        data.userprofile?.up_ideNum && (franchiseTerm = false)
        this.isMount && this.setState({
            franchiseTerm,
            values: {
                ...this.state.values,
                ...shoppingCard,
                profile: !!data.userprofile?.country?.c_id,
                u_id,
                up_name: data.userprofile?.up_name,
                up_last: data.userprofile?.up_last,
                u_email: data.u_email,
                u_phoNum: data.u_phoNum || '+57',
                c_id: data.userprofile?.country?.c_id,
                d_id: data.userprofile?.department?.d_id,
                m_id: data.userprofile?.municipality?.m_id,
                up_location: data.userprofile?.up_location,
                up_lat: data.userprofile?.up_lat,
                up_lon: data.userprofile?.up_lon,
            },
            c_name: data.userprofile?.country?.c_name,
            d_name: data.userprofile?.department?.d_name,
            m_name: data.userprofile?.municipality?.m_name,
            code,
            lastCode: lastCode || '',
            member
        })
        this.setState({ cardCount: shoppingCard })
        this.isMount && this.setState({ loading: false })
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
        else if (id === 'sType') {
            const i_vendor = v[id] === 1 ? this.state.code : this.state.lastCode
            let shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
            shoppingCard = { ...shoppingCard, i_vendor }
            localStorage.setItem('shoppingCard', JSON.stringify(shoppingCard))
        }
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
            let results2 = []
            this.setState({ searchOptions: results })
            try {
                results2 = await provider2.search({ query: `${search}` })
            } catch(errorAlgolia) {
                this.setState({ errorMap: true })
            }
            this.setState({ searchOptions: [...results, ...results2] })
        } else this.setState({ search: undefined, searchIcon: false })
    }

    /**
     * cuando presiónan el mapa para una locación.
     * @param {boolean} onBlur indica si pertenece al onblur o el boton.
     * @returns {null} no hay retorno.
    */
    handleMap = async onBlur => {
        const { values, m_name, d_name, c_name } = this.state, provider = new EsriProvider(), search = `${values.up_location ? `${values.up_location}, ` : ''}${m_name ? `${m_name}, ` : ''}${d_name ? `${d_name}, ` : ''}${c_name ? `${c_name}` : ''}`

        if (!values.up_lat) {
            const result = await provider.search({ query: search })
            if (result.length) this.setState({ locationMap: { lat: result[0].y, lon: result[0].x }, values: { ...values, up_lat: result[0].y, up_lon: result[0].x } })
        }

        !onBlur && this.setState({ search, searchIcon: true }, openModal('maps'))
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

    /**
     * suma o resta uno a la cantidad de compra.
     * @param {number} type tipo de producto o servicio
     * @param {number} mode sumar o restar.
     * @param {string} id información del vendedor.
     * @returns {null} no hay retorno.
    */
    handlePlus = (type, mode, id, number) => {
        if (type) {
            this.setState(state => {
                let i_sub = Math.round(state.values.i_sub)
                const invoiceproducts = state.values.invoiceproducts.map(x => {
                    if (id === x.p_id) {
                        if (mode) {
                            i_sub += Math.round(x.ip_price + x.ip_taxGat)
                            return { ...x, ip_total: (x.ip_total + 1) }
                        } else {
                            i_sub -= Math.round(x.ip_price + x.ip_taxGat)
                            return { ...x, ip_total: (x.ip_total - 1) }
                        }
                    }
                    return x
                })
                return { values: { ...state.values, invoiceproducts, i_sub }, delivery: false }
            }, () => localStorage.setItem('shoppingCard', JSON.stringify(this.state.values)))
        } else {
            this.setState(state => {
                let i_sub = Math.round(state.values.i_sub)
                const invoiceservices = state.values.invoiceservices.map(x => {
                    if (id === x.s_id) {
                        if (mode) {
                            i_sub += Math.round(x.is_price + x.is_taxGat)
                            return { ...x, is_total: (x.is_total + 1) }
                        } else {
                            i_sub -= Math.round(x.is_price + x.is_taxGat)
                            return { ...x, is_total: (x.is_total - 1) }
                        }
                    }
                    return x
                })
                return { values: { ...state.values, invoiceservices, i_sub }, delivery: false }
            }, () => localStorage.setItem('shoppingCard', JSON.stringify(this.state.values)))
        }
    }

    /**
     * boton de eliminar producto o servicio.
     * @param {number} type tipo de producto o servicio
     * @param {object} item información del item.
     * @returns {null} no hay retorno.
    */
    handleBin = (type, item) => {
        this.setState(state => {
            if (type) {
                const invoiceproducts = state.values.invoiceproducts.filter(x => x.p_id !== item.p_id), i_sub = Math.round(state.values.i_sub - ((item.ip_price + item.ip_taxGat) * item.ip_total))
                const resFind = invoiceproducts.find(x => x.v_id === item.v_id)
                let invoicevendors = state.values.invoicevendors
                const franchiseTerm = !!invoiceproducts.find(x => x?.ip_franchise)
                if (!resFind) invoicevendors = invoicevendors?.filter(x => x.v_id !== item.v_id)
                return { franchiseTerm, values: { ...state.values, invoiceproducts, invoicevendors, i_sub, i_delivery: 0 }, delivery: false }
            } else {
                const invoiceservices = state.values.invoiceservices.filter(x => x.s_id !== item.s_id), i_sub = Math.round(state.values.i_sub - ((item.is_price + item.is_taxGat) * item.is_total))
                const resFind = invoiceservices.find(x => x.v_id === item.v_id)
                let invoicevendors = state.values.invoicevendors
                if (!resFind) invoicevendors = invoicevendors?.filter(x => x.v_id !== item.v_id)
                return { values: { ...state.values, invoiceservices, invoicevendors, i_sub }, delivery: false }
            }

        }, () => {
            this.context.countShoppingCart(0)
            localStorage.setItem('shoppingCard', JSON.stringify(this.state.values))
        })
    }

    /**
     * Ejecuta la compra.
     * @returns {toastr} un mensaje de notificación.
    */
    handleShop = async () => {
        const { values, /* terCon, */ method, terConFra, franchiseTerm } = this.state

        if ((values.i_sub + values.i_delivery) <= 0) return toastr.info('Es necesario por lo minimo una producto o servicio para ejecutar la compra.')

        if (franchiseTerm) {
            if (!values.up_ideNum) return toastr.info('Es necesario brindar la información del contrato.')
            if (!terConFra) return toastr.info('Es necesario aceptar el contrato de licencia.')
        }

        // if (terCon) {
        if (!values.u_id) return this.props.history.push('/user/login')

        if (!method) return toastr.info('Es necesario seleccionar un metodo de pago.')

        if (method === '1') {
            await this.props.getOneUserMoney({ u_id: values.u_id, um_state: 1 })
            const resUM = this.props.usermoney
            if (resUM.success) {
                if (resUM.data?.um_money < (values.i_sub + values.i_delivery)) return toastr.info('Saldo insuficiente en la billetera.')
            } else return toastr.warning(resUM.message)
        }

        /** registra los documentos de identificación para el contrato */
        if (franchiseTerm) this.props.getRegIdentities({ u_id: values.u_id, up_ideNum: values.up_ideNum })
        /** peticion */
        this.setState({ loading: true })
        await this.props.getRegInvoices(values)

        /** respuesta */
        const res = this.props.invoices.register
        if (res.success) {
            localStorage.setItem('shoppingCard', JSON.stringify({ i_sub: 0, i_delivery: 0, i_vendor: JSON.parse(localStorage.getItem('code')) || 'Winby', invoiceproducts: [], invoiceservices: [], invoicevendors: [] }))
            if (method === '1') {
                await this.props.getConEpaInvoices({ i_wallet: true, x_cod_respuesta: 1, x_extra1: res.data.i_id, x_amount: (res.data.i_sub + res.data.i_delivery), u_id: res.data.u_id })
                const resConInvoices = this.props.invoices.payment
                if (resConInvoices.success) toastr.success('Compra exitosa.')
                else toastr.warning(resConInvoices.message)
                return this.props.history.push(`/compra/detalles/${res.data.i_id}`)
            } else {
                const script = document.createElement('script'), div = document.getElementById('script');
                div.style.display = 'none'

                script.src = 'https://checkout.epayco.co/checkout.js';
                script.classList.add('epayco-button')
                script.setAttribute('data-epayco-key', '094b340f7f7cf430017ca40285dfa711')
                script.setAttribute('data-epayco-amount', `${Math.round(res.data.i_delivery + res.data.i_sub + res.data.i_taxGat)}`)
                script.setAttribute('data-epayco-tax', '0')
                script.setAttribute('data-epayco-tax-base', `${Math.round(res.data.i_delivery + res.data.i_sub + res.data.i_taxGat)}`)
                script.setAttribute('data-epayco-name', 'Compra Winby')
                script.setAttribute('data-epayco-description', 'Compra Winby')
                script.setAttribute('data-epayco-currency', 'cop')
                script.setAttribute('data-epayco-country', 'CO')
                script.setAttribute('data-epayco-test', 'true')
                script.setAttribute('data-epayco-external', 'true')
                script.setAttribute('data-epayco-extra1', res.data.i_id)
                script.setAttribute('data-epayco-response', `https://winby.co/compra/detalles/${res.data.i_id}/`)
                script.setAttribute('data-epayco-confirmation', `${url_base}invoices/epayco/confirm`)
                script.setAttribute('data-epayco-button', 'https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn1.png')
                div.appendChild(script);
                return setTimeout(() => document.getElementsByClassName('epayco-button-render')[0].click(), 1000)
            }
        } else toastr.warning(res.message)
        return this.setState({ loading: false })
        /* }
        return toastr.warning('Es necesario aceptar los terminos y condiciones.') */
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
            <DatesFactures
                state={this.state}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                onChangeSelect={this.onChangeSelect}
                handleMenuModal={type => this.setState({ menuActive: type === this.state.menuActive ? 0 : type })}
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
            />
        )
    }
}

export default connect(({ countries, departments, municipality, invoices, usermoney, users }) => ({ countries, departments, municipality, invoices, usermoney, users }), { getAllCountries, getRegIdentities, getAllDepartments, getAllMunicipality, getRegInvoices, getConEpaInvoices, getOneUserMoney })(DatesFacturesV)