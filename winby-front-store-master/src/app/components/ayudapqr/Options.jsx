import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MenuLeft, OptionMenu, Span, Row } from './Styled'

const Options = ({ children, label, path, Img, icon }) => {

    const [active, setActive] = useState(false)
    const [height, setHeight] = useState(0)
    const [heightMenu, setHeightMenu] = useState(0)
    const refButton = useRef()
    const refMenu = useRef()
    const location = useLocation()

    useEffect(() => {
        setHeight(refButton.current.clientHeight - refMenu.current.clientHeight)
        setHeightMenu(refMenu.current.clientHeight)
        !!location.pathname.includes(path) && setActive(true)
    }, [location.pathname, path])

    const handleClick = e => {
        e.preventDefault()
        setActive(!active)
        setHeight(!active ? (height + heightMenu) : refButton.current.clientHeight - refMenu.current.clientHeight)
    }

    return (
        <MenuLeft type='button' onClick={handleClick} active={active} Img={Img} ref={refButton} height={height}>
            <Row active={active}>
                {icon}
                <Span>{label}</Span>
            </Row>
            <OptionMenu onClick={(e) => e.stopPropagation() } active={active} ref={refMenu}>
                {children}
            </OptionMenu>
        </MenuLeft>
    )
}

export default Options