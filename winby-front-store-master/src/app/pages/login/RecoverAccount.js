import React, { Component } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { getRecoverAccount, getRecoverValidateToken, getRecoverChangePass } from '../../redux/actions/user'
import RecoverAccountV from '../../components/login/RecoverAccount'
import { validationFormTwo, validationsTwo } from '../../utils'
import { MyContext } from '../../components/layout'

class RecoverAccount extends Component {
    static contextType = MyContext
    state = {
        values: { u_phoNum: '+57 ', u_email: '', u_token: '', u_pass: '', u_passConf: '' }, error: {},
        form: 1
    }

    componentDidMount() {
        if (localStorage.getItem('u_id')) this.props.history.push('/')
    }

    /** validar formulario */
    handleSubmit = async (e, form) => {
        e.preventDefault()
        const { error, values } = this.state, errorForm = validationFormTwo(e.target.elements, error)

        if (errorForm) return toastr.warning('Por favor revise los campos que esten correctos.')
        this.setState({ loading: true })

        if (form === 1) {
            await this.props.getRecoverAccount({ u_email: values.u_email })
            if (this.props.userRecoverAccount.success) this.setState({ form: 2 })
            else toastr.warning(this.props.userRecoverAccount.message)
        } else if (form === 2) {
            await this.props.getRecoverValidateToken({ u_email: values.u_email, u_token: values.u_token })
            if (this.props.userRecoverAccount.success) this.setState({ form: 3 })
            else toastr.warning(this.props.userRecoverAccount.message)
        } else if (form === 3) {
            if (values.u_pass === values.u_passConf) {
                await this.props.getRecoverChangePass({ u_email: values.u_email, u_token: values.u_token, u_pass: values.u_pass })
                if (this.props.userRecoverAccount.success) {
                    toastr.success(this.props.userRecoverAccount.message)
                    this.props.history.push('/user/login')
                } else toastr.warning(this.props.userRecoverAccount.message)
            } else {
                toastr.warning('Las contraseñas no coinciden.')
            }
        }
        this.setState({ loading: false })
    }

    render() {
        return (
            <RecoverAccountV
                state={this.state}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
                // onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                handleSubmit={this.handleSubmit}
                handleSee={() => this.setState({ passSee: !this.state.passSee })}
            />
        )
    }
}

export default connect(({ userRecoverAccount }) => ({ userRecoverAccount }), { getRecoverAccount, getRecoverValidateToken, getRecoverChangePass })(RecoverAccount)