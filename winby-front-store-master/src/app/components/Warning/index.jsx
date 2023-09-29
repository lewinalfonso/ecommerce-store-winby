import React from 'react'
import { SFColor } from '../../../assets/colors'
import { IconCancel, IconLoading } from '../../../assets/icons'
import { ContainerModal, Content, Header, Body, Footer, Span, Button, IconButton } from './styled'

export const Warning = ({ visible, title, message, textConfirm, textCancel, loading, handleConfirm, handleCancel, messageCenter }) => (
    <ContainerModal visible={visible}>
        <Content>
            <Header>
                <Span>{title}</Span>
                <IconButton onClick={handleCancel}>
                    <IconCancel style={{ pointerEvent: 'none' }} size='13px' color={SFColor} />
                </IconButton>
            </Header>
            <Body messageCenter={messageCenter}>
                <Span family='PFont-Regular' size='12px'>{message}</Span>
            </Body>
            <Footer>
                <Button onClick={handleConfirm} bgColor='#4B9E0B'>{loading ? <><IconLoading color='#fff' height='10px' width='40px' /> Espere</> : `${ textConfirm || 'Si' }`}</Button>
                <Button onClick={handleCancel}>{textCancel || 'No'}</Button>
            </Footer>
        </Content>
    </ContainerModal>
)