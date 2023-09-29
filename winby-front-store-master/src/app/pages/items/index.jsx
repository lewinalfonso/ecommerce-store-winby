import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListProductsAll } from '../../components/items'
import { getOneIDUser } from '../../redux/actions/user'
import { getAllProductsStore, getAllServicesStore } from '../../redux/actions/store'
import { MyContext } from '../../components/layout'

class Items extends Component {
    static contextType = MyContext
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
        /** busca el id del usuario */
        const { code } = this.props.match.params
        await this.props.getOneIDUser({ up_code: code })
        this.context.updateCode(code)
        if (this.props.users.dataID?.success) {
            this.setState({ dataID: this.props.users.dataID?.data?.u_id })
            return this.searchProSer(this.props.users.dataID.data?.u_id, code, this.state.start, this.state.increment)
        }
        this.props.history.push('/')
    }

    componentWillUnmount() {
        this.isMount = false
    }

    // Busca todo los productos
    searchProSer = async (id, code, min, max) => {
        /** variables necesarias */
        /* let items = [] /* products = [], services = [], availableFor = 0 */
        // const resultS = this.props.services?.data || []
        // const resultP = this.props.products?.data || []
        /** verificando si existen productos */
        // if (resultP.length && this.isMount)
        //     products = resultP.filter(x => x.v_id === id)
        // /** verificando si existen productos */
        // if (resultS.length && this.isMount)
        //     services = resultS.filter(x => x.v_id === id)
        // this.saveItems(products, services)

        // this.isMount && this.setState({ loading: true })
        // items = []

        /** peticion */
        await this.props.getAllProductsStore({ up_code: code, min, max, typeOrder: 2 })
        await this.props.getAllServicesStore({ up_code: code, min, max, typeOrder: 2 })

        /** respuesta */
        const resP = this.props.productsStore?.data || []
        const resS = this.props.servicesStore?.data || []

        this.saveItems(resP, resS, min, max)
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
                if (x.product?.p_id) products = [...products, x]
            })
            items.forEach(x => {
                if (x.service?.s_id) services = [...services, x]
            })

            const proFilter = pro.filter(x => !products.find(z => z.product?.p_id === x.product?.p_id))
            const serFilter = ser.filter(x => !services.find(z => z.service?.s_id === x.service?.s_id))

            if (pro.length && ser.length) itemsAll = [...items, ...proFilter, ...serFilter]
            if (pro.length && !ser.length) itemsAll = [ ...items, ...proFilter]
            if (ser.length && !pro.length) itemsAll = [...items, ...serFilter]
            if (!pro.length && !ser.length) {
                itemsAll = items
                this.setState({ finalResult: true })
            }
        }

        this.setState({ items: itemsAll, start: min })
    }

    handleShowMore = async () => {
        this.setState({ start: this.state.start + this.state.increment, loading: true })
        await this.searchProSer(this.state.dataID, JSON.parse(localStorage.getItem('code')), this.state.start + this.state.increment, this.state.start + (this.state.increment * 2))
        this.setState({ loading: false })
    }

    render() {
        return (
            <ListProductsAll
                state={this.state}
                handleSubCategory={this.handleSubCategory}
                handleShowMore={this.handleShowMore}
            />
        )
    }
}

export default connect(({ productsStore, servicesStore, users }) => ({ productsStore, servicesStore, users }), { getAllProductsStore, getAllServicesStore, getOneIDUser })(Items)