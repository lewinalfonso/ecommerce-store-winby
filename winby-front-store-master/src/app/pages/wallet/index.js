import React, { Component } from 'react'
import WalletV from '../../components/wallet'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getInfoWallet, getAllBanUser, getRegBanUser, getDelBanUser, getWitMonUser } from '../../redux/actions/user'
import { getAllInvoices } from '../../redux/actions/invoices'
import { getOneUserMoney, getAllMoneyReport } from '../../redux/actions/wallet'
import { getAllTypBan, getAllAccTyp, getAllTypCryp } from '../../redux/actions/utilities'
import toastr from 'toastr'
import { extFile, validationFormTwo, validationsSelectTwo, validationsTwo } from '../../utils'

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valuesForm: {}, error: {},
            userprofile: {},
            moneyG: 0,
            moneyR: 0,
            um_money: 0,
            hidden: 0,
            showEmail: 0
        }
        this.isMount = true
    }

    async componentDidMount() {
        const u_id = localStorage.getItem('u_id')

        if (!u_id) {
            toastr.info('Es necesario registrarse para poder hacer una compra.')
            return this.props.history.push('/user/registro', { cart: true })
        }

        /** Peticiones para listado compras */
        await this.props.getAllInvoices({ u_id })
        const resInvoices = this.props.invoices

        if (this.isMount && !!resInvoices.success) this.setState({ invoices: resInvoices.data })
        /** peticion */
        // await this.props.getOneUserMoney({ u_id, um_state: 1 })

        await this.props.getInfoWallet(u_id)
        /** resultado */
        const res = this.props.users

        if (this.isMount && !!res.success) {
            let moneyG = 0, moneyR = 0
            if (res.dataMR?.length) {
                res.dataMR.forEach(x => {
                    if (x.mr_retire) moneyR += x.mr_money
                    else moneyG += x.mr_money
                })
            }
            this.setState({ um_money: res.data?.um_money, moneyG, moneyR, u_id })
        }
    }

    /** si se desmonta el componente antes de las peticiones */
    componentWillUnmount() {
        this.isMount = false
    }

    /** cambio de los input */
    handleChangeInput = (e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail, isFormat) => {
        /** variables necesaria */
        const { name, value } = e.target, error = validationsTwo(e, isNull, isLetters, isNumeric, range, minRange, maxRange, isEmail, isFormat)
        /** actualizando estado */
        this.setState({ valuesForm: { ...this.state.valuesForm, [name]: isFormat ? value.replace(/\./g, '') : value }, error: { ...this.state.error, [name]: error } })
    }

    /** cambio de los select */
    onChangeSelect = async (v, name) => {
        validationsSelectTwo(v)
        this.setState({ valuesForm: { ...this.state.valuesForm, [name]: v[name] } })
    }

    /** cargar fotos para el servicio */
    onChangeFile = e => {
        const { files, name } = e.target
        if (files?.length) this.setState({ valuesForm: { ...this.state.valuesForm, [name]: files[0] } })
    }

    onSubmit = async (e, type) => {
        e.preventDefault()
        const { error, valuesForm } = this.state, errorForm = validationFormTwo(e.target.elements, error)
        const u_id = localStorage.getItem('u_id')

        /** comprueba el resultado */
        if (type === 1) {
            if (!errorForm) {
                if (valuesForm.ube_type === 1 && !valuesForm.ube_cerBank) return toastr.warning('Es necesario cargar el certificado bancario.')

                /** armar form data */
                const data = new FormData()
                data.append('u_id', u_id)
                valuesForm.ube_id && data.append('ube_id', valuesForm.ube_id)
                data.append('ube_type', valuesForm.ube_type)
                data.append('ube_alias', valuesForm.ube_alias)
                if (valuesForm.ube_type === 1) {
                    data.append('tb_id', valuesForm.tb_id)
                    data.append('at_id', valuesForm.at_id)
                    data.append('ube_accNum', valuesForm.ube_accNum)
                    data.append('file', valuesForm.ube_cerBank, `${ new Date().getTime() }.${ extFile(valuesForm.ube_cerBank?.name) }`)
                } else {
                    data.append('tc_id', valuesForm.tc_id)
                    data.append('ube_hash', valuesForm.ube_hash)
                }
                /** peticion */
                this.setState({ loading: true })
                /** formato para guardar imagen */
                await this.props.getRegBanUser(data)
                this.setState({ loading: false })

                /** resultado */
                const res = this.props.userbanks

                if (res.successPost) {
                    this.setState({ valuesForm: { ube_type: 1 }, visible: 0, error: {} })
                    return toastr.success(res.messagePost)
                } else return toastr.warning(res.messagePost)
            }
            return toastr.warning('Por favor revise los campos obligatorios.')
        } else {
            if (!errorForm) {
                this.setState({ loading: true })
                await this.props.getWitMonUser({ ...valuesForm, u_id })
                this.setState({ loading: false })

                /** resultado */
                const res = this.props.users
                if (res.successPost) {
                    this.setState({ valuesForm: { mr_type: 1 }, visible: 0, error: {} })
                    return toastr.success(res.messagePost)
                } else return toastr.warning(res.messagePost)
            }
            return toastr.warning('Por favor revise los campos obligatorios.')
        }
    }

    /**
     * @description carga la información segun para el modal requerido
     * @version 0.0.1
     * @param {number} type tipo de modal
     * @return {null} no hay retorno
    */
    onClickModal = async type => {
        this.setState({ valuesForm: { ube_type: 1, mr_type: 1 }, visible: type, visibleRegister: 0 })
        const u_id = localStorage.getItem('u_id')
        if (type === 1) {
            let banUser = true, typBan = true, accTyp = true, typCry = true

            /** verifica si se hizo la peticion de buscar bancos generales */
            if (!this.props.userbanks?.data?.length) {
                this.setState({ loading: true })
                await this.props.getAllBanUser({ u_id, ube_state: 1 })
                banUser = false
            }

            /** verifica si se hizo la peticion de buscar bancos generales */
            if (!this.props.banks?.data?.length) {
                this.setState({ loading: true })
                await this.props.getAllTypBan(1)
                typBan = false
            }
            /** verifica si se hizo al peticion de tipo de documentos */
            if (!this.props.accounts?.data?.length) {
                this.setState({ loading: true })
                await this.props.getAllAccTyp(1)
                accTyp = false
            }
            /** verifica si se hizo al peticion de tipo de documentos */
            if (!this.props.cryptocurrencies?.data?.length) {
                this.setState({ loading: true })
                await this.props.getAllTypCryp(1)
                typCry = false
            }
            /** verifica si se hicieron la peticiones o no  */
            banUser && await this.props.getAllBanUser({ u_id, ube_state: 1 })
            typBan && await this.props.getAllTypBan(1)
            accTyp && await this.props.getAllAccTyp(1)
            typCry && await this.props.getAllTypCryp(1)
            this.setState({ loading: false })
        } else if (type === 2) {
            let banUser = true
            /** verifica si se hizo la peticion de buscar bancos generales */
            if (!this.props.userbanks?.data?.length) {
                this.setState({ loading: true })
                await this.props.getAllBanUser({ u_id, ube_state: 1 })
                banUser = false
            }
            banUser && await this.props.getAllBanUser({ u_id, ube_state: 1 })
            this.setState({ loading: false })
        } else if (type === 3) {
            await this.props.getAllMoneyReport({ u_id, mr_retire: true })
        }
    }

    /**
     * @description opciones de la lista de tipos de cuenta
     * @version 0.0.1
     * @param {object} item valor del objecto al modificar
     * @param {number} type tipo de modal
     * @return {null} no hay retorno
    */
    handleOption = async (item, type) => {
        if (type) {
            this.setState({
                visibleRegister: 1,
                valuesForm: {
                    ube_id: item.ube_id,
                    ube_hash: item.ube_hash,
                    ube_type: item.ube_type,
                    ube_cerBank: item.ube_cerBank,
                    ube_alias: item.ube_alias,
                    ube_accNum: item.ube_accNum,
                    tc_id: item.typecryptocurrency?.tc_id,
                    tb_id: item.typebank?.tb_id,
                    at_id: item.accounttype?.at_id
                }
            })
        } else {
            await this.props.getDelBanUser({ ube_id: item.ube_id })
            this.props.userbanks?.successPost ? toastr.success(this.props.userbanks?.messagePost) : toastr.warning(this.props.userbanks?.messagePost)
        }
    }

    render() {
        return (
            <WalletV
                state={this.state}
                onChangeInput={this.handleChangeInput}
                onChangeSelect={this.onChangeSelect}
                onChangeFile={this.onChangeFile}
                onSubmit={this.onSubmit}
                onClickModal={this.onClickModal}
                handleOption={this.handleOption}
                handleChange={type => this.setState({ visibleRegister: type, valuesForm: { ube_type: 1 } })}
            />
        )
    }
}

const mapStateToProps = state => ({
    users: state.users,
    bank: state.banks,
    accounts: state.accounts,
    cryptocurrencies: state.cryptocurrencies,
    userbanks: state.userbanks,
    usermoney: state.usermoney,
    moneyreport: state.moneyreport,
    invoices: state.invoices
})

export default withRouter(connect(mapStateToProps, {
    getAllInvoices, getInfoWallet, getAllTypBan, getAllAccTyp, getAllTypCryp, getAllBanUser, getRegBanUser, getDelBanUser, getWitMonUser, getOneUserMoney, getAllMoneyReport
})(Wallet))