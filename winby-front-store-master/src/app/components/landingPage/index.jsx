import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import styled, { css } from 'styled-components'
import { ButtonSubmit, To } from '../../common/Buttons'
import { BGColor, PColor, PVColor } from '../../../assets/colors'
import bannerLicenseStart from '../../../assets/img/bannerLicenseStart.jpg'
import bannerLicenseEnd from '../../../assets/img/bannerLicenseEnd.jpg'
import { Input, InputPhone } from '../../common/inputs'
import { Header, Container, Column, ContainerLogo, Flex, Text, H2, Box, Logo, CustomButton, Circle } from './Styled'
import { Form } from '../login/Styled'
import { IconCheck } from '../../../assets/icons'
import LogoWinby from '../../../assets/icons/logoWinby.svg'
import accessibility from '../../../assets/icons/accessibility.svg'
import polygonAccessibility from '../../../assets/icons/polygonAccessibility.svg'
import polygonSearchProduct from '../../../assets/icons/polygonSearchProduct.svg'
import backup from '../../../assets/icons/backup.svg'
import polygonBackUp from '../../../assets/icons/polygonBackUp.svg'
import polygonQuality from '../../../assets/icons/polygonQuality.svg'
import polygonFacility from '../../../assets/icons/polygonFacility.svg'
import peopleQuestion from '../../../assets/icons/peopleQuestion.svg'
import peopleStudingWinby from '../../../assets/icons/peopleStudingWinby.svg'
import peopleWorking from '../../../assets/icons/peopleWorking.svg'
import polygonExperience from '../../../assets/icons/polygonExperience.svg'
import textura from '../../../assets/icons/textura.svg'
import Loading from '../../common/Loading'
import { url_base } from '../../redux/types'
/* const{ t } = useTranslation(); */

export default ({ state, onChangeInputPhone, onChangeInput, handleSubmit, handleClickUp, onChangeCheck, onBlurInput }) => (
    <Scrollbars autoHeight autoHeightMax='100%' autoHeightMin='100%' autoHide>
        <Header><H2 color={BGColor} size={window.screen.width <= 768 && '18px'} family='PFont-Bold'>{/* {t('home.finance')} */}</H2></Header>
        {/*  <button onclick={onChangelange}>Cambiar idioma</button> */}
        {<Header><H2 color={BGColor} size={window.screen.width <= 768 && '18px'} family='PFont-Bold'>MEJORA TUS FINANZAS{window.screen.width <= 768 && <br />} DESDE CASA</H2></Header>}
        <Container bgImg={bannerLicenseStart} columns='2' padding='20px 40px' height={window.screen.width <= 768 ? '1200px' : 'auto'} bgSize={window.screen.width <= 768 ? 'auto 50%' : 'cover'} bgPosition={window.screen.width <= 768 ? 'top' : '100%'}>
            <Column height={window.screen.width <= 768 && '480px'}>
                <ContainerLogo>
                    <Img src={LogoWinby} />
                </ContainerLogo>
                <H2 size={window.screen.width <= 768 ? '15px' : '35px'} margin={window.screen.width <= 768 ? '120px 0 20px' : '230px 0 20px'}>Si anhelas mejorar la calidad de vida para ti y tu familia, winby tiene una oportunidad de negocio lista para ti.</H2>
                <Text size={window.screen.width <= 768 ? '12px' : '20px'}>Tenemos una oportunidad de negocio lista para ti como empresario winby. Con winby tú puedes trabajar a tiempo parcial o completo y no tienes límites en lo que puedes ganar. Trabajar desde casa trae múltiples beneficios como tener flexibilidad de horario, ahorrar tiempo de desplazamientos y evitar el tráfico; pero sobre todo, pasar más tiempo de calidad con tu familia.</Text>
            </Column>
            <Flex height='100%'>
                {!!state.loading && <Loading />}
                <Box width={window.screen.width <= 768 && '300px'} height={window.screen.width <= 768 ? '550px' : '550px'}>
                    <Text family='PFont-Bold' size={window.screen.width <= 768 ? '14px' : '18px'} margin='20px 0 15px'>Completa el formulario y<br /> Comienza AHORA</Text>
                    <hr width='60%' color='black' />
                    <Form method='POST' onSubmit={handleSubmit}>
                        <Text margin='0 40px 0' self='flex-start' size={window.screen.width <= 768 ? '12px' : '14px'}>Nombre y Apellido</Text>
                        <Input widthD={window.screen.width <= 768 ? '80%' : '90%'} type='text' name='uc_name' title='' value={state.values.uc_name} onChange={e => onChangeInput(e, true, false, false, true, 3, 50)} />
                        <Text margin='0 40px 0' self='flex-start' size={window.screen.width <= 768 ? '12px' : '14px'}>Teléfono</Text>
                        <InputPhone widthD={window.screen.width <= 768 ? '80%' : '90%'} value={state.values.u_phoNum} title='' onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='u_phoNum' />
                        <Text margin='0 40px 0' self='flex-start' size={window.screen.width <= 768 ? '12px' : '14px'}>Correo</Text>
                        <Input widthD={window.screen.width <= 768 ? '80%' : '90%'} type='text' name='u_email' title='' value={state.values.u_email} onChange={e => onChangeInput(e, true, false, false, true, 3, 50, true)} />
                        <Text margin='0 40px 0' self='flex-start' size={window.screen.width <= 768 ? '12px' : '14px'}>Contraseña</Text>
                        <Input widthD={window.screen.width <= 768 ? '80%' : '90%'} type='password' title='' name='u_pass' onBlur={onBlurInput} value={state.values.u_pass} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
                        <Text margin='0 40px 0' self='flex-start' size={window.screen.width <= 768 ? '12px' : '14px'}>Confirmar Contraseña</Text>
                        <Input widthD={window.screen.width <= 768 ? '80%' : '90%'} type='password' title='' name='u_conPass' onBlur={onBlurInput} value={state.values.u_conPass} onChange={e => onChangeInput(e, true, false, false, true, 4, 50)} />
                        <Flex><ImputCheckBox type='checkbox' name='terCon' checked={state.terCon || ''} onChange={onChangeCheck} /><Text size='11px'>Acepto las </Text><To to='/terminos-condiciones' width='auto' height='20px' margin='2px 10px 0 4px'> políticas de privacidad</To></Flex>
                        <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding='5px' margin='10px 0 5px' fontSize={window.screen.width <= 768 ? '11px' : '15px'} weight='' width={window.screen.width <= 768 ? '150px' : '200px'} fontColor={window.screen.width <= 768 ? PColor : BGColor} radius='7px'>ENVIAR</CustomButton>
                    </Form>
                </Box>
            </Flex>
        </Container>
        <Header><H2 color={BGColor} size={window.screen.width <= 768 && '18px'} family='PFont-Bold'>¿Qué es la {window.screen.width <= 768 && <br />}licencia Winby?</H2></Header>
        <Container bgImg={bannerLicenseEnd} columns='2' bgSize={window.screen.width <= 768 ? 'auto 48%' : 'contain'} bgColor='#68BDD3' bgPosition={window.screen.width <= 768 ? 'right bottom' : '100%'}>
            <Text size={window.screen.width <= 768 ? '14px' : '18px'} align='justify' margin={window.screen.width <= 768 ? '10px' : '60px'}>Es la licencia de  uso de una tienda virtual donde tendrás miles de  productos en diferentes categorías, esto mejorará la experiencia de venta directa de nuestros empresarios winby, para que siempre puedan vender productos que se ajusten más a sus gustos.<br /><br />La licencia Winby es accesible a las personas que buscan fuentes alternas de ganancias y cuyo desarrollo y éxito no está restringido al género, edad, educación o experiencia previa.<br /><br />En winby te enseñaremos múltiples estrategias de marketing digital, ventas y network marketing para que tengas tu primer negocio rentable vendiendo productos por internet de forma automática.</Text>
            <Flex justify='center' alignItems='flex-end' height='50vh'>
                <ButtonSubmit fontSize={window.screen.width <= 768 ? '11px' : '25px'} weight={window.screen.width <= 768 && 'bold'} width={window.screen.width <= 768 ? '110px' : '400px'} fontColor={window.screen.width <= 768 ? PColor : BGColor} margin='0' padding='5px 0px' radius='7px' gradient={window.screen.width <= 768 ? { firstColor: BGColor, secColor: BGColor } : { firstColor: PVColor, secColor: PColor }} onClick={handleClickUp}>Comienza AHORA</ButtonSubmit>
            </Flex>
        </Container>
        <Text color={PColor} size={window.screen.width <= 768 ? '20px' : '30px'} margin='20px 0 0' family='PFont-Bold'>¿Por qué elegir a Winby?</Text>
        <Container bgImg={window.screen.width <= 768 && textura} bgSize={window.screen.width <= 768 ? 'auto 1080px' : 'cover'} bgPosition={window.screen.width <= 768 ? 'bottom' : '100%'} margin='5px 0px' columns='3'>
            <Column>
                <Img src={window.screen.width <= 768 ? polygonAccessibility : accessibility} width='100%' height='200px' />
                <Text size={window.screen.width <= 768 && '16px'} family='PFont-Bold' margin='10px 0 0'>Accesibilidad</Text>
                <Text size={window.screen.width <= 768 && '14px'} margin='20px 0 0'>Ingresa a la app<br /> en cualquier momento y<br /> desde cualquier dispositivo<br /> para comenzar a aprender<br /> y trabajar de la mano de<br /> nuestros líderes</Text>
            </Column>
            <Column>
                <Img src={polygonSearchProduct} width='100%' height='200px' />
                <Text size={window.screen.width <= 768 && '16px'} family='PFont-Bold' margin='10px 0 0'>Productos</Text>
                <Text size={window.screen.width <= 768 && '14px'} margin='20px 0 0'>Winby cuenta con un portafolio<br /> de miles de productos en<br /> diferentes categorías tales<br /> como tecnología, ropa,<br /> accesorios, automóviles,<br /> zapatos y mucho más, esto<br /> para mejorar la experiencia de<br /> venta directa de nuestros<br /> empresarios Winby, para que<br /> siempre puedan vender<br /> productos que se ajusten más a<br /> sus gustos.</Text>
            </Column>
            <Column>
                <Img src={polygonExperience} width='100%' height='200px' />
                <Text size={window.screen.width <= 768 && '16px'} family='PFont-Bold' margin='10px 0 0'>Experiencia</Text>
                <Text size={window.screen.width <= 768 && '14px'} margin='20px 0 0'>Practica con ejercicios reales y<br /> comienza tus primeras ventas<br /> en el menor tiempo posible.</Text>
            </Column>
        </Container>
        <Container columns='3'>

            <Column>
                <Img src={window.screen.width <= 768 ? polygonBackUp : backup} width='100%' height='200px' />
                <Text size={window.screen.width <= 768 && '16px'} family='PFont-Bold' margin='10px 0 0'>Respaldo</Text>
                <Text size={window.screen.width <= 768 && '14px'} margin='20px 0 0'>Trabajamos en equipo para<br /> ayudarte a tomar acción y que<br /> consigas los resultados que<br /> deseas tener.</Text>
            </Column>
            <Column>
                <Img src={polygonQuality} width='100%' height='200px' />
                <Text size={window.screen.width <= 768 && '16px'} family='PFont-Bold' margin='10px 0 0'>Calidad</Text>
                <Text size={window.screen.width <= 768 && '14px'} margin='20px 0 0'>Videos-cursos desarrollados<br /> por los mejores especialistas<br /> en marketing digital,<br /> marketing en red y ventas.</Text>
            </Column>
            <Column>
                <Img src={polygonFacility} width='100%' height='200px' />
                <Text size={window.screen.width <= 768 && '16px'} family='PFont-Bold' margin='10px 0 0'>Facilidad</Text>
                <Text size={window.screen.width <= 768 && '14px'} margin='20px 0 0'>Podrás aprender sin requisitos,<br /> experiencia o conocimientos<br /> previos de como empezar tu<br /> Licencia Winby.</Text>
            </Column>
        </Container>
        <Container bgImg={bannerLicenseStart} columns='2' bgSize={window.screen.width <= 768 ? '100%' : 'cover'} bgPosition={window.screen.width <= 768 ? 'top' : '100%'}>
            <Img src={LogoWinby} display={window.screen.width <= 768 ? 'none' : 'block'} width='400px' height='400px' />
            <Column>
                <Box width={window.screen.width <= 768 ? '320px' : ''} height={window.screen.width <= 768 ? '350px' : 'auto'}>
                    <Text family='PFont-Bold' size={window.screen.width <= 768 ? '18px' : '34px'} margin='20px 0 15px'>Licencia Winby</Text>
                    <Flex margin='5px' style={{ borderBottom: '1px solid #333' }}>
                        <Text size={window.screen.width <= 768 ? '29px' : '35px'}>COP$</Text><Text family='PFont-Bold' size={window.screen.width <= 768 ? '37px' : '60px'}>100.000</Text>
                    </Flex>
                    <Flex margin='30px' justify='space-between'>
                        <Circle />
                        <Text size={window.screen.width <= 768 && '16px'}>Acceso a su tienda Winby</Text>
                        <IconCheck size={17} round={true}></IconCheck>
                    </Flex>
                    <Flex margin='30px' justify='space-between'>
                        <Circle />
                        <Text size={window.screen.width <= 768 && '16px'}>Educación Winby</Text>
                        <IconCheck size={17} round={true}></IconCheck>
                    </Flex>
                    <Flex margin='30px' justify='space-between'>
                        <Circle />
                        <Text size={window.screen.width <= 768 && '16px'}>Portafolio de productos y servicios</Text>
                        <IconCheck size={17} round={true}></IconCheck>
                    </Flex>
                    <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding='5px 0' margin='5px 0' fontSize={window.screen.width <= 768 ? '11px' : '15px'} weight='' width={window.screen.width <= 768 ? '150px' : '200px'} fontColor={window.screen.width <= 768 ? PColor : BGColor} radius='5px' onClick={handleClickUp}>Comienza AHORA</CustomButton>
                </Box>
            </Column>
        </Container>
        <Header><H2 color={BGColor} size={window.screen.width <= 768 && '18px'} family='PFont-Bold'>¿Cómo funciona la{window.screen.width <= 768 && <br />} Licencia Winby?</H2></Header>
        <Container margin='40px 0 0' columns='2'>
            <Img src={peopleQuestion} height={window.screen.width <= 768 ? '260px' : '600px'} />
            <Column>
                <Box width={window.screen.width <= 768 && '300px'} height={window.screen.width <= 768 && '300px'} margin='20px 0 0'>
                    <Text margin='20px 0 0' color={PColor} family='PFont-Bold' size={window.screen.width <= 768 ? '20px' : '20px'}>PASO 1</Text>
                    <Text margin='0px 0px 5px 0px' family='PFont-Bold' size={window.screen.width <= 768 ? '15' : '20px'}>Adquiere tu licencia Winby</Text>
                    <Text margin='10px auto' size={window.screen.width <= 768 ? '14px' : '20px'}> Completas el formulario para ser dirigido a la página de compra, seleccionas tu método de pago de preferencia y haces la inversión.</Text>
                    <Text margin='10px auto' size={window.screen.width <= 768 ? '14px' : '20px'}>Apenas realices el pago tendrás acceso a tu tienda Winby y también a los cursos de forma inmediata.</Text>
                    <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding={window.screen.width <= 768 ? '1px' : '5px 0'} margin='10px 0 20px' fontSize={window.screen.width <= 768 ? '9px' : '15px'} weight='' width={window.screen.width <= 768 ? '150px' : '200px'} fontColor={window.screen.width <= 768 ? PColor : BGColor} radius='5px' onClick={handleClickUp}>Adquirir Licencia</CustomButton>
                </Box>
            </Column>
        </Container>
        <Container columns='2'>
            <Img src={peopleStudingWinby} display={window.screen.width <= 768 ? 'block' : 'none'} width='260px' height={window.screen.width <= 768 ? '220px' : '600px'} />
            <Column>
                <Box width={window.screen.width <= 768 && '300px'} height={window.screen.width <= 768 && '280px'} margin='40px 0 0'>
                    <Text margin='20px 0 0' color={PColor} family='PFont-Bold' size={window.screen.width <= 768 ? '20' : '20px'}>PASO 2</Text>
                    <Text margin='0px 0px 5px 0px' family='PFont-Bold' size={window.screen.width <= 768 ? '15' : '20px'}>Estudia los cursos</Text>
                    <Text margin='10px auto' size={window.screen.width <= 768 ? '14px' : '20px'}>Te entrenamos para convertirte en un empresario Winby exitoso, para mejorar tu vida y tu situación financiera para siempre.</Text>
                    <Text margin='10px auto' size={window.screen.width <= 768 ? '14px' : '20px'}>También ofrecemos soporte para que nada te detenga en el proceso de aprendizaje.</Text>
                    <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding={window.screen.width <= 768 ? '3px' : '5px 0'} margin='20px 0 20px' fontSize={window.screen.width <= 768 ? '9px' : '15px'} weight='' width={window.screen.width <= 768 ? '150px' : '200px'} fontColor={window.screen.width <= 768 ? PColor : BGColor} radius='5px' onClick={handleClickUp}>Comienza AHORA</CustomButton>
                </Box>
            </Column>
            <Img src={peopleStudingWinby} display={window.screen.width <= 768 ? 'none' : 'block'} width='600px' height='600px' />
        </Container>
        <Container columns='2'>
            <Img src={peopleWorking} height={window.screen.width <= 768 ? '260px' : '700px'} />
            <Column>
                <Box width={window.screen.width <= 768 && '300px'} height={window.screen.width <= 768 && '280px'}>
                    <Text margin='20px 0 0' color={PColor} family='PFont-Bold' size={window.screen.width <= 768 ? '20px' : '20px'}>PASO 3</Text>
                    <Text margin='0px 0px 5px 0px' family='PFont-Bold' size={window.screen.width <= 768 ? '15' : '20px'}>Implementa lo aprendido </Text>
                    <Text margin='10px auto' size={window.screen.width <= 768 ? '14px' : '20px'}>Nuestra meta es que generes excelentes ingresos adicionales con Winby y mejores tu calidad de vida </Text>
                    <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding={window.screen.width <= 768 ? '3px' : '5px 0'} margin='20px 0' fontSize={window.screen.width <= 768 ? '9px' : '15px'} weight='' width={window.screen.width <= 768 ? '150px' : '200px'} fontColor={window.screen.width <= 768 ? PColor : BGColor} radius='5px' onClick={handleClickUp}>Comienza AHORA</CustomButton>
                </Box>
            </Column>
        </Container>
        <Header><H2 color={BGColor} size={window.screen.width <= 768 ? '18px' : '24px'} family='PFont-Bold'>Conoce algunos de los milles de empresarios Winby</H2></Header>
        <Flex marginMedia margin='70px' direction='row' wrap='wrap' justify='center'>
            {state.vendors?.length && state.vendors.map(x => <Logo key={x.v_id} src={`${url_base}static/vendors/${x.v_id}/${x.v_logo}`} />)}
        </Flex>
    </Scrollbars>
);

const Img = styled.img`
    display: ${({ display }) => display ? display : 'block'};
    ${({ height }) => height && css`height: ${height}; `}
    margin: ${({ margin }) => margin || 'auto'};
    border-radius: 20px;
    ${({ width }) => width && css`width: ${width};`};
    @media( max-width: 1300px){
        height:220px;
    }
`
const ImputCheckBox = styled.input`
    margin-top: 6px;
    cursor: pointer;
 `