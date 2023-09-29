import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConfirmacionV from '../../components/vendors/RegisterV/Confirmacion'

class Confirmacion extends Component {
    state = {
        timer: 5
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 })
            if (this.state.timer === 0) {
                clearInterval(this.timer)
                this.props.history.push('/')
            }
        }, 1000)
    }

    componentWillMount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <ConfirmacionV
                state={this.state}
            />
        )
    }
}

const mapStateToProps = ({ vendors }) => ({ vendors })
export default connect(mapStateToProps, {})(Confirmacion)