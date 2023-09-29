import React, { Component } from 'react'
import RegisterOrLoginV from '../../components/login/RegisterOrLogin'

class RegisterOrLogin extends Component {
    state = {

    }
    componentDidMount(){
        const code = this.props.location.state?.urlCode
        let infoProfile = localStorage.getItem('infProfile')
        if (infoProfile) {
            infoProfile = JSON.parse(infoProfile)
            if (infoProfile?.vendor) window.location.href = 'https://app.winby.co'
        }
        this.setState({ code })
    }
    render() {
        return (
            <RegisterOrLoginV
                state={this.state}
            />
        )
    }
}

export default RegisterOrLogin;