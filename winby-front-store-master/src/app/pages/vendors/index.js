import React, { Component } from 'react'
import { connect } from 'react-redux'
import VendorsV from '../../components/vendors'
import { getAllVendors } from '../../redux/actions/vendors'

class Vendor extends Component {
    state = {
        increment: 20,
        start: 0,
        vendors: []
    }
    isMount = true

    async componentDidMount() {

        this.setState({ loading: true })
        /** variables necesarias */
        const { id } = this.props.match.params
        /** Busquedas */
        this.searchVendors()
        this.isMount && this.setState({ loading: false, id })
    }

    componentWillUnmount() {
        this.isMount = false
    }

    /** busca todo las categorias */
    searchVendors = async () => {

        this.setState({ loading: true })
        /** peticiones */
        // await this.props.getAllVendors({ v_state: 1, min: 0, max: 20 })

        await this.props.getAllVendors({ v_state: 1, min: this.state.start, max: this.state.increment })

        const resV = this.props.vendors

        if (this.isMount) {
            /** variables necesarias */
            if (resV?.success)
                // this.setState({ vendors: this.props.vendors.data })
                this.setState({ vendors: [...this.state.vendors, ...resV.data] })
        }
        this.isMount && this.setState({ loading: false })
    }

    render() {
        return (
            <VendorsV
                state={this.state}
                handleShowMore={async () => {
                    await this.setState({ start: this.state.start + this.state.increment, loading: true })
                    await this.searchVendors()
                }}
            />
        )
    }
}

const mapStateToProps = ({ vendors }) => ({ vendors })

export default connect(mapStateToProps, { getAllVendors })(Vendor)