import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { BGColor, PLColor } from '../../../../assets/colors'
import { IconDeleteText, IconSearch } from '../../../../assets/icons'
import Logo from '../../../../assets/logo.png'
import { InputText, Row, SearchContainer, ButtonSearch, IconContent, Img, ContainerImg } from './Styled'

export default ({ resetSearch, state, handleSearch, onChangeIput, handleMenuModal }) => {
    const history = useHistory()
    const location = useLocation()

    const reset = () => {
        if (location.pathname !== `/busqueda/${state.search}`) resetSearch()
    }

    useEffect(reset, [location.pathname])

    return (
        <Row>
            <SearchContainer active={state.menuActive === 3} state={state}>
                <InputText onBlur={() => handleMenuModal(3)} onClick={handleSearch} id='searchInput' type='text' placeholder='Buscar categoría, servicio o producto' onKeyUp={e => handleSearch(e, true)} onChange={onChangeIput} name='search' value={state.search} />
                <ButtonSearch onClick={() => state.search && history.push(`/busqueda/${state.search}`)} >
                    <IconSearch size='20px' color={PLColor} color2={BGColor} />
                </ButtonSearch>
                <ButtonSearch onClick={() => handleMenuModal(3)} responsive>
                    <IconDeleteText size='20px' />
                </ButtonSearch>
            </SearchContainer>
            <IconContent >
                <ContainerImg to='/' >
                    <Img src={Logo} />
                </ContainerImg >
            </IconContent>
        </Row>
    )
}