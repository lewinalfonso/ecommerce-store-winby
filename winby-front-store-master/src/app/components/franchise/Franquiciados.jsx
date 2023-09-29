import React from 'react'
import peopleStudying from '../../../assets/icons/peopleStudying.svg'
import { Content, ListContain, Lists, Img } from './Styled'
export default () =>(
    <>
        <Content res grid>
            <ListContain ress>
                <Lists checkOne>ESTUDIANTES UNIVERSITARIOS</Lists>
                <Lists checkOne>EMPLEADOS Y DESEMPLEADOS</Lists>
                <Lists checkOne>EMPRENDEDORES EXPERTOS </Lists>
                <Lists checkOne>NETWORKERS</Lists>
                <Lists checkOne>FREELANCERS</Lists>
                <Lists checkOne>PROFESIONALES INDEPENDIENTES</Lists>
                <Lists checkOne>LÍDERES </Lists>
                <Lists checkOne>VENDEDORES</Lists>
                <Lists checkOne>INFLUENCERS</Lists>
                <Lists checkOne>YOUTUBERS</Lists>
                <Lists checkOne>MADRES CABEZA DE HOGAR </Lists>
                <Lists checkOne>EMPRENDEDORES NOVATOS</Lists>
            </ListContain>
            <Img width='100%' src={peopleStudying}/>
        </Content>
    </>
)