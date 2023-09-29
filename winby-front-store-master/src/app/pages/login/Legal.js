import React, { Component } from 'react'
import { connect } from 'react-redux'

import LegalV from '../../components/login/Legal'

class Legal extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return <LegalV />
  }
}
export default Legal
