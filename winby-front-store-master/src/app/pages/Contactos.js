import React, { Component } from 'react'
import ContactosV from '../components/Contactos/Contactos'

class Contactos extends Component {

    constructor(props){
        super(props)
    }

    onClick = (e, url) => {
        window.location.href = url
    }

    render() {
        return(
            <ContactosV
                onClick={this.onClick}
            />

        )
    }

}

export default Contactos;