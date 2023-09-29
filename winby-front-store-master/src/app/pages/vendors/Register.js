import React, { Component } from 'react'
import toastr from 'toastr'
import { connect } from 'react-redux'
import { getAllTypIde } from '../../redux/actions/utilities'
import { getProfileUser } from '../../redux/actions/user'
import { getRegisterPartner, getRegisterPartnerDocuments } from '../../redux/actions/partners'
import RegisterV from '../../components/vendors/RegisterV'
import { Match, validationFormTwo, validationPhoneTwo, validationsTwo, validationImg, CalcularDigitoVerificacion, validationsSelectTwo, extFile } from '../../utils'
import { MyContext } from '../../components/layout'

class Register extends Component {
    static contextType = MyContext
    state = {
        sizeFiles: 0,
        columns: 2,
        form: 1,
        values: {
            code: JSON.parse(localStorage.getItem('code')),
            u_phoNum: '+57 ',
            vl_phone: '+57 '
        }, error: {}, disabled: {},
        typePersons: [{ tp_id: 1, tp_name: 'Natural' }, { tp_id: 2, tp_name: 'Jurídica' }],
        arrayDocuments: [],
        documents: []
    }
    isMount = true

    async componentDidMount() {
        /** verifica si hay usuario iniciado */
        const u_id = localStorage.getItem('u_id')
        const code = this.props.match.params?.code
        if (code) this.context.updateCode(code)
        if (u_id) {
            const data = JSON.parse(localStorage.getItem('infProfile'))

            if (data?.vendor) this.props.history.push('/')
            /** actualiza la información con la del usuario */
            this.isMount && this.setState({
                values: { ...this.state.values, u_id, u_email: data.u_email, u_phoNum: data.u_phoNum },
                disabled: { u_email: data.u_email, u_phoNum: data.u_phoNum }
            })
        }

        await this.props.getAllTypIde(1)
        if (this.props.identitys.success && this.isMount) this.setState({ dataTI: this.props.identitys.data })

    }

    componentWillUnmount() {
        this.isMount = false
    }

    onBlurInput = type => {
        const { values } = this.state
        if (type === 1 && !!values.u_pass && !!values.u_conPass) {
            /** verifica si las contraseñan coinciden */
            const compare = !!Match(values.u_pass, values.u_conPass)
            if (compare) toastr.warning('Las contraseñas no coinciden')
            this.setState({ compare })
        } else if (type === 2) this.setState({ values: { ...values, v_dv: CalcularDigitoVerificacion(values.v_nit) } })
    }

    onChangeFile = (e, type) => {
        const { files } = e.target, { sizeFiles } = this.state
        if (files[0]) {
            if (type === 1 && (sizeFiles + files[0].size) <= 10240000 && validationImg(files[0])){
                this.setState({ sizeFiles: (sizeFiles + files[0].size), v_logo: files[0], v_logoUri: URL.createObjectURL(files[0]), columns: 1 })
            }
            //  else {
            //     const arrayDocuments = this.state.arrayDocuments
            //     let docs = this.state.documents
            //     for (let i = 0; i < files.length; i++) {
            //         const x = files[i];
            //         docs = [...docs, files[i]]
            //         arrayDocuments.push({ id: (Math.random() * 1000), name: x.name })
            //     }
            //     const doc = [...this.state.documents ]
            //     this.setState({ arrayDocuments, documents: doc, columns: 1 })
            // }
        }

    }

    /** cargar fotos para el producto */    /** cargar fotos para el producto */
    onChangeFiletwo = e => {
        const { files } = e.target
        let { sizeFiles, arrayDocuments } = this.state, limit = false
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                const x = files[i];
                if ((sizeFiles + x.size) <= 10240000) {
                    sizeFiles += x.size
                    const reader = new FileReader()
                    reader.readAsDataURL(x)
                    arrayDocuments.push({ id: (Math.random() * 1000), name: x.name })
                    reader.onloadend = () => this.setState(state => ({ arrayDocuments, documents: [...state.documents, { file: x, uri: reader.result }] }))
                } else limit = true
            }
        }
        if (limit) toastr.warning('Ha superado el limite permitido de 10MB.')
        this.setState({ sizeFiles })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { error, values, compare, form, v_logo, documents } = this.state, errorForm = validationFormTwo(e.target.elements, error)
        if (errorForm) return toastr.warning('Por favor revise los campos que esten correctos.')
        if (form === 1) {
            if (compare) return toastr.warning('La contraseña no coinciden.')
            if (!v_logo) return toastr.warning('Es necesario cargar el logo del comercio.')
            this.setState({ form: 2 })
        } else {
            if (!documents?.length) return toastr.warning('Cargar los documentos solicitados al representante legal.')
            /** peticion */
            this.setState({ loading: true })
            await this.props.getRegisterPartner(values)
            this.setState({ loading: false })

            /** resultado */
            const res = this.props.partners
            if (res.success) {
                this.setState({ loading: true })
                const data = new FormData()
                data.append('v_id', res.v_id);
                data.append('vl_id', res.vl_id);
                data.append('files', v_logo, v_logo.name);
                for (let i = 0; i < documents.length; i++) {
                    const nameFile = `${ new Date().getTime() }${ i }.${ extFile(documents[i].file.name) }`
                    data.append('files', documents[i].file, nameFile);
                }
                await this.props.getRegisterPartnerDocuments(data)
                // await this.props.getProfileUser({ u_id: values.u_id })
                // localStorage.setItem('infProfile', JSON.stringify(this.props.users.data))
                this.setState({ loading: false })
                toastr.success(res.message)
                setTimeout(() => window.location.href = 'http://localhost:3000/vendors/confirmacion', 1000)
            } else return toastr.warning(res.message)
        }
    }

    render() {
        return (
            <RegisterV
                state={this.state}
                onChangeSelect={(v, id) => this.setState({ values: { ...this.state.values, [id]: v[id] } }, () => validationsSelectTwo(id))}
                onChangeInput={(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail, isFormat) => this.setState({ values: { ...this.state.values, [e.target.name]: isFormat ? e.target.value.replace(/\./g, '') : e.target.value }, error: { ...this.state.error, [e.target.name]: validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail, isFormat) } })}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
                onBlurInput={this.onBlurInput}
                onChangeFile={this.onChangeFile}
                onChangeFiletwo={this.onChangeFiletwo}
                handleClickNew={() => this.setState({ form: 1 })}
                onDel={(e, index) => this.setState(ps => ({ arrayDocuments: ps.arrayDocuments.filter((x, i) => i !== index) }))}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default connect(({ identitys, partners, users }) => ({ identitys, partners, users }), { getAllTypIde, getRegisterPartner, getRegisterPartnerDocuments, getProfileUser })(Register)