import React from 'react'
import styled from 'styled-components'
import Form from './Form'
import bgImage from '../../../assets/icons/textura.svg'

export default ({ state, onChangeSelect, onChangeInput, onChangeInputPhone, onSubmit, onBlurConf }) =>
  <Main>
    <BodyContainer>
      <Form
        onSubmit={onSubmit}
        state={state}
        onChangeSelect={onChangeSelect}
        onChangeInput={onChangeInput}
        onChangeInputPhone={onChangeInputPhone}
        onBlurConf={onBlurConf}
      />
    </BodyContainer>
  </Main>

const Main = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    background-repeat: no-repeat;
    background-origin: content-box;
`
const BodyContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${bgImage});
`
