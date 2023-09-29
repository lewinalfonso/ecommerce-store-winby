import React from 'react'
import { BGColor } from '../../../assets/colors'
import { IconCancel } from '../../../assets/icons'
import { ContainerModal, Content, Body, Header, ButtonClose } from './Styled'

export default ({ children, state, title, onCloseModal, width }) => <ContainerModal visible={state.visible}>
    <Content width={width}>
        <Header>
            <ButtonClose type='button' onClick={onCloseModal}><IconCancel size="20px" color={BGColor} /></ButtonClose>
            {title}
        </Header>
        <Body>
            {children}
        </Body>

    </Content>
</ContainerModal>