import React, { Component } from 'react'
import HelpPqrV from '../../components/ayudapqr'
import { MyContext } from '../../components/layout'
import { getAllPqr } from '../../redux/actions/ayuda-pqr'
import toastr from 'toastr'
import { connect } from 'react-redux'
class HelpPqr extends Component {
    static contextType = MyContext
    constructor (props) {
        super(props)
        this.state = {
            data: [],
            dataProfile: {}
        }
    }

    async componentDidMount () {
        /** variables necesarias */
        let dataProfile = {}
        try {
            dataProfile = JSON.parse(localStorage.getItem('infProfile'))
            this.setState({ dataProfile: dataProfile.userprofile })
        } catch (error) {
            dataProfile = {}
        }
        await this.props.getAllPqr()
        const res = this.props.pqr.all
        if (res.success) {
            this.setState({ data: res.data }) 
        } else return toastr.warning(res.message)

    }


    handleClick = () => {

    }

    render () {
        return (
            <HelpPqrV
                state={this.state}

            />
        )
    }
}

export default connect(({ pqr }) => ({ pqr }), { getAllPqr })(HelpPqr);