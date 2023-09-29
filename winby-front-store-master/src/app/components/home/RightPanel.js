import React from 'react'
import styled from 'styled-components'
// import { CustomButton } from '../../common/Buttons'
import { PLColor } from '../../../assets/colors'
// import { PLColor, BGColor, PColor, SFColor } from '../../../assets/colors'

export default ({ img, title, subtitle, pbox }) => <Box pbox={pbox}>
    <Image src={img} />
    {/* <InfoContainer>
            <Title size='14px' color={PColor}>{title}</Title>
            <Title size='14px' color={SFColor}>{subtitle}</Title>
        </InfoContainer> */}
    {/* <ButtonContainer>
            <CustomButton padding='5px 15px' fontSize='12px' color={BGColor} bgColor={PColor}>Comprar</CustomButton>
        </ButtonContainer> */}
</Box>

/** Vista lateral */
const Box = styled.div`
    grid-column: 3 / 4;
    grid-row: ${({ pbox }) => pbox ? '1 / 2' : '2 / 3'};
    background-color: ${PLColor};
    padding: 1px;
    height: 100%;
    max-height: 165px;

    @media(max-width: 950px){
        grid-column: 2 / 3;
    }
    @media(max-width: 800px){
        display: none;
    }
    @media(min-width: 1400px){
        max-height: 250px;
    }

`

const Image = styled.img`
    width: 100%;
    height: 100%;
`
// const InfoContainer = styled.div`
//     display: inline-block;
//     /* flex-direction: column; */
//     padding: 10px 0;
//     width: 70%;
// `
// const Title = styled.span`
//     display: block;
//     font-size: ${({size}) => !!size && size};
//     color: ${({color}) => !!color && color};
//     font-family: Tahoma;
//     font-weight: bold;

//     @media(max-width: 1400px){
//         font-size: 12px;
//     }
// `
// const ButtonContainer = styled.div`
//     display: inline-block;
//     width: 30%;
//     padding: 10px 0;
// `