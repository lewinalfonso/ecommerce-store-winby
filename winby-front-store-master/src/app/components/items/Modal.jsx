import React from 'react'
import { ContainerModal, Content, Body, Header, ButtonClose, H3 } from './Styled'
import { IconCancel } from '../../../assets/icons'

export default ({ visible, children, title, onCloseModal, width, headerColored, position, responsive }) => {
    return (
        <ContainerModal position={position} visible={visible}>
            <Content responsive={responsive} marginBottom='60px' width={width}>
                <Header borderBottom='1px solid #333' headerColored={headerColored}>
                    <H3 style={{ margin: '0' }}>{title}</H3>
                    <ButtonClose onClick={onCloseModal}><IconCancel size="20px" /></ButtonClose>
                </Header>
                <Body>
                    {children}
                </Body>

            </Content>
        </ContainerModal>
    )
}