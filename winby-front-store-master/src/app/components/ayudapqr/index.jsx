import React from 'react';
import styled, { css } from 'styled-components';
import { BGColor, PLColor, SFColor } from '../../../assets/colors';
import Options from './Options'
import { SideBarLeft, BoxSideBar } from './Styled'
import { IconBtnPurchases, IconSelling, IconUser, IconLock, IconWallet, IconLicense, IconSearch } from '../../../assets/icons';

export default ({ state }) => {

    const icons = [
        { index: 1, icon: <IconBtnPurchases size='20px' color={SFColor} /> },
        { index: 2, icon: <IconSelling size='20px' color={SFColor} /> },
        { index: 3, icon: <IconUser size='20px' color={SFColor} /> },
        { index: 4, icon: <IconWallet size='20px' color={SFColor} /> },
        { index: 5, icon: <IconLicense size='20px' color={SFColor} /> },
        { index: 6, icon: <IconLock size='20px' color={SFColor} /> },
    ]
    return (
        <Main>
            {!state.dataProfile ?
                <>
                </>
                :
                <Text size={window.screen.width <= 768 ? '18px' : '22px'}>
                    {state.dataProfile?.up_name && `Hola: ${state.dataProfile?.up_name} ${state.dataProfile?.up_last}`}
                </Text>
            }
            <Text size={window.screen.width <= 768 ? '18px' : '25px'} fontFamily='PFont-Bold'>
                ¿Con qué podemos ayudarte?
            </Text>
            <ContainerInput>
                <IconSearch color={PLColor} size=' 30px' />
                <Input type='text' placeholder='Buscar' name="busquedamodelos" list="listamodelos" value={state.ayudaqpr} />
            </ContainerInput>
            {/* menu desplegable */}
            <SideBarLeft>
                <BoxSideBar>
                    {state.data.map(x => <Options key={x.thpId} icon={icons.find(j => j.index === x.thpIcon)?.icon} label={x.thpName}>
                        {x.helpPQRs.map(y =>
                            <ContainerQuestion key={y.hpqrId} >
                                <TitleQuestion>{y.hpqrQuestion}</TitleQuestion>
                                <ParagraphQuestion>{y.hpqrAnswer} </ParagraphQuestion>
                            </ContainerQuestion>

)}
                    </Options>)}
                </BoxSideBar>

            </SideBarLeft>
        </Main>
    )
}

const Main = styled.div`
    margin-top: 30px;
    min-height: 100vh;
    width: 60%;
    @media(max-width: 640px){
    width: 100%;
    }
`
const ContainerQuestion = styled.div`
    padding: 0px 20px;
`

const TitleQuestion = styled.h2`
    font-size: 15px;
    font-family: PFont-Bold;
    
`
const ParagraphQuestion = styled.p`
    font-size: 12px;
    font-family: PFont-Regular;

`
const ContainerInput = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 17px 0px;
    background-color: ${BGColor};
   border: 1px solid ${PLColor}aa;
`
const Text = styled.h2`
    ${({ size }) => size && css`font-size: ${size};`}
    font-family: ${({ fontFamily }) => fontFamily ? fontFamily : 'PFont-Light'};
    text-align: left;
    letter-spacing: 0px;
    color: ${SFColor};
    margin: 0 0 20px 15px;
`
const Input = styled.input`
   outline: none;
   width: 100%;
   font-size: 15px;
   border: none;
   margin-left: 8px;
`