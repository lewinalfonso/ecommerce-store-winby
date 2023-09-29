import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListOfSearch } from '../../components/searcher'
import { getAllSearchCategories, getAllSearchProducts } from '../../redux/actions/search'

class Searcher extends Component {
    state = {
        fetchMore: true,
        min: 0,
        max: 20,
        products: []
    }
    isMount = true

    async componentDidMount() {
        /** variables necesarias */
        const { search } = this.props.match.params
        this.setState({ loading: true, search })
        /** Busquedas */
        this.searchProSer(search)
        this.searchCatProSer(search)
    }

    componentWillUnmount() {
        this.isMount = false
    }

    componentDidUpdate() {
        const { search } = this.props.match.params
        if (search !== this.state.search) {
            this.setState({ loading: true, search, products: [], min: 0, max: 20 })
            this.searchProSer(search)
            this.searchCatProSer(search)
        }
    }

    searchCatProSer = async search => {
        /** busca las categorias */
        this.isMount && this.setState({ loading: true })
        await this.props.getAllSearchCategories({ search })
        /** respuesta */
        const res = this.props.searchCategories
        let categories = []

        if (res.success && this.isMount) {
            res?.data?.cpData?.length && (categories = [...categories, ...res?.data?.cpData])
            res?.data?.csData?.length && (categories = [...categories, ...res?.data?.csData])
            res?.data?.scsData?.length && (categories = [...categories, ...res?.data?.scsData])
            res?.data?.scpData?.length && (categories = [...categories, ...res?.data?.scpData])
        }
        this.isMount && this.setState({ categories, loading: false })
    }

    onFetchMore = () => {
        const { min, max, search } = this.state
        this.setState({ min: min + max }, () => this.searchProSer(search, false))
    }

    /** Busca todo los productos */
    searchProSer = async (search, loading) => {
        const { min, max } = this.state
        /** busca las categorias */
        this.isMount && this.setState({ loading: loading !== undefined ? loading : true })
        await this.props.getAllSearchProducts({ search, min, max, typeOrder: 1 })
        /** respuesta */
        const res = this.props.searchProducts
        let products = this.state.products || []

        if (res.success && this.isMount) {
            res?.data?.pData?.length && (products = [...products, ...res?.data?.pData])
            res?.data?.sData?.length && (products = [...products, ...res?.data?.sData])
        }
        this.isMount && this.setState({ products, loading: false, fetchMore: !!res?.data?.pData?.length || !!res?.data?.sData?.length })
    }

    render() {
        return (
            <ListOfSearch
                state={this.state}
                handleSeeMore={() => this.props.history.push('/categories')}
                onFetchMore={this.onFetchMore}
            />
        )
    }
}

export default connect(({ searchCategories, searchProducts }) => ({ searchCategories, searchProducts }), { getAllSearchCategories, getAllSearchProducts })(Searcher)