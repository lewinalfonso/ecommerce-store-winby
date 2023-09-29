import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import { DetailServices } from '../../components/items/DetailServices'
import { getOneServices, getAllSimServices, getSchedulle, getViewsServices } from '../../redux/actions/products'
import { MyContext } from '../../components/layout'
import { getOneLegalVendors } from '../../redux/actions/vendors'
import axios from 'axios'
import { url_base } from '../../redux/types'

class Details extends Component {
    static contextType = MyContext
    constructor(props) {
        super(props);
        this.state = { activeThumbs: 0, loading: false, shopping: false, s_total: 1, modalActive: false, modalProfile: 0, activePay: false }
        this.mySwiper = null
        this.myRefs = {
            thumbsRefs: React.createRef(),
            scrollRef: React.createRef()
        }
        this.isMount = true
    }

    async componentDidMount() {
        /** variables necesarias */
        const { id, code } = this.props.match.params
        if (code) {
            localStorage.setItem('code', JSON.stringify(code))
            this.context.updateCode(code)
        }
        this.searchService(id)
        this.searchSimilar(id, this.props.location.state)
        window.scrollTo(0, 0)
        const shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        const res = shoppingCard?.invoiceservices?.find(x => x.s_id === id)
        if (res) {
            const schedulle = res.servicecalendars
            !!schedulle && this.setState({ selectedSchedulle: schedulle })
        }

        await this.props.getViewsServices({ s_id: id })
    }

    componentDidUpdate(prevProps, prevState) {
        const { id } = this.props.match.params
        if ((this.state.activeThumbs >= 5 && prevState.activeThumbs !== this.state.activeThumbs) || prevState.activeThumbs > this.state.activeThumbs) {
            const pos = this.myRefs.thumbsRefs.current.offsetTop
            this.myRefs.scrollRef.current.view.scroll({
                top: pos - 40,
                behavior: 'smooth',
            })
        }
        if (this.state.s_id) {
            if (id !== this.state.s_id) {
                this.setState({ s_id: id, loading: true, similar: [] })
                this.searchService(id)
                this.searchSimilar(id, this.props.location.state)
            }
        }
    }

    componentWillUnmount() {
        this.isMount = true
    }

    /**
     * busca la información del servicio.
     * @param {number} id el id del servicio
     * @returns {null} no hay retorno
    */
    searchService = async id => {
        const shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        let shopping = true, result = true

        const resP = this.props.services
        if (resP.one?.s_id === id) {
            result = false
            this.setState({ ...resP?.one })
        }
        if (!!resP?.data?.length && result) {
            const resFind = resP.data.find(x => x.s_id === id)
            if (resFind) {
                result = false
                this.setState({ ...resFind })
            }
        }

        /** verifica si el servicio se encuentra en el carrito */
        const resFind = shoppingCard?.invoiceservices?.find(x => x.s_id === id)
        !!resFind && (shopping = false)

        /** busca la información completa del servicio */
        result && this.setState({ loading: true })
        await this.props.getOneServices({ s_id: id })
        /** actualiza los estados y el swiper */
        if (this.isMount && this.props.services?.successOne) {
            const sAttr = this.props.services?.one?.serviceattributes
            let attrMulti = [], attr = []
            sAttr.forEach(x => {
                if (x.sa_value.split(/\s*;\s*/).length > 1) attrMulti = [...attrMulti, x]
                else attr = [...attr, x]
            })
            attrMulti = attrMulti.map(x => ({ sa_id: x.sa_id, sa_name: x.sa_name, values: x.sa_value.split(/\s*;\s*/) }))
            this.setState({ ...this.props.services?.one, shopping, attrMulti, attr })
        }

        if (this.isMount && this.props.services?.successOne) this.setState({ ...this.props.services?.one, shopping })
        this.setState({ loading: false })
        this.mySwiper = document.querySelector('.swiper-container')?.swiper
    }

    /**
     * Busca los servicios similares.
     * @param {number} id el id del servicio
     * @param {object} service información del servicio pasado por parametros
     * @returns {null} no hay retorno
    */
    searchSimilar = async (id, service) => {
        let where = {}
        if (service?.item?.service?.scs_id) where = { scs_id: service?.item?.service?.scs_id }

        where = { ...where, s_id: id }
        /** busca los productos de similitud */
        await this.props.getAllSimServices(where)
        if (this.props.services?.similar?.length) this.setState({ similar: this.props.services.similar })
    }

    /**
     * Cambio de posición del slider con el thumb.
     * @param {object} e evento
     * @param {number} index indice del slider
     * @returns {null} no hay retorno
    */
    onClick = (e, index) => {
        this.mySwiper.slideTo(index);
        this.setState({ activeThumbs: this.mySwiper.realIndex })
    }

    /**
     * cambia la posición del select.
     * @param {object} e evento
     * @returns {state} el estado
    */
    handleChangeSlide = e => this.setState({ activeThumbs: e.realIndex })
    onChangeSelect = () => {

    }

    handleModal = async e => {
        !!e && e.preventDefault()
        if (this.state.v_id) {
            await this.props.getOneLegalVendors({ v_id: this.state.v_id })
            await this.props.getSchedulle({ s_id: this.state.s_id })

            const answer = this.props.vendorsLegal
            if (answer.success && this.props.schedulleServices?.success) {
                this.setState({ vendorsLegalInfo: answer.data, modalProfile: !this.state.modalProfile, schedulle: this.props.schedulleServices?.data })
            }
        }
    }

    getInfoSchedule = async () => {
        await this.props.getSchedulle({ s_id: this.state.s_id })
        const res = this.props.schedulleServices
        if (res?.success) return res?.data || []
    }

    /**
     * Agrega al carrito el servicio o lo elimina del carrito.
     * @param {object} e evento.
     * @param {object} data Datos devueltos por la agenda.
     * @returns {null} no se devuelve ningún valor.
    */
    handleClickSchedulle = (e, data) => {
        this.setState({ schedulleData: data, modalProfile: false }, () => !!this.state.toShop && this.handleShop(this.state.typeShop))
    }
    /**
     * Agrega al carrito el servicio o lo elimina del carrito.
     * @param {number} type valor de tipo 0 o 1.
     * @returns {null} no se devuelve ningún valor.
    */
    handleShop = async type => {
        /** variables necesarias */
        const { s_id, v_id, s_description, s_franchise, s_groPer, s_name, s_price, s_total, servicelocals, servicephotos, shopping, s_taxGat } = this.state, shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceservices = shoppingCard.invoiceservices, invoicevendors = shoppingCard.invoicevendors
        const schedulle = await this.getInfoSchedule()

        if (shopping) {
            if (schedulle.length && !this.state.schedulleData?.length) {
                toastr.warning('Antes selecciona la agenda')
                this.setState({ typeShop: type, toShop: true })
                return this.handleModal()
            }

            axios.post(`${url_base}cart/add/newitem`, { s_id, servicecalendars: this.state.schedulleData }, { withCredentials: true })
                .then(response => {
                    const res = response.data
                    if (res.success) {
                        const resFindIS = invoiceservices?.find(x => x.s_id === s_id),
                            resFindIV = invoicevendors.find(x => servicelocals.find(y => y.vendorlocal.v_id === x.v_id))
                        /** verifica si el services no existe ya registrado */
                        if (!resFindIS) {
                            const servicecalendars = [...this.state.schedulleData]
                            invoiceservices = [...invoiceservices, { s_id, v_id, is_name: s_name, is_description: s_description, is_price: s_price, is_total: s_total, is_groPer: s_groPer, is_franchise: s_franchise, servicephotos: [servicephotos[0]], servicecalendars, is_taxGat: s_taxGat }]

                            /** verifica si el vendewdor no existe registrado */
                            if (!resFindIV && !!servicelocals[0]) invoicevendors = [...invoicevendors, { v_id, c_id: servicelocals[0]?.vendorlocal?.c_id, d_id: servicelocals[0]?.vendorlocal?.d_id, m_id: servicelocals[0]?.vendorlocal?.m_id, iv_location: servicelocals[0]?.vendorlocal?.vl_address, iv_lat: servicelocals[0]?.vendorlocal?.vl_lat, iv_lon: servicelocals[0]?.vendorlocal?.vl_lon, iv_domFre: servicelocals[0]?.vendorlocal?.vl_domFre, iv_cosKM: servicelocals[0]?.vendorlocal?.vl_cosKM, iv_domLoc: servicelocals[0]?.vendorlocal?.vl_domLoc, iv_domNat: servicelocals[0]?.vendorlocal?.vl_domNat, typedelivery: { ...servicelocals[0]?.vendorlocal?.typedeliverycost } }]

                            /** actualiza el local storage */
                            localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCard, i_sub: shoppingCard.i_sub + ((s_price + s_taxGat) * s_total), invoiceservices, invoicevendors }))

                            this.setState({ shopping: false, modalVisible: false })
                            this.context.countShoppingCart(1)
                            if (type) this.props.history.push('/carrito')
                        }
                    } else toastr.warning(res.message)
                })
                .catch(() => toastr.error('Se ha presentado un error.'))

        } else if (!type) {

            axios.post(`${url_base}cart/delete/item`, { s_id }, { withCredentials: true })
                .then(response => {
                    const res = response.data
                    if (res.success) {

                        /** elimina le services */
                        invoiceservices = invoiceservices.filter(x => x.s_id !== s_id)
                        let vendor = true

                        /** verifica si existe otro services con el mismo vendedor */
                        invoiceservices.forEach(x => {
                            if (x.v_id === v_id) vendor = false
                        })

                        /** elimina al vendedor  */
                        if (vendor) invoicevendors = invoicevendors.filter(x => x.v_id !== v_id)

                        /** actualiza el local storage */
                        localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCard, i_sub: shoppingCard.i_sub - ((s_price + s_taxGat) * (s_total || 1)), invoiceservices, invoicevendors }))
                        this.setState({ shopping: true })
                        this.context.countShoppingCart(0)
                    } else toastr.warning(res.message)
                })
                .catch(() => toastr.error('Se ha presentado un error.'))
        }

        if (!shopping && type) this.props.history.push('/carrito')
    }

    render() {
        return (
            <DetailServices
                state={this.state}
                refs={this.myRefs}
                onClick={this.onClick}
                handleChangeSlide={this.handleChangeSlide}
                handleShop={this.handleShop}
                handlePayoptions={() => { this.setState({ activePay: !this.state.activePay }) }}
                handleModal={this.handleModal}
                handleClickSchedulle={this.handleClickSchedulle}
                onChangeSelect={this.onChangeSelect}
            />
        )
    }
}

export default connect(({ services, vendorsLegal, schedulleServices }) => ({ services, vendorsLegal, schedulleServices }), { getOneServices, getAllSimServices, getOneLegalVendors, getSchedulle, getViewsServices })(Details)