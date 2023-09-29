import React from 'react'
import SectionL from './SectionL'
import SectionR from './SectionR'
import SectionS from './SectionS'
import { Header, HeaderContainer } from './Styled'
import Options from './Options'

export default ({ resetSearch, state, saveUserLocation, handleNotifications, closeSession, handleMenu, hanbleSubmenu, hanbleLocation, handleMap, onChangeInput, handleSearch, refL, handleLeafletMap, handleDragMarket, handelDrag, onChangeSelect, handleOption, handleSearchInput, onChangeSearch, handleMenuModal, onChangeIput, handleTooltip, handleTooltipOptions, handleTooltipStore, handleDelete, handleShow }) => <Header>
    <HeaderContainer>
        <SectionL saveUserLocation={saveUserLocation} handleMap={ handleMap } handelDrag={ handelDrag } refL={ refL } handleLeafletMap={ handleLeafletMap } handleDragMarket={ handleDragMarket } handleOption={ handleOption } onChangeSearch={ onChangeSearch } handleSearchInput={ handleSearchInput } handleMenuModal={ handleMenuModal } onChangeSelect={ onChangeSelect } onChangeInput={ onChangeInput } handleMenu={handleMenu} hanbleLocation={ hanbleLocation } state={state} />
        <div style={{ display: 'flex', flexDirection:'column', margin:'30px  15px 15px 15px' }}>
            <SectionS resetSearch={resetSearch} handleShow={handleShow} handleMenuModal={ handleMenuModal } state={state} handleSearch={handleSearch} onChangeIput={onChangeIput} />
            <Options handleTooltip={handleTooltip} state={state} hanbleSubmenu={ hanbleSubmenu } handleMenuModal={ handleMenuModal } />
        </div>
        <SectionR handleNotifications={handleNotifications} handleShow={handleShow} state={state} handleMenuModal={ handleMenuModal } closeSession={closeSession} handleMenu={handleMenu} handleTooltip={handleTooltip} handleTooltipOptions={handleTooltipOptions} handleTooltipStore={handleTooltipStore} handleDelete={handleDelete}/>
    </HeaderContainer>

</Header>