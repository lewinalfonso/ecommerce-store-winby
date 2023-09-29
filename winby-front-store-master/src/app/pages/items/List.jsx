import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListItemsV from '../../components/items/ListV'
import { getOneVendors } from '../../redux/actions/vendors'
import { getAllProducts, getAllServices } from '../../redux/actions/products'
import { getAllBanners } from '../../redux/actions/store'

class ListItems extends Component {
    state = {
        pos: 1,
        items: [],
        increment: 15,
        start: 0,
        banners: [],
        type: 0,
        finalResult: false
    }
    isMount = true

    async componentDidMount() {
        this.setState({ loading: true })
        const { type } = this.props
        /** variables necesarias */
        const { id } = this.props.match.params
        /** Busquedas */
        this.searchProSer(id, this.state.start + this.state.increment, this.state.start + (this.state.increment * 2))
        this.isMount && this.setState({ loading: false, type })
        this.searchAllBanners()
    }

    componentWillUnmount() {
        this.isMount = false
    }

    // Busca todo los productos
    searchProSer = async (id, min, max) => {
        /** variables necesarias */
        // let products = [], services = []
        // this.saveItems(this.props.products?.data || [], this.props.services?.data || [])

        /* if (!this.props.services?.data?.length || !this.props.products?.data?.length) this.isMount &&  */
        this.setState({ loading: true })

        await this.props.getAllServices({ s_state: 1, v_id: id, min, max, typeOrder: 2 }, { mode: true })
        await this.props.getAllProducts({ p_state: 1, v_id: id, min, max, typeOrder: 2 }, { mode: true })

        /** respuesta */
        // const resS = this.props.services
        // const resP = this.props.products

        /** verificando si existen productos */
        // if (resP?.success && this.isMount) products = [...products, ...(resP.data?.filter(x => x.v_id === id))]
        // if (resS?.success && this.isMount) services = [...services, ...(resS.data?.filter(x => x.v_id === id))]

        // this.saveItems(products, services)
        this.saveItems(this.props.products?.data || [], this.props.services?.data || [], this.state.start + this.state.increment)
    }

    searchAllBanners = async () => {
        const { type } = this.props
        /** variables necesarias */
        this.setState({ loading: true })
        await this.props.getAllBanners({ gbType: type === 1 ? 2 : 1 })
        /** respuesta */
        if (this.isMount) {
            const resBs = this.props.searchAllBanners?.data || []
            this.setState({ banners: [...resBs], loading: false })
        }
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

            if (pro.length && ser.length) itemsAll = [...items, ...proFilter, ...serFilter]
            if (pro.length && !ser.length) itemsAll = [...items, ...proFilter]
            if (ser.length && !pro.length) itemsAll = [...items, ...serFilter]
            if (!pro.length && !ser.length) {
                itemsAll = items
                this.setState({ finalResult: true })
            }
        }
        this.setState({ items: itemsAll, start: min })
    }

    handleSlider = (e, pos) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.setState({ pos })
    }
    handleSliderOp = (e, pos) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        this.setState({ pos })
    }

    render() {
        return (
            <ListItemsV
                state={this.state}
                handleShowMore={async () => {
                    this.setState({ start: this.state.start + this.state.increment, loading: true })
                    await this.searchProSer(this.state.id, this.state.start + this.state.increment, this.state.start + (this.state.increment * 2))
                    this.setState({ loading: false })
                }}
                handleSlider={this.handleSlider}
                handleSliderOp={this.handleSliderOp}
            />
        )
    }
}

export default connect(({ products, services, vendors, searchAllBanners }) => ({ products, services, vendors, searchAllBanners }), { getAllProducts, getAllServices, getOneVendors, getAllBanners })(ListItems)