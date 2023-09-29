import React, { Component } from 'react'
import { connect } from 'react-redux'
import VendorsItemsV from '../../components/vendors/ItemsV'
import { getOneVendors } from '../../redux/actions/vendors'
import { getAllProducts, getAllServices } from '../../redux/actions/products'


class VendorsItems extends Component {
    state = {
        products: [],
        increment: 10,
        start: 0,
        id: false,
        items: []
    }
    isMount = true

    async componentDidMount() {
        this.setState({ loading: true })
        /** variables necesarias */
        const { id } = this.props.match.params
        /** Busquedas */
        this.searchVendors(id, this.props.location.state)
        this.searchProSer(id)
        this.isMount && this.setState({ loading: false, id })
    }

    componentWillUnmount() {
        this.isMount = false
    }

    searchVendors = async (id, vendor) => {
        let result = true
        /** variables necesarias */
        if (!!vendor) {
            result = false
            this.setState({ vendor: vendor.item })
        } else {
            const res = this.props.vendors
            if (!!res?.one?.v_id === id) {
                result = false
                this.setState({ vendor: res.one })
            }
            if (!!res?.data?.length) {
                const resFind = res.data.find(x => x.v_id === id)
                if (!!resFind) {
                    result = false
                    this.setState({ vendor: resFind })
                }
            }
        }

        this.isMount && result && this.setState({ loading: true })
        /** peticion */
        await this.props.getOneVendors({ v_id: id, v_state: 1 })
        /** respuesta */
        if (this.props.vendors?.successOne && this.isMount)
            this.setState({ vendor: this.props.vendors?.one })
        else
            this.props.history.push('/')
        this.isMount && this.setState({ loading: false })
    }
    
    /** Busca todo los productos */
    searchProSer = async id => {
        /** variables necesarias */
        let items = [], products = [], services = []/* , availableFor = 0 */
        // const resultS = this.props.services?.data || []
        // const resultP = this.props.products?.data || []
        /** verificando si existen productos */
        // if (resultP.length && this.isMount)
        //     products = resultP.filter(x => x.v_id === id)
        // /** verificando si existen productos */
        // if (resultS.length && this.isMount)
        //     services = resultS.filter(x => x.v_id === id)
        // this.saveItems(products, services)
        
        !!items.length && this.isMount && this.setState({ loading: true })
        items = []
        
        /** peticion */
       
        await this.props.getAllServices({ s_state: 1, v_id: id, min: this.state.start, max: this.state.increment, typeOrder: 2 })  
        await this.props.getAllProducts({ p_state: 1, v_id: id, min: this.state.start, max: this.state.increment, typeOrder: 2 })
    
        /** respuesta */
        const resS = this.props.services
        const resP = this.props.products
    
        /** verificando si existen productos */
        if (resP?.success && this.isMount)
            products = [...products, ...(resP.data?.filter(x => x.v_id === id))]
        if (resS?.success && this.isMount)
            services = [...services, ...(resS.data?.filter(x => x.v_id === id))]
        this.saveItems(products, services)
    }

    saveItems = (products, services) => {
        
        const res = products.length > services.length ? products : services
        
        let { items } = this.state
        let itemsAll = [...items]

        res.forEach((x, i) => {
            if (!items?.find(z => (z.p_id || z.s_id) === (x.p_id || x.s_id))) {
                itemsAll = [...itemsAll, x]
                if (!!x.p_id) 
                    !!services.length && !!services[i] && (itemsAll = [...itemsAll, services[i]])
                else 
                    !!products.length && !!products[i] && (itemsAll = [...itemsAll, products[i]])
                }
        })
        // res.forEach((x, i) => {
        //     itemsAll = [...itemsAll, x]
        //     if (!!x.p_id) 
        //         !!services.length && !!services[i] && (itemsAll = [...itemsAll, services[i]])
        //     else 
        //         !!products.length && !!products[i] && (itemsAll = [...itemsAll, products[i]])
        // })
        this.setState({items: itemsAll})
    }

    render() {
        return (
            <VendorsItemsV
                state={this.state}
                handleShowMore={async () => {
                    await this.setState({ start: this.state.start + this.state.increment, loading: true}) 
                    await this.searchProSer(this.state.id)
                    this.setState({ loading: false })
                } }
            />
        )
    }
}

export default connect(({ products, services, vendors }) => ({ products, services, vendors }), { getAllProducts, getAllServices, getOneVendors })(VendorsItems)