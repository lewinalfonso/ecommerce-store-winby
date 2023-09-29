import React, { useContext, useState } from 'react'
import { IconTruck, IconWalletFill, IconEntity, IconPlusBackground } from '../../../../assets/icons'
import { ShadowCard } from '../../../common/ShadowCard'
import { CardItem } from './CardItem'
import { ListCard } from './styles'
import { Modal } from '../Modal'
import { Context } from '../../../common/modal/ContextModal'

export const BannerPayMethods = () => {
    const { isModal, setIsModal } = useContext(Context)
    const [colorIconTruck, setColorIconTruck] = useState('#2a2a2a')
    const [colorIconWalletFill, setColorIconWalletFill] = useState('#2a2a2a')
    const [colorIconEntity, setColorIconEntity] = useState('#2a2a2a')
    const [colorIconPlusBackground, setColorIconPlusBackground] = useState('#2a2a2a')
    return (
        <>
            <Modal isModal={isModal} setIsModal={setIsModal} />
            <ShadowCard>
                <ListCard>
                    <CardItem onMouseOut={() => setColorIconTruck('#2a2a2a')} onMouseOver={() => setColorIconTruck('#04AA04')} onClick={setIsModal} icon={<IconTruck size={window.screen.width < 768 ? '38px' : '50px'} color={colorIconTruck} />} color={colorIconTruck} title='Envío gratis' />
                    <CardItem onMouseOut={() => setColorIconWalletFill('#2a2a2a')} onMouseOver={() => setColorIconWalletFill('#C20202')} onClick={setIsModal} icon={<IconWalletFill size='50px' color={colorIconWalletFill} />} color={colorIconWalletFill} title='Billetera Winby' />
                    <CardItem onMouseOut={() => setColorIconEntity('#2a2a2a')} onMouseOver={() => setColorIconEntity('#068CF3')} onClick={setIsModal} icon={<IconEntity size='50px' color={colorIconEntity} bgColor='#e4e4e4' />} color={colorIconEntity} title='Transferencia desde tu banco' />
                    <CardItem onMouseOut={() => setColorIconPlusBackground('#2a2a2a')} onMouseOver={() => setColorIconPlusBackground('#068CF3')} onClick={setIsModal} icon={<IconPlusBackground size='50px' color={colorIconPlusBackground} bgColor='#e4e4e4' />} color={colorIconPlusBackground} title='Más medios de pago' />
                </ListCard>
            </ShadowCard>
        </>
    )
}