import React from 'react'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../../../assets/colors'
import { IconFacebook, IconInstagram, IconYoutube } from '../../../../assets/icons'
import { A } from '../../layout/header/Styled'

export default () => (
    <Footer>
        <FistFooter display={window.screen.width <= 760 ? 'none' : 'flex'} >
            <Li width='20%'>
                <A aling='center' borderRight={`2px solid ${BGColor}`} display='flex' justify='center' target='_blank' href='https://www.youtube.com/channel/UC8ZRFKBxzPXxuEKfgNJYLng' effect='true' color={BGColor} fontSize='20px' weight='bold'>Winby Oficial &nbsp;&nbsp; <IconYoutube size={window.screen.width <= 600 ? '16px' : '30px'} color2='#212121' color={BGColor}/></A>
            </Li>
            <Li width='20%'>
                <A aling='center' borderRight={`2px solid ${BGColor}`} display='flex' justify='center' target='_blank' href='https://www.instagram.com/winby.oficial/' effect='true' color={BGColor} fontSize='20px' weight='bold'>winby.oficial &nbsp;&nbsp;  <IconInstagram size={window.screen.width <= 600 ? '16px' : '30px'} color={BGColor}/></A>
            </Li>
            <Li width='20%'>
                <A aling='center' display='flex' justify='center' target='_blank' href='https://www.facebook.com/Winbyoficial' effect='true' color={BGColor} fontSize='20px' weight='bold'>@Winby.Oficial &nbsp;&nbsp; <IconFacebook size={window.screen.width <= 600 ? '16px' : '30px'} color={BGColor}/></A>
            </Li>
            <Li width='100%'>
                <A aling='center' display='flex' justify='center'target='_blank'  href='https://winby.co/' effect='true' color={BGColor} fontSize='20px' margin='10px' weight='bold'>www.winby.co</A>
            </Li>
        </FistFooter>
        <Route display={window.screen.width <= 760 ? 'flex' : 'none'}>
            <Li width='60%' >
                <A fontFamily='PFont-Bold' href='https://www.facebook.com/Winbyoficial' target='_blank' effect='true' color={BGColor} fontSize='15px'>www.winby.co</A>
            </Li>
            <Li flex='row'>
                <A margin='10px' href='https://www.youtube.com/channel/UC8ZRFKBxzPXxuEKfgNJYLng' target='_blank'><IconYoutube size={window.screen.width <= 600 ? '16px' : '30px'} color2='#212121' color={BGColor}/></A>
                <A margin='10px' href='https://www.instagram.com/winby.oficial/' target='_blank'><IconInstagram size={window.screen.width <= 600 ? '16px' : '30px'} color={BGColor}/></A>
                <A margin='10px' href='https://www.facebook.com/Winbyoficial' target='_blank'><IconFacebook size={window.screen.width <= 600 ? '16px' : '30px'} color={BGColor}/></A>
            </Li>
        </Route>
    </Footer>
)

const Footer = styled.footer`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 120px;
    background-color: #212121;
    align-items: center;
    @media (max-width: 640px){
        height: 50px;
    }
`
const Li = styled.li`    
    ${({ width }) => width && css`width: ${width};`};
    list-style: none;
    text-align: center;
    font-family: PFont-Bold;
    flex-flow: ${({ flex }) => flex || 'column'};
`
const Route = styled.div`    
    ${({ display }) => display && css`display: ${display};`};
    border-left: '1px solid ${PColor}';
    width: 100%;
    list-style: none;
    text-align: center;
    justify-items: center;
    justify-content: center;
`
const FistFooter = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width:100%;
    height: auto;
    background-color: #212121;
    align-items: center;
    justify-content: center;
    ${({ display }) => display && css`display: ${display};`};
`