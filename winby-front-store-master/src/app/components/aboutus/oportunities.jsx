import React from 'react'
import Header from './layout/index'
import Footer from './layout/footer'
import Index from './oportunities/index'

export default ({ state, handleMenu }) => (<>
    <Header handleMenu={handleMenu} state={state} visible={state.visible} />
    <Index />
    <Footer />
</>
)