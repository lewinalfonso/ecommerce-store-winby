import React from 'react'
import { BGColor } from '../../../assets/colors'
import { IconCancel } from '../../../assets/icons'
import { ContainerModal, Content, Body, Header, ButtonClose } from './Styled'

export default ({ children, visible, title, onCloseModal, width }) => <ContainerModal visible={visible}>
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