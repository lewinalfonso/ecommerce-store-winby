import React, { Component } from 'react'
import { connect } from 'react-redux'
import OportunitiesV from '../../components/aboutus/oportunities'

class Oportunities extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
        }
        this.isMount = false
    }

    async componentDidMount() {
        /** Declarando Variables */
        this.isMount = true
        const codeStorage = localStorage.getItem('code')
        const code = this.props.match.params.code || (codeStorage || 'Winby')
        this.setState({ code })
        /** Quitando el loading */
        if(code) localStorage.setItem('code', JSON.stringify(code))
        this.isMount && this.setState({ loading: false })
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <OportunitiesV
                state={this.state}
                handleMenu={ type => this.setState({ visible: type === this.state.visible ? 0 : type }) }
                handleDelete={this.handleDelete} />
        )
    }
}

const mapStateToProps = ({ services }) => ({ services })

export default connect(mapStateToProps, null)(Oportunities)