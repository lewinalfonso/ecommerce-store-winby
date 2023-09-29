import React, { Component } from 'react'
import { connect } from 'react-redux'
import BusinessPartnersV from '../components/BusinessPartners'
import { getAllCountries, getAllDepartments, getAllMunicipality } from '../redux/actions/utilities'
import { getRegisterPartner } from '../redux/actions/partners'
import { validations, validationForm, validationPhone, Match } from '../utils'
import toastr from 'toastr'
import { EColor, PLColor } from '../../assets/colors'

class BusinessPartners extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typePersons: [{ tp_id: 1, tp_name: 'Natural' }, { tp_id: 2, tp_name: 'Jurídica' }],
            countries: [],
            departments: [],
            municipalities: [],
            error: {},
            values: { u_phoNum: '+57', tp_id: 1, v_ideNum: null, v_nit: null, v_dv: null, v_name: null, v_last: null, v_business: null }
        }
    }
    
    async componentDidMount() {
        this.isMount = true
        /** link de invitado */
        
        let code = localStorage.getItem('code')
        /** verifica si hay un link de invitado */
        this.setState({ values: { ...this.state.values, code: !!code ? JSON.parse(code) : 'Winby', disabled: !!code ? true : false }})
        
        /** peticion */
        await this.props.getAllCountries(1)
        /** resultado */
        const res = this.props.countries
        
        if (this.isMount && !!res.success)
            this.setState({countries: res.data})
    }

    
    /** si se desmonta el componente antes de las peticiones */
    componentWillUnmount() {
        this.isMount = false
    }
       
    /** cambio de los input */
    handleChangeInput = (e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail) => {
        /** variables necesaria */
        const {name, value} = e.target

        /** actualizando estado */
        this.setState({
            values: { ...this.state.values, [name]: value },
            error: {...this.state.error, [name]: validations(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail)}
        })
    }

    /** cambio de los input */
    onChangeInputPhone = (v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: {...this.state.values, [e.target.name]: v}, error: {...this.state.error, [e.target.name]: validationPhone(v, e, typeNull, typeNumeric) } })

    onBlurConf = e => {
        /** verifica si las contraseñan coinciden */
        const compare = Match(this.state.values.u_pass, e.target.value)

        if (compare) {
            e.target.style.border = `1px solid ${EColor}`
            e.target.nextSibling.innerHTML = 'Las contraseñas no coinciden.'
        } else {
            e.target.style.border = `1px solid ${PLColor}`
            e.target.nextSibling.innerHTML = ``
        }
    }
    
    onChangeSelect = async (v, id, e) => {
        e.style.border = `1px solid ${PLColor}`
        e.nextSibling.innerHTML = ''
        
        this.setState({values: {...this.state.values, [id]: v[id]}})

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

    /** Enviar el formulario */
    handleSubmit = async e => {
        e.preventDefault()
        const { error, values } = this.state

        /** verifica el formulario */
        const errorForm = validationForm(e.target.elements, error)

        /** comprueba el resultado */
        if (!errorForm) {
            /** peticion */
            this.setState({ loading: true })
            await this.props.getRegisterPartner(values)
            this.setState({ loading: false })

            /** resultado */
            const res = this.props.partners

            if (!!res.success) {
                this.setState({ values: {} })
                toastr.success(res.message)
                setTimeout(e => window.location.href = 'https://app.winby.co/login', 1000)
                return;
            } else
                return res.error ? toastr.warning('Ha ocurrido un problema, intente nuevamente mas tarde.') : toastr.warning(res.message)
        }
        return toastr.warning('Por favor revise los campos obligatorios.')
    }

    render() {
        return (
            <BusinessPartnersV 
                state={this.state} 
                onChangeInput={this.handleChangeInput}
                onChangeInputPhone={this.onChangeInputPhone}
                onChangeSelect={this.onChangeSelect}
                onSubmit={this.handleSubmit}
                onBlurConf={this.onBlurConf}
            />
        )
    }
}


const mapStateToProps = state => ({
    countries: state.countries,
    departments: state.departments,
    municipality: state.municipality,
    partners: state.partners
})

export default connect(mapStateToProps, {
    getAllCountries,
    getAllDepartments, 
    getAllMunicipality,
    getRegisterPartner
})(BusinessPartners)