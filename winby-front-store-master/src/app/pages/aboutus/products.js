import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductsV from '../../components/aboutus/products'

class Products extends Component {
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

    // handleScroll = e => {
    //     if (window.scrollY > (this.references.sec3.current.offsetTop - this.references.sec2.current.offsetHeight))
    //         !this.state.sec3 && this.setState({ sec3: true })
    // }

    render() {
        return (
            <ProductsV state={this.state}
                handleDelete={this.handleDelete}
                handleMenu={ type => this.setState({ visible: type === this.state.visible ? 0 : type }) }
            />
        )
    }Products
}

const mapStateToProps = ({ services }) => ({ services })

export default connect(mapStateToProps, { })(Products)