import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllCategoriesProStore, getAllCategoriesSerStore, getAllProductsStore, getAllServicesStore } from '../redux/actions/store'
import { getAllVendors } from '../redux/actions/vendors'
import { getAllProducts, getAllServices } from '../redux/actions/products'
import HomeV from '../components/home'
import toastr from 'toastr'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pos: 1,
            activeMenu: false,
            modalActive: false,
            isVisibleModal: false,
            covers: []
        }
        this.isMount = true
    }

    async componentDidMount() {
        this.searchCategories()
        this.searchVendors()
        // await this.searchProducts()
        this.searchCover()
        this.setState({ up_code: 'Winby' })
    }

    componentWillUnmount() {
        this.isMount = false
    }

    searchCover = async () => {
        const code = localStorage.getItem('code')
        if (!code) localStorage.setItem('code', JSON.stringify('Winby'))
        /** variables necesarias */
        /** busca los productos ya almacenado en el reducer */
        if (this.props.products?.data?.length) {
            const resFilter = this.props.products.data.filter(x => (!!x.p_franchise || !!x.p_outstanding))
            if (resFilter.length) return this.setState({ covers: resFilter })
        }

        /** busca productos de LICENCIA y portada  */
        this.setState({ loading: true })
        await this.props.getAllProducts({ p_state: 1, min: 0, max: 20, typeOrder: 2, cover: 1, franchise: 1 })
        this.setState({ loading: false })
        /** valida si se consiguieron productos */
        if (this.props.products?.data?.length) {
            const resFilter = this.props.products.data.filter(x => (!!x.p_franchise || !!x.p_outstanding))
            if (resFilter.length) return this.setState({ covers: resFilter })
        }
    }

    /** busca todo las categorias */
    searchCategories = async () => {
        if (this.props.categoriesSerStore?.data?.length || this.props.categoriesProStore?.data?.length) {
            /** variables necesarias */
            const resCP = this.props.categoriesProStore?.data || [], resCS = this.props.categoriesSerStore?.data || [];
            this.setState({ categories: [...resCP, ...resCS] })
        }
        /** peticiones */
        await this.props.getAllCategoriesSerStore({ up_code: 'Winby', min: 0, max: 20 })
        await this.props.getAllCategoriesProStore({ up_code: 'Winby', min: 0, max: 20 })
        if (this.isMount) {
            /** variables necesarias */
            const resCS = this.props.categoriesSerStore?.data || [], resCP = this.props.categoriesProStore?.data
            this.setState({ categories: [...resCP, ...resCS] })
        }
    }

    /**
     * Organiza dos array
     * @version 0.0.1
     * @param {array} arrayP
     * @param {array} arrayS
     * @return {array} Todos los valores combinados en orden
     */
    organizeItems = (arrayP, arrayS) => {
        let services = []
        let products = []
        let rowProducts = []
        let rowServices = []
        let rows = []
        if (arrayP.success) products = arrayP.data
        if (arrayS.success) services = arrayS.data

        products.forEach(x => {
            const findRow = rowProducts.find(y => y === x.usp_row)
            if (findRow === undefined) rowProducts = [...rowProducts, x.usp_row]
        })

        /** busca las filas existentes */
        services.forEach(x => {
            const findRow = rowServices.find(y => y === x.uss_row)
            if (findRow === undefined) rowServices = [...rowServices, x.uss_row]
        })
        /** ordena las filas */
        rowProducts = rowProducts.sort()
        rowServices = rowServices.sort()

        for (let i = 0; i < rowProducts.length; i++) {
            const x = rowProducts[i];
            const res = products.filter(y => y.usp_row === x)
            if (rows[i]) rows[i] = [...rows[i], ...(res || [])]
            else rows = [...rows, res || []]
        }

        for (let i = 0; i < rowServices.length; i++) {
            const x = rowServices[i];
            const res = services.filter(y => y.uss_row === x)
            if (rows[i]) rows[i] = [...rows[i], ...(res || [])]
            else rows = [...rows, res || []]
        }

        // retorna el nuevo orden de los productos y servicios
        return rows.map(x => x.sort((a, b) => {
            // variables necesarias
            const valueA = a.usp_priority || a.uss_priority
            const valueB = b.usp_priority || b.uss_priority

            // comparacion
            if ((valueA) > valueB) return 1
            if (valueA < valueB) return -1
            return 0
        }))
    }

    /**
     * Combinar arrays y desordenarlos.
     * @param {array} arrayP array de productos con los valores de la respuesta.
     * @param {array} arrayS array de servicios con los valores de la respuesta.
     * @returns {array} Arrays combinados y desordenados.
    */
    combineArray = (arrayP, arrayS) => {
        let services = [], products = [];
        if (arrayP.success) products = arrayP.data
        if (arrayS.success) services = arrayS.data

        return [...products, ...services].sort(() => Math.random() - 0.5)
    }
    /** busca todo los vendedors */

    searchVendors = async () => {
        /** verifica si la peticion se hizo */
        if (this.props.vendors?.data?.length) this.setState({ vendors: this.props.vendors.data })
        if (!!this.props.vendors?.data?.length < 20) {
            /** peticion */
            await this.props.getAllVendors({ v_state: 1, min: 0, max: 20 })
            /** resultado */
            this.isMount && this.setState({ vendors: this.props.vendors?.data || [] })
        }
    }

    /** Busca todos los productos y servicios */

    searchProducts = async () => {
        /** verifica si la peticion se hizo */
        if (this.props.productsStore?.data?.length) this.setState({ products: this.props.productsStore.data })
        if (!!this.props.vendors?.productsStore?.length < 20) {
            /** peticion */
            await this.props.getAllProductsStore({ up_code: 'Winby', min: 0, max: 20, typeOrder: 1 })
            await this.props.getAllServicesStore({ up_code: 'Winby', min: 0, max: 20, typeOrder: 1 })
            /** resultado */

            this.isMount && this.setState({ products: this.organizeItems(this.props.productsStore, this.props.servicesStore) })

        }
    }
    closeSession = () => {
        localStorage.removeItem('infProfile')
        localStorage.removeItem('u_id')
        localStorage.removeItem('member')
        toastr.success('Has cerrado sesión')
        this.setState({ login: false, username: '', totalNoti: 0 })
        this.props.history.push('/')
    }

    handleSlider = (e, pos) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }

        this.setState({ pos })
    }

    handleModal = e => {
        e.preventDefault()
        this.setState({ isVisibleModal: !this.state.isVisibleModal })
    }

    handleModalSeeMore = () => {
        this.setState({ modalActive: !this.state.modalActive })
    }

    handleSeeMore = type => {
        if (type === 1) this.props.history.push('/categorias')
        if (type === 2) this.props.history.push('/aliados')
        if (type === 3) this.props.history.push(`/articulos/${ this.state.up_code }`)
    }

    render() {
        return (
            <HomeV handleSlider={this.handleSlider} state={this.state} handleModal={this.handleModal} handleSeeMore={this.handleSeeMore} handleModalSeeMore={this.handleModalSeeMore} closeSession={this.closeSession} />
        )
    }
}

export default connect(({ categoriesSerStore, categoriesProStore, vendors, productsStore, servicesStore, products, services }) => ({ categoriesSerStore, categoriesProStore, vendors, productsStore, servicesStore, products, services }), {
    getAllCategoriesProStore, getAllCategoriesSerStore, getAllVendors, getAllProductsStore, getAllServicesStore, getAllProducts, getAllServices
})(Home)