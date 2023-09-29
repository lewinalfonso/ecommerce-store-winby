import React, { Component } from 'react'
import CounterV from '../components/counter'
import moment from 'moment'
import { validationPhoneTwo, validations } from '../utils/index'

class Counter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: {
                u_phone: '+57 ',
            },
            countDown: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                now2: 0,
            },
        }
    }

    async componentDidMount() {

        // this.interval = setInterval(() => {
        //     const then = moment('2020-11-17'), now = moment()
        //     const countdown = moment(then - now)
        //     const hours = countdown.format('HH'), minutes = countdown.format('mm'), seconds = countdown.format('ss')
        //     const days = countdown.format('D')
        //     const year = countdown.format('YYYY')
        //     const now2 = moment()
        //     this.setState({ countDown: { days: 0, hours: parseInt(hours) > 9 ? 0 : hours, minutes, seconds, now2 } })
        // }, 1000)
    }

    componentWillMount() {
        this.interval && clearInterval(this.interval)
    }

    onChangeInput = (e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat) => {
        validations(e, typeNull, typeLetters, typeNumeric, typeRange, minRange, maxRange, typeEmail, typeFormat)
        this.setState({ values: { ...this.state.values, [e.target.name]: e.target.value } })
    }



    render() {
        return (
            <CounterV
                state={this.state}
                onChangeInput={this.onChangeInput}
                onChangeInputPhone={this.onChangeInputPhone}
                countDown={this.state.countDown}
                onChangeInputPhone={(v, e, typeNull, typeNumeric) => !!e.target && this.setState({ values: { ...this.state.values, [e.target.name]: v }, error: { ...this.state.error, [e.target.name]: validationPhoneTwo(v, e, typeNull, typeNumeric) } })}
            />
        )
    }
}

export default Counter