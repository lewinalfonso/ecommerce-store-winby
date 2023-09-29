import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListCategories } from '../../components/categories/CategoryItemsV'
import { getOneCategoriesProStore, getOneCategoriesSerStore } from '../../redux/actions/store'
import { getAllSubCatPro, getAllSubCatSer } from '../../redux/actions/categories'
import { getAllProducts, getAllServices } from '../../redux/actions/products'

class CategoryItems extends Component {
    state = {
        products: [],
        increment: 15,
        start: 0,
        vendors: [],
        items: [],
        finalResult: false
    }
    isMount = true

    async componentDidMount() {
        this.setState({ loading: true })

        /** variables necesarias */
        const { id, mode } = this.props.match.params, page = this.props.page
        /** Busquedas */
        await this.searchCategory(id, page, this.props.location.state, mode)
        this.isMount && this.setState({ paramId: id, loading: false, page })
        if (this.props.location?.state?.sc_id) await this.handleSubCategory(this.props.location?.state?.itemSubCat)
    }

    componentWillUnmount() {
        this.isMount = false
    }

    async componentDidUpdate({ match: { params }, page }, { paramId }) {
        if (this.props.match.params?.id !== paramId && !!paramId) {
            this.setState({ loading: true, paramId: params.id, })
            await this.searchCategory(params.id, page, this.props.location.state, params.mode)
            this.isMount && this.setState({ loading: false, page })
        }
    }

    searchCategory = async (idCat, page, category, mode) => {
        let result = false
        if (category) {
            result = true
            this.setState({ category: mode ? category.item : (category.item?.uscp_id ? category.item.categoryproduct : category.item.categoryservice) })
            this.searchSubCategory(category.item?.categoryproduct?.cp_id || category.item?.categoryservice?.cs_id || category.item?.cp_id || category.item?.cs_id, page)
            this.searchProSer(this.props.location?.state?.sc_id || category.item?.categoryproduct?.cp_id || category.item?.categoryservice?.cs_id || category.item?.cp_id || category.item?.cs_id, page)
        } else {
            const res = page === 3 ? this.props.categoriesSerStore : this.props.categoriesProStore
            if (res) {
                if (res.one) {
                    if (mode ? (page === 3 ? res.one?.categoryservice?.cs_id : res.one?.categoryproduct?.cp_id) === idCat : (page === 3 ? res.one?.uscs_id : res.one?.uscp_id) === idCat) {
                        result = true
                        this.setState({ category: page === 3 ? res.one.categoryservice : res.one.categoryproduct })
                        this.searchSubCategory(page === 3 ? res.one.categoryservice?.cs_id : res.one.categoryproduct?.cp_id, page)
                        this.searchProSer(this.props.location?.state?.sc_id || page === 3 ? res.one.categoryservice?.cs_id : res.one.categoryproduct?.cp_id, page)
                    }
                }
                if (!result && !!res.data?.length) {
                    res.data.forEach(x => {
                        if (mode ? (x.categoryservice?.cs_id || x.categoryproduct?.cp_id) === idCat : (x.uscs_id || x.uscp_id) === idCat) {
                            result = true
                            this.setState({ category: x.uscp_id ? x.categoryproduct : x.categoryservice })
                            this.searchSubCategory(page === 3 ? x.categoryservice?.cs_id : x.categoryproduct?.cp_id, page)
                            this.searchProSer(this.props.location?.state?.sc_id || (page === 3 ? x.categoryservice?.cs_id : x.categoryproduct?.cp_id, page))
                        }
                    })
                }
            }
        }

        /** peticion */
        !result && this.setState({ loading: true })
        page === 3 ? await this.props.getOneCategoriesSerStore({ uscs_id: !mode && idCat, cs_id: !!mode && idCat, up_code: 'Winby', uscs_state: 1 }) : await this.props.getOneCategoriesProStore({ uscp_id: !mode && idCat, cp_id: !!mode && idCat, up_code: 'Winby', uscp_state: 1 })
        this.isMount && this.setState({ loading: false })
        /** resultado */
        const res = page === 3 ? this.props.categoriesSerStore : this.props.categoriesProStore
        if (!!res.successOne && this.isMount) {
            this.setState({ category: page === 3 ? res.one.categoryservice : res.one.categoryproduct })
            if (!result) {
                this.searchSubCategory(page === 3 ? res.one.categoryservice?.cs_id : res.one.categoryproduct?.cp_id, page)
                this.searchProSer(this.props.location?.state?.sc_id || (page === 3 ? res.one.categoryservice?.cs_id : res.one.categoryproduct?.cp_id, page))
            }
        } else if (!result) { this.props.history.push('/') }
    }

    /** busca todo los vendedors */
    searchSubCategory = async (idCat, page) => {
        /** variables necesarias */
        let loading = true
        const resC = page === 3 ? this.props.subCategoriesS?.data : this.props.subCategoriesP?.data
        /** verificando si existen sub categorias de la categoria */
        if (resC?.length && this.isMount) {
            const subCategories = resC.filter(x => (x.cs_id || x.cp_id) === idCat)
            if (!subCategories?.length) loading = false
            this.setState({ subCategories })
        }

        loading && this.isMount && this.setState({ loading: true })
        /** peticion */
        if (page === 3) { await this.props.getAllSubCatSer({ cs_id: idCat, scs_state: 1, min: 0, max: 20, typeOrder: 1 }) }
        else { await this.props.getAllSubCatPro({ cp_id: idCat, scp_state: 1, min: 0, max: 20, typeOrder: 1 }) }
        /** respuesta */
        const res = page === 3 ? this.props.subCategoriesS : this.props.subCategoriesP
        if (!!res.success && this.isMount) { this.setState({ subCategories: res?.data?.filter(x => (x.cs_id || x.cp_id) === idCat) }) }
        this.isMount && this.setState({ loading: false })
    }

    /** Busca todo los productos */
    searchProSer = async (idCat, page) => {
        /** variables necesarias */
        let loading = true
        // const result = (page === 3 ? this.props.services?.data : this.props.products?.data) || []
        /** verificando si existen sub categorias de la categoria */
        // if (result.length && this.isMount) {
        //     const products = result.filter(x => (x.subcategoryservice?.cs_id || x.subcategoryproduct?.cp_id) === idCat)
        //     if (!products?.length) loading = false
        //     this.setState({ products })
        // }

        loading && this.isMount && this.setState({ loading: true })
        /** peticion */
        if (page === 3) { await this.props.getAllServices({ s_state: 1, cs_id: idCat, min: 0, max: 20, typeOrder: 2 }, { mode: true }) }
        else { await this.props.getAllProducts({ p_state: 1, cp_id: idCat, min: 0, max: 20, typeOrder: 2 }, { mode: true }) }
        /** respuesta */
        const res = page === 3 ? this.props.services : this.props.products
        if (!!res.success && this.isMount) { this.setState({ products: res?.data }) }
        // {this.setState({ products: res?.data?.filter(x => (x.subcategoryservice?.cs_id || x.subcategoryproduct?.cp_id) === idCat) })}
        this.isMount && this.setState({ loading: false })

    }
    saveItems = (pro, ser, min) => {
        // const res = pro.length > ser.length ? pro : ser
        const { items } = this.state
        let itemsAll = []
        // let itemsAll = [...items]
        if (min === 0) {
            itemsAll = [...pro, ...ser]
        }
        else {
            let products = [], services = []
            items.forEach(x => {
                if (x.p_id) products = [...products, x]
            })
            items.forEach(x => {
                if (x.s_id) services = [...services, x]
            })

            const proFilter = pro.filter(x => !products.find(z => z.p_id === x.p_id))
            const serFilter = ser.filter(x => !services.find(z => z.s_id === x.s_id))

            if (pro.length && ser.length) itemsAll = [...proFilter, ...serFilter, ...items]
            if (pro.length && !ser.length) itemsAll = [...proFilter, ...items]
            if (ser.length && !pro.length) itemsAll = [...serFilter, ...items]
            if (!pro.length && !ser.length) {
                itemsAll = items
                this.setState({ finalResult: true })
            }
        }

        this.setState({ items: itemsAll, start: min })
    }

    /** si es seleccionada una sub categoria */
    handleSubCategory = async item => {
        const { page } = this.state, res = page === 3 ? this.props.services : this.props.products
        const products = res?.data?.filter(x => (x.subcategoryservice?.scs_id || x.subcategoryproduct?.scp_id) === (item.scp_id || item.scs_id))
        this.setState({ products })
        if (products?.length < 100) {
            this.setState({ loading: true })
            /** peticion */
            if (page === 3) { await this.props.getAllServices({ s_state: 1, scs_id: item.scs_id, min: 0, max: 100, typeOrder: 2 }) }
            else { await this.props.getAllProducts({ p_state: 1, scp_id: item.scp_id, min: 0, max: 100, typeOrder: 2 }) }
            /** respuesta */
            const res = page === 3 ? this.props.services : this.props.products
            if (!!res.success && this.isMount) { this.setState({ products: res?.data?.filter(x => (x.subcategoryservice?.scs_id || x.subcategoryproduct?.scp_id) === (item.scp_id || item.scs_id)) }) }
            this.isMount && this.setState({ loading: false })
        }
    }

    render() {
        return (
            <ListCategories
                state={this.state}
                handleSubCategory={this.handleSubCategory}
            /* Ver mas */
            // handleShowMore={async () => {
            //     this.setState({ start: this.state.start + this.state.increment, loading: true })
            //     await this.searchProSer(this.props.users.dataID.data?.u_id, JSON.parse(localStorage.getItem('code')), this.state.start + this.state.increment, this.state.start + (this.state.increment*2))
            //     this.setState({ loading: false })
            // }}
            />
        )
    }
}

const mapStateToProps = ({ products, services, categoriesSerStore, categoriesProStore, subCategoriesP, subCategoriesS }) => ({ products, services, categoriesSerStore, categoriesProStore, subCategoriesP, subCategoriesS })

export default connect(mapStateToProps, { getOneCategoriesProStore, getOneCategoriesSerStore, getAllSubCatPro, getAllSubCatSer, getAllProducts, getAllServices })(CategoryItems)