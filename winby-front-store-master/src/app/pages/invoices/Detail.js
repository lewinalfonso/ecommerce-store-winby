import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import toastr from 'toastr'
import { getOneInvoices, getConEpaInvoices } from '../../redux/actions/invoices'
import { getProfileUser } from '../../redux/actions/user'
import DetailV from '../../components/invoices/Detail'
import { getOneUserMoney } from '../../redux/actions/wallet'
import { url_base } from '../../redux/types'

class Detail extends Component {
    state = {
        i_sub: 0,
        i_delivery: 0,
        i_total: 0,
        infoPayment: {
            enabled: false
        },
        alertDialogShow: 0,
        paymentMode: '',
        loadingPay: false
    }

    async componentDidMount() {
        /** variables */
        this.isMount = true
        const i_id = this.props.match.params.id
        const u_id = localStorage.getItem('u_id')

        if (!i_id || !u_id) return this.props.history.push('/')

        /** peticion */
        this.setState({ loading: true })
        await this.props.getOneInvoices({ i_id })
        this.isMount && this.setState({ loading: false })
        this.interval = setInterval(async () => {
            if (new Date(JSON.parse(localStorage.getItem('infProfile'))?.usermember?.um_datExp) < new Date()) {
                window.location.reload()
            }
        }, 60000)

        /** respuesta */
        const res = this.props.invoices
        /** validación */
        if (res.successOne) {
            const currentDate = moment()
            const dateInvoice = moment(res.one.i_datCre)
            const dateInvoiceStart = dateInvoice.add(1, 'hour'), dateInvoiceEnd = moment(res.one.i_datExp)
            let infoPayment = {
                message: '',
                enabled: false
            }
            if (res.one.i_state === 6) {
                if (currentDate > dateInvoiceStart && currentDate < dateInvoiceEnd) infoPayment = { ...infoPayment, enabled: true, canPay: true, message: `Aún estás a tiempo de realizar tu compra. Realiza tu pago antes del ${dateInvoiceEnd.format('YY-DD-MM')}.` }
                else if (currentDate > dateInvoiceStart && currentDate > dateInvoiceEnd) infoPayment = { ...infoPayment, enabled: true, canPay: false, message: 'Esta compra ya no puede ser finalizada' }
                else if (currentDate < dateInvoiceStart) infoPayment = { ...infoPayment, enabled: true, canPay: false, message: `El pago de la compra no pudo ser procesado. Puedes volver a intentar el pago en ${dateInvoiceStart.diff(moment(), 'minutes')} minutos.` }
                else infoPayment = { ...infoPayment, enabled: false }
            }
            return this.setState({ ...res.one, infoPayment, u_id })
        }

        toastr.warning(res.messageOne)
        return this.props.history.push('/')
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handlePay = async () => {
        this.setState({ loadingPay: true })
        const { paymentMode, u_id, i_sub, i_delivery, i_id, i_taxCat } = this.state
        if (!u_id) return this.props.history.push('/user/login')

        if (paymentMode === 'mode_wallet') {
            await this.props.getOneUserMoney({ u_id, um_state: 1 })
            const resUM = this.props.usermoney
            if (resUM.success) {
                if (resUM.data?.um_money < (i_sub + i_delivery)) {
                    this.setState({ loadingPay: false, alertDialogShow: false })
                    return toastr.info('Saldo insuficiente en la billetera.')
                }
            } else {
                this.setState({ loadingPay: false, alertDialogShow: false })
                return toastr.warning(resUM.message)
            }

            await this.props.getConEpaInvoices({ i_wallet: true, x_cod_respuesta: 1, x_extra1: i_id, x_amount: (i_sub + i_delivery), u_id })
            const resConInvoices = this.props.invoices.payment
            if (resConInvoices.success) toastr.success('Compra exitosa.')
            else toastr.warning(resConInvoices.message)
            this.setState({ loadingPay: false })
            return this.props.history.push(`/compra/detalles/${i_id}`)
        } else if (paymentMode === 'mode_gateway') {
            const script = document.createElement('script'), div = document.getElementById('script');
            div.style.display = 'none'

            script.src = 'https://checkout.epayco.co/checkout.js';
            script.classList.add('epayco-button')
            script.setAttribute('data-epayco-key', '094b340f7f7cf430017ca40285dfa711')
            script.setAttribute('data-epayco-amount', `${Math.round(i_delivery + i_sub + i_taxCat)}`)
            script.setAttribute('data-epayco-tax', '0')
            script.setAttribute('data-epayco-tax-base', `${Math.round(i_delivery + i_sub + i_taxCat)}`)
            script.setAttribute('data-epayco-name', 'Compra Winby')
            script.setAttribute('data-epayco-description', 'Compra Winby')
            script.setAttribute('data-epayco-currency', 'cop')
            script.setAttribute('data-epayco-country', 'CO')
            script.setAttribute('data-epayco-test', 'false')
            script.setAttribute('data-epayco-external', 'true')
            script.setAttribute('data-epayco-extra1', i_id)
            script.setAttribute('data-epayco-response', `https://winby.co/compra/detalles/${i_id}/`)
            script.setAttribute('data-epayco-confirmation', `${url_base}invoices/epayco/confirm`)
            script.setAttribute('data-epayco-button', 'https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn1.png')
            div.appendChild(script);
            return setTimeout(() => document.getElementsByClassName('epayco-button-render')[0].click(), 1000)
        }
        this.handleModal('')
    }
    handleModal = async mode => this.setState({ alertDialogShow: !this.state.alertDialogShow, paymentMode: mode })

    render() {
        return (
            <DetailV
                state={this.state}
                handlePay={this.handlePay}
                handleModal={this.handleModal}
            />
        )
    }
}

export default connect(({ invoices, usermoney, users }) => ({ invoices, usermoney, users }), { getOneInvoices, getOneUserMoney, getConEpaInvoices, getProfileUser })(Detail)