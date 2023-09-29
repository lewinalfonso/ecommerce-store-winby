import React, { Component } from 'react'
import { connect } from 'react-redux'
import DetailsV from '../../components/items/Details'
import { getOneProducts, getAllSimProducts, getViewsProducts } from '../../redux/actions/products'
import { MyContext } from '../../components/layout'
import { parseJson } from '../../utils'

class Details extends Component {
    static contextType = MyContext
    constructor(props) {
        super(props);
        this.state = { activeThumbs: 0, loading: false, shopping: false, p_total: 1, activePay: false, multi: 0 }
        this.mySwiper = null
        this.myRefs = {
            thumbsRefs: React.createRef(),
            scrollRef: React.createRef()
        }
        this.isMount = true
    }

    async componentDidMount() {
        document.body.scrollTop = 0
        /** variables necesarias */
        const { id, code } = this.props.match.params
        this.searchProduct(id)
        this.searchSimilar(id, this.props.location.state)
        if (code) {
            this.context.updateCode(code)
            localStorage.setItem('code', JSON.stringify(code))
        }

        await this.props.getViewsProducts({ p_id: id })
    }

    componentDidUpdate(prevProps, prevState) {
        const { id } = this.props.match.params
        if ((this.state.activeThumbs >= 5 && prevState.activeThumbs !== this.state.activeThumbs) || prevState.activeThumbs > this.state.activeThumbs) {
            let pos = this.myRefs.thumbsRefs.current.offsetTop
            this.myRefs.scrollRef.current.view.scroll({
                top: pos - 40,
                behavior: 'smooth',
            })
        }
        if (this.state.p_id) {
            if (id !== this.state.p_id) {
                this.setState({ p_id: id, loading: true, similar: [] })
                this.searchProduct(id)
                this.searchSimilar(id, this.props.location.state)
            }
        }

    }

    componentWillUnmount(){
        this.isMount = true
    }

    /**
     * busca la información del producto.
     * @param {number} id el id del producto
     * @returns {null} no hay retorno
    */
    searchProduct = async id => {
        const shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        let shopping = true, result = true

        const resP = this.props.products
        if (resP.one?.p_id === id) {
            result = false
            this.setState({ ...resP?.one })
        }
        if (!!resP?.data?.length && result) {
            const resFind = resP.data.find(x => x.p_id === id)
            if (resFind) {
                result = false
                this.setState({ ...resFind })
            }
        }

        /** verifica si el producto se encuentra en el carrito */
        const resFind = shoppingCard?.invoiceproducts?.find(x => x.p_id === id)
        !!resFind && (shopping = false)

        /** busca la información completa del producto */
        result && this.setState({ loading: true })
        await this.props.getOneProducts({ p_id: id })

        /** actualiza los estados y el swiper */
        if (this.isMount && this.props.products?.successOne) {
            const pAttr = this.props.products?.one?.productattributes
            let attrMulti = [], attr = []
            pAttr.forEach(x => {
                if (x?.attributesubcategoryproduct?.typeattribute?.ta_type === 3) attrMulti = [...attrMulti, x]
                else attr = [...attr, x]
            })
            attrMulti = attrMulti.map(x => ({ pa_id: x.pa_id, pa_name: x.pa_name, values: parseJson(x.pa_value, []) }))
            this.setState({ ...this.props.products?.one, shopping, attrMulti, attr })
        }
        this.setState({ loading: false })
        this.mySwiper = document.querySelector('.swiper-container')?.swiper
    }

    /**
     * Busca los productos similares.
     * @param {number} id el id del producto
     * @param {object} product información del producto pasado por parametros
     * @returns {null} no hay retorno
    */
    searchSimilar = async (id, product) => {
        let where = {}
        if (product?.item?.product?.scp_id) where = { scp_id: product?.item?.product?.scp_id }

        where = { ...where, p_id: id }
        /** busca los productos de similitu */
        await this.props.getAllSimProducts(where)
        if (this.props.products?.similar?.length) this.setState({ similar: this.props.products.similar })
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
    onChangeSelect = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    /**
     * Agrega al carrito el producto o lo elimina del carrito.
     * @param {number} type valor de tipo 0 o 1.
     * @returns {null} no se devuelve ningún valor.
    */
    handleShop = type => {
        /** variables necesarias */
        let shoppingCard = JSON.parse(localStorage.getItem('shoppingCard')), invoiceproducts = shoppingCard.invoiceproducts, invoicevendors = shoppingCard.invoicevendors
        const { p_id, v_id, p_available, p_description, p_franchise, p_groPer, p_name, p_price, p_quantity, p_total, productlocals, productphotos, shopping } = this.state
        if (shopping) {
            const resFindIP = invoiceproducts?.find(x => x.p_id === p_id),
                resFindIV = invoicevendors?.find(x => productlocals?.find(y => y.vendorlocal.v_id === x.v_id))
            /** verifica si el producto no existe ya registrado */
            if (!resFindIP) invoiceproducts = [...invoiceproducts, { p_id, v_id, ip_name: p_name, ip_description: p_description, ip_price: p_price, ip_quantity: p_quantity, ip_total: p_total, ip_groPer: p_groPer, ip_franchise: p_franchise, ip_available: p_available, productphotos: [productphotos[0]] }]
            /** verifica si el vendewdor no existe registrado */
            if (!resFindIV && !!productlocals[0] && !p_franchise) invoicevendors = [...invoicevendors, { v_id, c_id: productlocals[0]?.vendorlocal?.c_id, d_id: productlocals[0]?.vendorlocal?.d_id, m_id: productlocals[0]?.vendorlocal?.m_id, iv_location: productlocals[0]?.vendorlocal?.vl_address, iv_lat: productlocals[0]?.vendorlocal?.vl_lat, iv_lon: productlocals[0]?.vendorlocal?.vl_lon, iv_domFre: productlocals[0]?.vendorlocal?.vl_domFre, iv_cosKM: productlocals[0]?.vendorlocal?.vl_cosKM, iv_domLoc: productlocals[0]?.vendorlocal?.vl_domLoc, iv_domNat: productlocals[0]?.vendorlocal?.vl_domNat, typedelivery: { ...productlocals[0]?.vendorlocal?.typedeliverycost } }]

            /** actualiza el local storage */
            localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCard, i_sub: shoppingCard.i_sub + (p_price * p_total), invoiceproducts, invoicevendors }))
            this.context.countShoppingCart(1)
            this.setState({ shopping: false })
        } else if (!type) {
            /** elimina le producto */
            invoiceproducts = invoiceproducts.filter(x => x.p_id !== p_id)
            let vendor = true

            /** verifica si existe otro producto con el mismo vendedor */
            invoiceproducts.forEach(x => x.v_id === v_id && (vendor = false))

            /** elimina al vendedor  */
            if (vendor) invoicevendors = invoicevendors.filter(x => x.v_id !== v_id)

            /** actualiza el local storage */
            localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCard, i_sub: shoppingCard.i_sub - (p_price * (p_total || 1)), invoiceproducts, invoicevendors }))
            this.context.countShoppingCart(0)
            this.setState({ shopping: true })
        }

        if (type) this.props.history.push('/carrito')
    }

    render() {
        return (
            <DetailsV
                state={this.state}
                refs={this.myRefs}
                onClick={this.onClick}
                handleChangeSlide={this.handleChangeSlide}
                handleShop={this.handleShop}
                handleQuantity={e => this.setState({ [e.target.name]: parseInt(e.target.value) })}
                handlePayoptions={() => {this.setState({ activePay: !this.state.activePay })}}
                handleShow={() => { this.setState({ show: !this.state.show }) }}
                onChangeSelect={this.onChangeSelect}

            />
        )
    }
}

export default connect(({ products }) => ({ products }), { getOneProducts, getAllSimProducts, getViewsProducts })(Details)