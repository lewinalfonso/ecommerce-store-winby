import React from 'react'
import styled from 'styled-components'
import { url_base } from '../../redux/types'
import { BoxLeft, Span, AsideItemsText, BoxTitle, BoxSpan } from '../AlliesMenu/index'
import { To } from '../../common/Buttons'
import { ShadowCard } from '../../common/ShadowCard'
import { Link } from "react-router-dom";

export default ({ state, /* handleShowMore */ }) =>

  <>

    <ContainerBanner>
      <Image src="https://audivi.mx/wp-content/uploads/2015/11/Banner-gris.png" />
    </ContainerBanner>
    <Breadcrumbs> <ToBread to='/'>Inicio</ToBread> > Aliado</Breadcrumbs>
    <Container>

      <BoxLeft>
        <BoxTitle><Span fontSize='30px' fontFamily='PFont-Bold'>Aliados</Span></BoxTitle>
        <BoxSpan>
          {state.vendors?.map(x =>
            //<Span>{x.v_alias}</Span>
            <To key={x.v_id} to={{ state: { item: x }, pathname: `/aliados/detalle/${x.v_id}` }} display='inline-block' width='230px' height='250px' >
              <AsideItemsText>{x.v_alias}</AsideItemsText>
            </To>
          )}
        </BoxSpan>
      </BoxLeft>
      <ShadowCard margin='0'>
        <BoxRigth>
          {state.vendors?.map(x =>
            <Card>
              <To to={{ state: { item: x }, pathname: `/aliados/detalle/${x.v_id}` }} display='inline-block' width='230px' height='250px' >
                <Img key={x.v_id || x.v_id} src={`${url_base}static/vendors/${x.v_id}/${x.v_logo}`} />
                <Span>{x.v_alias}</Span>
              </To>
            </Card>)}
        </BoxRigth>
      </ShadowCard>
    </Container >
  </>

const ContainerBanner = styled.div`
  width:100%;
  background-color: #ccc;
  height:auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 2300px;
  @media(max-width: 768px) {
    display: none;
  }

`
const Image = styled.img`
  height: auto;
  width: 100%;
  background-color: #ccc;
`
const Breadcrumbs = styled.div`
display:block;
width:100%;
padding-left:250px;
margin-bottom:100px;

@media(max-width: 768px) {
    display: none;
  }
  @media(max-width: 1600px) {
    padding-left:70px;
  }
`


const Img = styled.img`
  width: 230px;
  height: 250px;
`
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`
const BoxRigth = styled.div`
  display: flex;
  margin: 10px auto;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px;
  border-radius: 10px;
  background-color: #FFFFFF;
`
const Card = styled.div`
  width: 235px;
  height: 250px;
  text-align: center;
  margin: 20px auto;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px #b3b1b1;
    transform:scale(1.01);
    transition-duration: 0.3s;
  }
`
const ToBread = styled(Link)`
  padding: 5px;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #DF2D2D;
  }
`