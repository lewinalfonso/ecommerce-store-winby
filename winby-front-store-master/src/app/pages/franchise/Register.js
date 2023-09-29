import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'
import { getAllCountries, getAllDepartments, getAllMunicipality } from '../../redux/actions/utilities'
import { getRegisterFranchise, getProfileUser } from '../../redux/actions/user'
import { validationsTwo, validationPhoneTwo, validationFormTwo } from '../../utils'
import RegisterV from '../../components/franchise/Register'


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [], departments: [], municipalities: [],
            error: {}, values: { u_phoNum: '+57' },
        }
        this.isMount = false
    }

    async componentDidMount() {
        this.isMount = true
        const u_id = localStorage.getItem('u_id')
        this.setState({ loading: true })
        if (!u_id)
            this.props.history.push('/')
        else {
            const data = JSON.parse(localStorage.getItem('infProfile')), member = localStorage.getItem('member')
            if (member !== 'true' || data.userprofile.up_franchise !== 1)
                this.props.history.push('/')
            
            /** peticion */
            await this.props.getAllCountries(1)
            /** resultado */
            const res = this.props.countries

            if (data.country?.c_id && this.isMount) {
                /** peticion */
                await this.props.getAllDepartments({ id: data.country.c_id, state: 1 })
                /** resultado */
                const res = this.props.departments

                if (!!res.success && this.isMount)
                    this.setState({ departments: res.data })
            }
            if (data.department?.d_id && this.isMount) {
                /** peticion */
                await this.props.getAllMunicipality({ id: data.department.d_id, state: 1 })
                /** resultado */
                const res = this.props.municipality
                if (!!res.success && this.isMount)
                    this.setState({ municipalities: res.data })
            }
            /** verifica si hay un link de invitado */
            this.isMount && this.setState({ 
                values: { ...this.state.values, 
                    u_id,
                    up_name: data.userprofile?.up_name, up_last: data.userprofile?.up_last, 
                    u_email: data.u_email, u_phoNum: data.u_phoNum,
                    c_id: data.country?.c_id, d_id: data.department?.d_id, m_id: data.municipality?.m_id,
                },
                disabled: {
                    up_name: data.userprofile?.up_name, up_last: data.userprofile?.up_last,
                    u_email: data.u_email, u_phoNum: data.u_phoNum,
                    c_id: data.country?.c_id, d_id: data.department?.d_id, m_id: data.municipality?.m_id,
                },
                code: data.usersponsor?.us_code
            })
            
            if (this.isMount && !!res.success) 
                this.setState({countries: res.data})
        }
        
        this.isMount && this.setState({ loading: false })
    }

    /** si se desmonta el componente antes de las peticiones */
    componentWillUnmount() {
        this.isMount = false
    }

    onChangeSelect = async (v, id, e) => {
        this.setState({ values: { ...this.state.values, [id]: v[id] } })

        if (id === 'c_id') {
            /** peticion */
            await this.props.getAllDepartments({id: v[id], state: 1})
            /** resultado */
            const res = this.props.departments
            
            if (!!res.success) 
                this.setState({departments: res.data})
        } else  if (id === 'd_id') {
            /** peticion */
            await this.props.getAllMunicipality({id: v[id], state: 1})
            /** resultado */
            const res = this.props.municipality
            if (!!res.success)
                this.setState({municipalities: res.data})
        }
    }

    /** Validando y enviando el formulario  */
    handleSubmit = async e => {
        e.preventDefault()
        const { error, values } = this.state, errorForm = validationFormTwo(e.target.elements, error)

        /** comprueba el resultado */
        if (!errorForm) {
            /** peticion */
            this.setState({ loading: true })
            await this.props.getRegisterFranchise(values)
            this.setState({ loading: false })

            /** resultado */
            const res = this.props.users

            if (!!res.success) {
                this.setState({values: {} })
                toastr.success(res.message)
                await this.props.getProfileUser({ u_id: values.u_id})
                localStorage.setItem('infProfile', JSON.stringify(this.props.users.data))
                setTimeout(e => window.location.href = 'https://app.winby.co/login', 1000)
                return
            } else return toastr.warning(res.message)
        }
        return toastr.warning('Por favor revise los campos obligatorios.')
    }

    render() {
        return (
            <RegisterV 
                state={this.state}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) } })}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                onChangeSelect={this.onChangeSelect}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default connect(({ countries, departments, municipality, users }) => ({ countries, departments, municipality, users }), {
    getAllCountries,
    getAllDepartments,
    getAllMunicipality,
    getRegisterFranchise,
    getProfileUser
})(Register)