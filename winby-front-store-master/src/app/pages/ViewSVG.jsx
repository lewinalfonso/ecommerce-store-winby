import React, { Component } from 'react'
import ViewSVGV from '../components/ViewSVG'

class ViewSVG extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        console.log('hola')
    }

    render() {
        return (
            <ViewSVGV
            />
        )
    }
}

export default ViewSVG