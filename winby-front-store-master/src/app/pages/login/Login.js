import React, { Component } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { getLogin } from '../../redux/actions/user'
import LoginV from '../../components/login/Login'
import { validationFormTwo, validationPhoneTwo, validationsTwo } from '../../utils'
import { MyContext } from '../../components/layout'

class Login extends Component {
    static contextType = MyContext
    state = {
        values: { u_phoNum: '+57 ' }, error: {},
    }

    componentDidMount() {
        if (localStorage.getItem('u_id')) this.props.history.push('/')
    }

    /** validar formulario */
    handleSubmit = async e => {
        e.preventDefault()
        const { error, values } = this.state, errorForm = validationFormTwo(e.target.elements, error)

        if (errorForm) return toastr.warning('Por favor revise los campos que esten correctos.')

        /** peticion */
        this.setState({ loading: true })
        await this.props.getLogin(values)
        this.setState({ loading: false })
        if (this.props.users.success) {
            const { member, u_id, infProfile } = this.props.users
            this.context.handleLogin({ member, u_id, infProfile, code: (member && !!infProfile.userprofile.up_code) ? `"${ infProfile.userprofile.up_code }"` : undefined })
            toastr.success(this.props.users.message)

            if (this.props.location?.state?.cart) return this.props.history.push('/carrito')
            else if (member && !!infProfile.userprofile.up_code) return this.props.history.push(`/store/${ infProfile.userprofile.up_code }`)
            return this.props.history.push('/')
        }

        toastr.warning(this.props.users.message)
    }

    render() {
        return (
            <LoginV
                state={this.state}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                handleSubmit={this.handleSubmit}
                handleSee={() => this.setState({ passSee: !this.state.passSee })}
            />
        )
    }
}

export default connect(({ users }) => ({ users }), { getLogin })(Login)