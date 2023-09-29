import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import WhatIsPageV from '../../components/landingPage/WhatIsPageV'
import { validationPhoneTwo } from '../../utils'
import { postLandingFormContact, postLandingPhoneContact } from '../../redux/actions/landing'
import { MyContext } from '../../components/layout'

class WhatIsPage extends Component {
    static contextType = MyContext
    constructor(props){
        super(props)
        this.state = {
            valuesForm: {
                uc_message: '',
                uc_phone: '+57',
                uc_code: ''
            },
            error: {
                uc_phone: true
            }
        }
        this.isMount = false
    }
    async componentDidMount() {
        const code = this.props.match.params.code
        if (!code) return this.props.history.push('/')
        await this.props.postLandingPhoneContact({up_code: code })
        this.context.updateCode(code)
        const res = this.props.phoneContact
        this.setState({ valuesForm: { ...this.state.valuesForm, uc_code: code }, u_phoNum: res?.data?.user?.u_phoNum || '' })
    }

    handleInput = e => {
        const { name, value } = e.target
        this.setState({ valuesForm: { ...this.state.valuesForm, [name]: value } })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { uc_message, uc_phone } = this.state.valuesForm

        if (uc_message && uc_phone && !this.state.error.uc_phone) {
            await this.props.postLandingFormContact({ ...this.state.valuesForm })
            const res = this.props.formContact
            if (res.success) {
                this.setState({ valuesForm: { uc_message: '', uc_phone: '+57' } })
                toastr.success(res.message)
            } else toastr.warning(res.message)
        } else toastr.warning('Por favor verifique los campos.')
    }

    render() {
        return (
            <WhatIsPageV
                state={this.state}
                handleClickUp={() => window.scroll({ top: 0, left: 0, behavior: 'smooth' })}
                handleInput={this.handleInput}
                handleSubmit={this.handleSubmit}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ valuesForm: { ...this.state.valuesForm, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}/>
        )
    }
}

export default connect(({ formContact, phoneContact }) => ({ formContact, phoneContact }), { postLandingFormContact, postLandingPhoneContact })(WhatIsPage)