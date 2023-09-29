import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import styled from 'styled-components'
import { BGColor, PColor } from '../../assets/colors'
import Fondo from '../../assets/icons/textura.svg'
import { Link } from 'react-router-dom'

export default ({ state, isVisible, handleVisible }) => <Modal visible={isVisible}>
    <Container>
        <ButtonClose onClick={handleVisible}>
        </ButtonClose>
        <Scrollbars>
            <WordContainer>
                <H1>¿QUÉ ES LA LICENCIA WINBY?</H1>
                <Parr>
                    <b>WINBY es TU PROPIA TIENDA VIRTUAL.</b> En <b>TU TIENDA WINBY</b> tendrás miles de productos y servicios en múltiples categorías y te capacitaremos en varias estrategias de marketing para que
            tus ventas sean sorprendentes; incluso te enseñaremos a vender en automático, lo que quiere decir que cuando te vayas a dormir, un sistema automatizado de marketing digital generará ventas para
            ti.
                </Parr>
                <Parr><b>Si, así como lo oyes, mientras duermes o realizas otra labor el sistema trabajará para ti. </b></Parr>
                <Parr>La LICENCIA WINBY es la oportunidad perfecta para las personas que buscan fuentes alternas de ingresos que no estén limitadas por su género, edad, educación o experiencia previa.</Parr>
                <Parr>Sabemos hacerlo y te lo enseñaremos todo para que tengas tu primer negocio rentable vendiendo productos por internet, inclusive de forma automática.
                    <b> {state.codeUser}</b>, será tu guía personal en el proceso de aprendizaje y desarrollo de TU LICENCIA WINBY. <b>TU LICENCIA WINBY.</b>
                </Parr>
                <Parr>Uniremos nuestros esfuerzos y te ayudaremos a convertirte en un SÚPER EMPRESARIO WINBY, con lo cual mejorarás tu estilo de vida para siempre.</Parr>

                <H3>¿QUE INCLUYE LA LICENCIA WINBY?</H3>
                <Ul>
                    <Li>El Uso de nuestra marca y la explotación de nuestro modelo de negocio.</Li>
                    <Li>TU PROPIA TIENDA VIRTUAL 24/7, surtida por nosotros y de la cual tu escoges los productos y servicios que deseas mercadear.</Li>
                    <Li>Una pasarela segura de pagos enlazada a una billetera virtual que llevara tus utilidades a tu cuenta bancaria en el momento que lo solicites.</Li>
                    <Li>Un completo sistema de administración de tus utilidades disponible 24/7 en el que podrás hacer seguimiento a todos tus movimientos de mercancías y dinero.</Li>
                    <Li>Un departamento logístico que pondrá las mercancías vendidas en manos de tus clientes sin que tu tengas que mover un solo dedo o gastar un solo peso.</Li>
                    <Li>Un sistema de capacitación en las estrategias de marketing que desarrollamos para que te conviertas en un gran vendedor y generes grandes ingresos.</Li>
                </Ul>

                <H3>¿POR QUÉ ESCOGER LA LICENCIA WINBY?</H3>
                <Parr>Si buscas un ingreso adicional que en el mediano plazo se convierta en tu ingreso principal; lo mejor es que inviertas en una LICENCIA porque de esa manera evitarás muchos de los riesgos
            que tendrías al iniciar un nuevo negocio. <b>LA LICENCIA WINBY</b> es la mejor oportunidad para ti y a continuación enumeramos algunas ventajas que tenemos sobre otras LICENCIAs del mercado:
                </Parr>

                <Ul>
                    <Li>Inversión mínima y única por un año. <br /> La LICENCIA WINBY generalmente tiene un costo de USD 30 mensuales, pero en este momento podrás adquirirla por un valor simbólico de USD30.</Li>
                    <Li>Tu negocio virtual. <br /> No es un secreto que, a causa de los últimos eventos de salud mundial, los negocios soportados en la internet se han acelerado y crecido en algunos casos hasta
              en un 730%. Es una gran oportunidad para invertir en una licencia que está inmersa en la revolución tecnológica.
                    </Li>
                    <Li>Accesibilidad <br />
              Ingresa al web site o aplicativo móvil en cualquier momento y desde cualquier dispositivo para comenzar a aprender y vender de la mano de nuestros líderes.
                    </Li>
                    <Li>Productos y servicios <br /> WINBY cuenta con un portafolio de miles de productos y servicios en diferentes categorías tales como: consumo básico, tecnología, textiles,
              accesorios, automóviles, bienes raíces, calzado, productos para el hogar, artículos deportivos, artículos para la belleza y el cuidado personal, servicios técnicos,
              servicios turísticos, servicios de transporte, servicios médicos y mucho más; esto para mejorar la experiencia de venta directa de nuestros EMPRESARIOS WINBY, para que
              siempre puedan vender los productos y servicios que se ajusten más a sus gustos o perfil.
                    </Li>
                    <Li>Experiencia <br />La experiencia la aportamos nosotros, tu solo debes capacitarte y practicar diariamente las tareas que te recomendamos realizar, para comenzar tus primeras ventas en el menor tiempo posible.</Li>
                    <Li>Respaldo <br /> Estarás acompañado todo el tiempo, trabajamos en equipo para ayudarte a tomar acción y asegurarnos que consigas los resultados que anhelas tener.</Li>
                    <Li>Calidad <br /> Videos-cursos y webinarios desarrollados por los mejores especialistas en las diferentes estrategias de marketing digital y ventas que desarrollamos para realizar las ventas. </Li>
                    <Li>Facilidad <br /> Podrás aprender sin requisitos, experiencia o conocimientos previos de como explotar <b>TU LICENCIA WINBY.</b> Si es necesario te enseñaremos desde cero, porque estamos comprometidos con tu crecimiento.</Li>
                </Ul>

                <ContainerButton>
                    <Link style={{ textDecoration: 'none' }} to='/registro'>
                        <ButtonModal>Comienza AHORA!</ButtonModal>
                    </Link>
                </ContainerButton>
            </WordContainer>
        </Scrollbars>
    </Container>
</Modal>

const Modal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #00000085;
    transition: .5s;
    opacity: ${ ({ visible }) => visible ? 1 : 0 };
    z-index: ${ ({ visible }) => visible ? 999 : -1 };
`

const Container = styled.div`
    position: relative;
    width: 85%;
    height: 95%;
    background-color: ${ BGColor };
    border-radius: 15px;
    box-shadow: 0 0 10px 2px #55555555;
    padding: 15px 0px;
    background-image: url(${ Fondo });
`
const ButtonClose = styled.div`
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
    z-index: 99;
`
const WordContainer = styled.div`
    padding: 0 5%;
    padding-bottom: 50px;
`
const H1 = styled.h1`
    text-align: center;
    color: ${ PColor };
`
const H3 = styled.h3`
    text-align: center;
    color: ${ PColor };
`
const Parr = styled.p`
    text-align: justify;
    color: #565656;
    font-size: 14px;
    font-family: tahoma;
    margin: 15px 0;
`
const ContainerButton = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 50px;
    text-align: center;
    left: 0;
    width: 100%;
`
const Ul = styled.ul`
`
const Li = styled.li`
    text-align: justify;
    color: #565656;
    font-size: 14px;
    font-family: tahoma;
`
const ButtonModal = styled.div`
    box-shadow: 1px 1px 5px 1px #00000055;
    background-color: ${ PColor }; 
    padding: 5px 15px;
    color: ${ BGColor };
    border-radius: 15px;
    @media(max-width: 600px){
        font-size: 18px;
    }
`