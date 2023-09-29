import React, { Component } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { getRegisterUser } from '../../redux/actions/user'
import RegisterV from '../../components/login/Register'
import { Match, validationFormTwo, validationPhoneTwo, validationsTwo } from '../../utils'
import { MyContext } from '../../components/layout'

class Register extends Component {
    static contextType = MyContext
    state = {
        values: { u_phoNum: '+57 ', code: !!localStorage.getItem('code') ? JSON.parse(localStorage.getItem('code')) : 'Winby' }, error: {}, recaptcha: false, terms: false
    }

    componentDidMount() {
        if (localStorage.getItem('u_id')) this.props.history.push('/')
        if (this.props.location?.state?.cart) this.setState({ cartBack: true })
    }

    componentWillUnmount() {
        this.setState({ error: {}, recaptcha: false, terms: false })
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

    /** validar formulario */
    handleSubmit = async e => {
        e.preventDefault()
        const { error, values, compare, recaptcha, terCon } = this.state, errorForm = validationFormTwo(e.target.elements, error)

        if (errorForm) return toastr.warning('Por favor revise los campos que esten correctos.')
        if (!recaptcha) return toastr.warning('Por favor verificar que no eres un Robot')
        if (!terCon) return toastr.warning('Por favor Acepte los Terminos y Condiciones')

        if (compare) return toastr.warning('La contraseña no coinciden.')

        /** peticion */
        this.setState({ loading: true })
        await this.props.getRegisterUser(values)
        this.setState({ loading: false })

        if (this.props.users.success) {
            this.context.handleLogin({ member: this.props.users.member, u_id: this.props.users.u_id, infProfile: this.props.users.infProfile })
            toastr.success(this.props.users.message)
            return this.state.cartBack ? this.props.history.push('/carrito') : this.props.history.push('/')
        }

        toastr.warning(this.props.users.message)
    }

    render() {
        return (
            <RegisterV
                state={this.state}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: isEmail ? e.target.value.trim() : e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                onBlurInput={this.onBlurInput}
                handleSubmit={this.handleSubmit}
                handleRecaptcha={value => this.setState({ recaptcha: value })}
                handleTerms={value => this.setState({ terms: value })}
                onChangeCheck={e => this.setState({ [e.target.name]: e.target.checked })}
            />
        )
    }
}

export default connect(({ users }) => ({ users }), { getRegisterUser })(Register)