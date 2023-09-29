import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import LandingPageV from '../../components/landingPage'
import { getAllProducts } from '../../redux/actions/products'
import { validationFormTwo, validationPhoneTwo, validationsTwo, Match } from '../../utils'
import { getAllVendors } from '../../redux/actions/vendors'
import { getRegisterUser } from '../../redux/actions/user'
import { MyContext } from '../../components/layout'

class LandingPage extends Component {
    static contextType = MyContext
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            values: { u_phoNum: '+57' }, error: {},
        }
        this.isMount = true
    }

    async componentDidMount() {
        const code = this.props.match.params.code
        this.context.updateCode(code)
        this.searchCover()
        this.searchVendors()
    }

    componentWillUnmount() {
        this.isMount = false
    }
    /** On blur de los inputs */
    onBlurInput = () => {
        const { values } = this.state
        if (!!values.u_pass && !!values.u_conPass) {
            /** verifica si las contraseñan coinciden */
            const compare = !!Match(values.u_pass, values.u_conPass)
            if (compare)
                toastr.warning('Las contraseñas no coinciden')
            this.setState({ compare })
        }
    }

    handleCheckboxChange = event => this.setState({ checked: event.target.checked })

    searchCover = async () => {
        /** variables necesarias */
        const u_id = localStorage.getItem('u_id')
        const code = this.props.match.params?.code || 'Winby'
        localStorage.setItem('code', JSON.stringify(code))

        if (u_id) return this.props.history.push('/')

        /** busca los productos ya almacenado en el reducer */
        if (this.props.products?.data?.length) {
            const resFilter = this.props.products.data.filter(x => !!x.p_franchise)
            if (resFilter.length) return this.setState({ codeUser: code, item: resFilter[0] })
        }

        /** busca productos de LICENCIA y portada  */
        this.setState({ loading: true })
        await this.props.getAllProducts({ p_state: 1, min: 0, max: 1, franchise: 1 })
        this.setState({ loading: false })

        /** valida si se consiguieron productos */
        if (this.props.products?.data?.length) {
            const resFilter = this.props.products.data.filter(x => !!x.p_franchise)
            if (resFilter.length) return this.setState({ codeUser: code, item: resFilter[0] })
        }
    }

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
    onChangelange =  (e) => {
    }

    handleClick = () => {
        /** variables necesarias */
        const { p_id, v_id, p_description, p_franchise, p_groPer, p_name, p_price, p_quantity, productphotos } = this.state.item, shoppingCard = JSON.parse(localStorage.getItem('shoppingCard'))
        let invoiceproducts = shoppingCard.invoiceproducts
        const resFindIP = invoiceproducts?.find(x => x.p_id === p_id)
        /** verifica si el producto no existe ya registrado */
        if (!resFindIP) {
            invoiceproducts = [...invoiceproducts, { p_id, v_id, ip_name: p_name, ip_description: p_description, ip_price: p_price, ip_quantity: p_quantity, ip_total: 1, ip_groPer: p_groPer, ip_franchise: p_franchise, ip_available: 1, productphotos: productphotos ? [productphotos[0]] : [], ip_delivery: 0 }]
            /** actualiza el local storage */
            this.context.countShoppingCart(1)
            localStorage.setItem('shoppingCard', JSON.stringify({ ...shoppingCard, i_sub: shoppingCard.i_sub + p_price, invoiceproducts }))
        }
        this.props.history.push('/carrito', { cart: true })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { error, values, compare, terConFra, franchiseTerm, terCon } = this.state, errorForm = validationFormTwo(e.target.elements, error)

        if (errorForm) return toastr.warning('Por favor revise los campos que esten correctos.')

        if (franchiseTerm) {
            if (!values.up_ideNum) return toastr.info('Es necesario brindar la información del contrato.')
            if (!terConFra) return toastr.info('Es necesario aceptar el contrato de licencia.')
        }        

        if (compare) return toastr.warning('La contraseña no coinciden.')
        const code = this.props.match.params.code

        if (terCon) {
            this.setState({ loading: true })
            await this.props.getRegisterUser({ ...values, code })
            this.setState({ loading: false })
            if (this.props.users.success) {
                this.context.handleLogin({ member: this.props.users.member, u_id: this.props.users.u_id, infProfile: this.props.users.infProfile })
                toastr.success(this.props.users.message)
                return this.handleClick()
            }
            toastr.warning(this.props.users.message)
            }return this.setState({ loading: false } ) || toastr.warning('Debe aceptar los terminos y condiciones.')

        /** peticion */
    }
    

    render() {
        return <LandingPageV
            state={this.state}
            handleClickUp={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
            onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
            onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
            onBlurInput={this.onBlurInput}
            handleSubmit={this.handleSubmit}
            onChangeCheck={e => this.setState({ [e.target.name]: e.target.checked })}
            onChange={this.handleCheckboxChange}
            onChangelange={this.onChangelange}
        />
    }
}

export default connect(({ products, users, vendors }) => ({ products, users, vendors }), { getAllProducts, getRegisterUser, getAllVendors })(LandingPage)