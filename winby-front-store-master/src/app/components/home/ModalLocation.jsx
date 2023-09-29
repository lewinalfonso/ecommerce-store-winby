import React from 'react'
import { IconCancel } from '../../../assets/icons'
import { BGSColor, BGColor } from '../../../assets/colors'

import { ContainerModal, Content, Box, ButtonClose } from './Styled'

export default ({ handleModalSeeMore, visible }) => <ContainerModal visible={visible} onClick={handleModalSeeMore}>
    <Content width={window.screen.width <= 1080 ? '100%' : window.screen.width <=1440 ? '41%' : '40%'} bgColor={window.screen.width <= 768 ? BGSColor : BGColor }>

        <ButtonClose type='button' onClick={() => handleModalSeeMore()}><IconCancel size="20px" color='black' /></ButtonClose>
        <Box height={window.screen.width <= 768 ? 'auto' : 'auto'} padding='0'>
        </Box>
    </Content>
</ContainerModal>