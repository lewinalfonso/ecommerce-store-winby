import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import axios from 'axios'
import ShoppingCartV from '../components/shoppingCart'
import { EsriProvider, AlgoliaProvider } from 'leaflet-geosearch'
import { openModal } from '../common/Modals'
import { getOneUserMoney } from '../redux/actions/wallet'
import { getRegIdentities } from '../redux/actions/user'
import { getAllCountries, getAllDepartments, getAllMunicipality } from '../redux/actions/utilities'
import { getRegInvoices, getConEpaInvoices } from '../redux/actions/invoices'
import { validationFormTwo, validationPhoneTwo, validationsSelectTwo, validationsTwo } from '../utils'
import { url_base } from '../redux/types'
import { MyContext } from '../components/layout'

class ShoppingCart extends Component {
    static contextType = MyContext
    state = {
        locationMap: { lat: 11.0033528, lon: -74.8095802 }, searchOptions: [], error: {},
        menuActive: 0,
        values: {
            sType: 1
        },
        code: '',
        lastCode: '',
        member: 'false',
        errorCal: false,
        errorCalMsg: '',
        loading: false,
        delivery: false,
        calDelivery: false
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
                up_ideNum: data.userprofile?.up_ideNum,
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

        // await this.calDeliveryCost()
    }
    onChangeSelect = async (v, id) => {
        const { updateDataProfile } = this.context
        validationsSelectTwo(id)
        // this.setState({ values: { ...this.state.values, [id]: v[id] } })
        if (id === 'c_id') {
            /** peticion */
            this.setState({ ...this.state, loading: true, delivery: false, calDelivery: false, errorCal: false, errorCalMsg: '', values: { ...this.state.values, c_id: v.c_id, d_id: undefined, m_id: undefined, up_location: '' } })
            await this.props.getAllDepartments({ id: v[id], state: 1 })
            this.setState({ ...this.state, loading: false })
            /** resultado */
            const res = this.props.departments
            if (res.success) {
                await this.setState({ ...this.state, departments: res.data, c_name: v.c_name, d_name: undefined, m_name: undefined })
                updateDataProfile({ [id]: v[id], country: v, d_id: undefined, m_id: undefined, department: undefined, municipality: undefined, up_location: '' })
            }
        } else if (id === 'd_id') {
            /** peticion */
            this.setState({ ...this.state, loading: true, delivery: false, calDelivery: false, errorCal: false, errorCalMsg: '', values: { ...this.state.values, [id]: v[id], m_id: undefined, up_location: '' } })
            await this.props.getAllMunicipality({ id: v[id], state: 1 })
            this.setState({ ...this.state, loading: false })
            /** resultado */
            const res = this.props.municipality
            if (res.success) {
                this.setState({ ...this.state, municipalities: res.data, d_name: v.d_name, m_name: undefined })
                updateDataProfile({ [id]: v[id], department: v, m_id: undefined, municipality: undefined, up_location: '' })
            }
        } else if (id === 'm_id') {
            this.setState({ ...this.state, delivery: false, m_name: v.m_name, errorCal: false, errorCalMsg: '', values: { ...this.state.values, [id]: v[id], up_location: '' }, calDelivery: false })
            updateDataProfile({ m_id: v.m_id, municipality: v, up_location: '' })
        } else if (id === 'sType') {
            const i_vendor = v[id] === 1 ? this.state.code : this.state.lastCode
            let shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
            shoppingCard = { ...shoppingCard, i_vendor }
            localStorage.setItem('shoppingCard', JSON.stringify(shoppingCard))
            this.setState({ ...this.state, values: { ...this.state.values, sType: v[id], i_vendor }, delivery: false, calDelivery: false })
        }

        // await this.calDeliveryCost()
    }

    async componentDidUpdate() {
        const { c_id, d_id, m_id } = this.state.values
        const { delivery, loading, calDelivery, errorCal } = this.state
        if (c_id && d_id && m_id && !delivery && !calDelivery && !loading && !errorCal) {
            await this.calDeliveryCost()
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
            } catch (errorAlgolia) {
                this.setState({ errorMap: true })
            }
            this.setState({ searchOptions: [...results, ...results2] })
        } else this.setState({ search: undefined, searchIcon: false })
    }

    /**
     * cuando presiónan el mapa para una locación.
     * @param {boolean} onBlur indica si pertenece al onblur o el botón.
     * @returns {null} no hay retorno.
    */
    handleMap = async onBlur => {
        const { values, m_name, d_name, c_name } = this.state, provider = new EsriProvider(), search = `${values.up_location ? `${values.up_location}, ` : ''}${m_name ? `${m_name}, ` : ''}${d_name ? `${d_name}, ` : ''}${c_name ? `${c_name}` : ''}`

        const result = await provider.search({ query: search })
        if (result.length) this.setState({ locationMap: { lat: result[0].y, lon: result[0].x }, values: { ...values, up_lat: result[0].y, up_lon: result[0].x } })

        !onBlur && this.setState({ search, searchIcon: true }, openModal('maps'))
    }

    calDeliveryCost = async () => {
        const { values, calDelivery, error } = this.state
        const form = document.getElementById('dataInvoiceForm')
        if (!form) return
        if (!calDelivery && values.c_id && values.d_id && values.m_id) {
            const errorForm = validationFormTwo(form.elements, error)
            if (errorForm) return
            this.setState({ delivery: false, values: { ...values, i_delivery: 0 }, calDelivery: true })

            const response = await axios.post(`${url_base}cart/calculate/delivery`, { m_id: values.m_id }, { withCredentials: true })
            const res = response.data

            if (!res.success) return this.setState({ ...this.state, calDelivery: false, delivery: false, errorCal: true, errorCalMsg: res?.message || 'No fue posible obtener la información del domicilio, por favor intenta nuevamente.' })
            return this.setState({ calDelivery: false, delivery: true, errorCal: false, errorCalMsg: '', values: { ...this.state.values, i_delivery: Math.round(res.totalDelivery || 0) } })
        } else {
            return this.setState({ delivery: false, calDelivery: false })
        }
    }

    handleSubmit = async e => {
        !!e && e.preventDefault()
        const { error } = this.state
        const form = document.getElementById('dataInvoiceForm')
        const errorForm = validationFormTwo(form.elements, error)

        if (!errorForm) return await this.calDeliveryCost()
        return toastr.warning('Por favor revise los campos obligatorios.')
    }

    handlePlus = (type, mode, id, current) => {
        axios.post(`${url_base}cart/update/totalitem`, { ...(type ? { p_id: id, p_total: mode ? current + 1 : current - 1 } : { s_id: id, s_total: mode ? current + 1 : current - 1 }) }, { withCredentials: true })
            .then(response => {
                const res = response.data
                if (res.success) {
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
                } else toastr.warning(res.message)
            })
            .catch(() => toastr.error('Se ha presentado un error.'))
    }

    /**
     * boton de eliminar producto o servicio.
     * @param {number} type tipo de producto o servicio
     * @param {object} item información del item.
     * @returns {null} no hay retorno.
    */
    handleBin = (type, item) => {
        axios.post(`${url_base}cart/delete/item`, { p_id: item?.p_id, s_id: item.s_id }, { withCredentials: true })
            .then(response => {
                const res = response.data
                if (res.success) {
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
                } else toastr.warning(res.message)
            })
            .catch(() => toastr.error('Se ha presentado un error.'))
    }

    /**
     * Ejecuta la compra.
     * @returns {toastr} un mensaje de notificación.
    */
    handleShop = async () => {
        const { values, /* terCon, */ method, terConFra, franchiseTerm, error } = this.state
        const form = document.getElementById('dataInvoiceForm')
        if (!form) return
        const errorForm = validationFormTwo(form.elements, error)
        if (errorForm) return toastr.warning('Por favor complete los campos requeridos.')

        if (franchiseTerm) {
            if (!values.up_ideNum) return toastr.info('Es necesario brindar la información del contrato.')
            if (!terConFra) return toastr.info('Es necesario aceptar el contrato de licencia.')
        }

        // if (terCon) {
        if (!values.u_id) return this.props.history.push('/user/login')

        if (!method) return toastr.info('Es necesario seleccionar un metodo de pago.')

        if (method === '1' || (values.i_sub + values.i_delivery) <= 0) {
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
        // Crear la factura
        axios.post(`${url_base}cart/create/invoice`, { ...values, ...this.context.dataProfile }, { withCredentials: true })
            .then(async response => {
                const res = response.data
                if (res.success) {
                    localStorage.setItem('shoppingCard', JSON.stringify({ i_sub: 0, i_delivery: 0, i_vendor: JSON.parse(localStorage.getItem('code')) || 'Winby', invoiceproducts: [], invoiceservices: [], invoicevendors: [] }))
                    this.context.countShoppingCart(undefined, true)
                    if (method === '1' || (values.i_sub + values.i_delivery) <= 0) {
                        await this.props.getConEpaInvoices({ i_wallet: true, x_cod_respuesta: 1, x_extra1: res.data.i_id, x_amount: (res.data.i_sub + res.data.i_delivery), u_id: res.data.u_id })
                        const resConInvoices = this.props.invoices.payment
                        if (resConInvoices.success) toastr.success('Compra exitosa.')
                        else toastr.warning(resConInvoices.message)
                        this.setState({ loading: false })
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
                        script.setAttribute('data-epayco-test', 'false')
                        script.setAttribute('data-epayco-external', 'true')
                        script.setAttribute('data-epayco-extra1', res.data.i_id)
                        script.setAttribute('data-epayco-response', `https://winby.co/compra/detalles/${res.data.i_id}/`)
                        script.setAttribute('data-epayco-confirmation', `${url_base}invoices/epayco/confirm`)
                        script.setAttribute('data-epayco-button', 'https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn1.png')
                        div.appendChild(script);
                        return setTimeout(() => document.getElementsByClassName('epayco-button-render')[0].click(), 3000)
                    }
                } else toastr.warning(res.message || 'Se ha presentado un error.')
            })
            .catch(() => toastr.error('Algo ha salido mal.'))
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
            <ShoppingCartV
                state={this.state}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => {
                    const { updateDataProfile } = this.context
                    this.setState({ ...this.state, values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })
                    if (e.target.name === 'up_location') {
                        updateDataProfile({ up_location: e.target.value })
                    }
                }}
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
                calDeliveryCost={this.calDeliveryCost}
            />
        )
    }
}

export default connect(({ countries, departments, municipality, invoices, usermoney, users }) => ({ countries, departments, municipality, invoices, usermoney, users }), { getAllCountries, getRegIdentities, getAllDepartments, getAllMunicipality, getRegInvoices, getConEpaInvoices, getOneUserMoney })(ShoppingCart)