import React from 'react'
import { BGVColor } from '../../../assets/colors'
import bgImg from '../../../assets/FONDO4.svg'
import { TitleParagraph, ContentBox, ImgBgDown, TextContent, Paragraph, ContainerMain, Btn, Img } from './Styled'
import experience from '../../../assets/icons/experience.svg'
import services from '../../../assets/icons/shopViewItems.svg'
import backups from '../../../assets/icons/backup.svg'
import quality from '../../../assets/icons/quality.svg'
import ease from '../../../assets/icons/ease.svg'

export default ({ handleClick }) => <>
    <ContainerMain position='relative' res grid='1fr 2fr '>
        <Img res height='250px' src={services}/>
        <TextContent borderTop='1px solid red' borderBottom='1px solid red'>
            <TitleParagraph margin={window.screen.width> 768 && '2%'} color={BGVColor} inherit='inherit' weight='900'>Productos y servicios</TitleParagraph>
            <Paragraph marginp='10px 50px'>WINBY cuenta con un portafolio de miles de productos y servicios en diferentes categorías tales como: consumo básico, tecnología, textiles, accesorios, automóviles, bienes raíces, calzado, productos para el hogar, artículos deportivos, artículos para la belleza y el cuidado personal, servicios técnicos, servicios turísticos, servicios de transporte, servicios médicos y mucho más; esto para mejorar la experiencia de venta directa de nuestros EMPRESARIOS WINBY, para que siempre puedan vender los productos y servicios que se ajusten más a sus gustos o perfil.</Paragraph>
        </TextContent>
    </ContainerMain>
    <ContainerMain grid={window.screen.width <= 700 ? '1fr' : '1fr 1fr 1fr 1fr' }>
        <ContentBox res borderRight='1px solid red'>
            <Img ress height='200px' src={experience}/>
            <TitleParagraph margin={window.screen.width> 768 && '13%'} size='25px'color={BGVColor} weight='800'>Experiencia</TitleParagraph>
            <Paragraph marginp='10px 50px'>La experiencia la aportamos nosotros, tu solo debes capacitarte y practicar diariamente las tareas que te recomendamos realizar, para comenzar tus primeras ventas en el menor tiempo posible.</Paragraph>
        </ContentBox>
        <ContentBox res borderRight='1px solid red'>
            <Img ress height='200px' src={backups}/>
            <TitleParagraph margin={window.screen.width> 768 && '13%'} size='25px' color={BGVColor} weight='800'>Respaldo</TitleParagraph>
            <Paragraph marginp='10px 50px'>Estarás acompañado todo el tiempo, trabajamos en equipo para ayudarte atomar acción y asegurarnos que consigas los resultados que anhelas tener.</Paragraph>
        </ContentBox>
        <ContentBox res borderRight='1px solid red'>
            <Img ress height='200px' src={quality}/>
            <TitleParagraph margin={window.screen.width> 768 && '13%'} size='25px' color={BGVColor} weight='800'>Calidad</TitleParagraph>
            <Paragraph marginp='10px 50px'>Videos-cursos y webinarios desarrollados por los mejores especialistas en las diferentes estrategias demarketing digital y ventas.</Paragraph>
        </ContentBox>
        <ContentBox res>
            <Img ress height='200px' src={ease}/>
            <TitleParagraph margin={window.screen.width> 768 && '13%'} size='25px' color={BGVColor} weight='800'>Facilidad </TitleParagraph>
            <Paragraph marginp='10px 50px'>Podrás aprender sin requisitos, experiencia o conocimientos previos. Te enseñaremos desde cero,porque estamos comprometidos con tu crecimiento.</Paragraph>
        </ContentBox>
        <ImgBgDown src={bgImg}/>
    </ContainerMain>
    <Btn margin='20px' onClick={handleClick}>Comienza AHORA</Btn>
</>