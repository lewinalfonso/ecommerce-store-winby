import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { CustomButton } from './Buttons'

class SmoothScroll extends Component {

    constructor(props) {
        super(props)
        const { to, behavior, path } = this.props
        this.state = { to, behavior, path }
    }


    handleClick = () => {
        const { to, behavior, path } = this.state
        const code = localStorage.getItem('code') || 'Winby'
        if (this.props.history.location.pathname?.includes(path)) {
            
            if (to) {
                const el = document.getElementById(to)
                if (el) window.scroll({ top: el?.getBoundingClientRect()?.top || 0, left: 0, behavior: behavior || 'smooth' })
                else this.props.history.push(`${path}/${code ? JSON.parse(code) : ''}`)
            } else throw new Error('SmootScroll prop [to] is undefined')
        } else return this.props.history.push(`${path}/${code ? JSON.parse(code) : ''}`)
    }

    render() {
        const { text, color, icon } = this.props
        return (
            <CustomButton  onClick={this.handleClick} bgColor="transparent" fontSize="14px" color={color} padding="5px 10px" width="100%">{ text } &nbsp;&nbsp;  {icon}</CustomButton>
        )
    }
}

export default withRouter(SmoothScroll)