import React, { Component } from 'react'
import InfoFranchiseV from '../../components/franchise/InfoFranchise'
import { MyContext } from '../../components/layout'

class InfoFranchise extends Component {
    static contextType = MyContext
    constructor (props) {
        super(props)
        this.state = {
            codeUser: 'Winby'
        }
    }

    componentDidMount () {
        /** variables necesarias */
        const res = this.props.location.state
        const code = JSON.parse(localStorage.getItem('code'))
        /** valida que exista un item en el envio */
        if (!res) return this.props.history.push('/')
        this.setState({ codeUser: code, item: res.item })
    }

    handleClick = () => {
        /** variables necesarias */
        const { p_id, v_id, p_description, p_franchise, p_groPer, p_name, p_price, p_quantity, productphotos, p_taxGat } = this.state.item,
            shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceproducts = shoppingCard.invoiceproducts
        const resFindIP = invoiceproducts?.find(x => x.p_id === p_id)
        /** verifica si el producto no existe ya registrado */
        if (!resFindIP) {
            invoiceproducts = [...invoiceproducts, { p_id, v_id, ip_taxGat: (p_taxGat || 0), ip_name: p_name, ip_description: p_description, ip_price: p_price, ip_quantity: p_quantity, ip_total: 1, ip_groPer: p_groPer, ip_franchise: p_franchise, ip_available: 1, productphotos: productphotos ? [productphotos[0]] : [], ip_delivery: 0 }]
            /** actualiza el local storage */
            this.context.countShoppingCart(1)
            localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCard, i_sub: shoppingCard.i_sub + p_price, invoiceproducts }))
        }
        this.props.history.push('/carrito', { cart: true })
    }

    render () {
        return (
            <InfoFranchiseV
                state={this.state}
                handleClick={this.handleClick}
            />
        )
    }
}

export default InfoFranchise