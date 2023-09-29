import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from './header'
import Footer from './Footer'
import 'toastr/build/toastr.css'
import MenuCategories from '../home/MenuCategories'
import { BGSColor } from '../../../assets/colors'
import { Context } from '../../common/modal/ContextModal'
import { useLocation } from 'react-router-dom'
export const MyContext = React.createContext()

const Layout = ({ resetSearch, updateDataProfile, children, state, handleNotifications, hanbleSubmenu, onChangeInput, handleMap, saveUserLocation, hanbleLocation, handelDrag, handleMenuModal, refL, handleOption, handleDragMarket, handleLeafletMap, handleShow, handleLogin, closeSession, onChangeSearch, countShoppingCart, handleSearchInput, onChangeSelect, handleSearch, onChangeIput, updateCode, handleTooltip, handleTooltipOptions, handleTooltipStore, handleDelete }) => {

    const { isModal } = useContext(Context)
    const [activeMenu, setActiveMenu] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setActiveMenu(false)
    }, [location])

    return (<Main>
        {/** Menu movil */}
        {window.screen.width <= 768 ? <MenuCategories closeSession={closeSession} state={state} active={activeMenu} onCloseMenu={() => setActiveMenu(false)} /> : ''}
        {/** Menu movil */}
        <Header
            handleNotifications={handleNotifications}
            saveUserLocation={saveUserLocation}
            state={state}
            handleOption={handleOption}
            handelDrag={handelDrag}
            refL={refL}
            handleDragMarket={handleDragMarket}
            handleLeafletMap={handleLeafletMap}
            handleSearchInput={handleSearchInput}
            onChangeSearch={onChangeSearch}
            handleMenuModal={handleMenuModal}
            handleMap={handleMap}
            onChangeInput={onChangeInput}
            onChangeSelect={onChangeSelect}
            hanbleLocation={hanbleLocation}
            handleShow={handleShow}
            closeSession={closeSession}
            handleMenu={() => setActiveMenu(!activeMenu)}
            hanbleSubmenu={hanbleSubmenu}
            handleSearch={handleSearch}
            onChangeIput={onChangeIput}
            handleTooltip={handleTooltip}
            handleTooltipOptions={handleTooltipOptions}
            handleTooltipStore={handleTooltipStore}
            handleDelete={handleDelete}
            resetSearch={resetSearch}
        />
        <Body isModal={isModal}>
            <MyContext.Provider value={{ handleLogin, countShoppingCart, updateCode, dataProfile: state.dataProfile, updateDataProfile }}>
                {children}
            </MyContext.Provider>
        </Body>
        <Footer />
    </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${BGSColor};
    margin-top: 100px;
    min-height: 70vh;

    @media(max-width: 1025px){
        margin-top: 50px;
    }
`
export default Layout