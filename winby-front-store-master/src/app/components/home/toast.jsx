import React, { useState } from 'react'
import { IconCancel } from '../../../assets/icons'
import { BGSColor, BGColor } from '../../../assets/colors'
import { ContainerModal, Content, ButtonClose } from './Styled'

export default ({ handleModalSeeMore, visible }) =>{
    const [modal, setModal] = useState(undefined)

    return (<ContainerModal visible={visible} onClick={handleModalSeeMore}>
        <Content width={window.screen.width <= 1080 ? '100%' : '40%'} bgColor={window.screen.width <= 768 ? BGSColor : BGColor }>
            <ButtonClose type='button' onClick={() => handleModalSeeMore()}><IconCancel size="20px" color='black' /></ButtonClose>
            <h1>HOla mundo</h1>
        </Content>
    </ContainerModal>
    )
}