import React from 'react'
import { BGColor, PColor, SFColor, ESFColor } from '../../../../assets/colors'
import { Span, FlexBox, Title, BoxRequire, BoxContainer, List, ContentInput } from '../Styled'
import { InputFile, Input, InputPhone } from '../../../common/inputs'
import { IconCancel } from '../../../../assets/icons'
import { CustomButton } from '../../../common/Buttons'
import NewSelect from '../../../common/NewSelect'
import { numberFormat } from '../../../utils'
import styled from 'styled-components'

export default ({ state, onChangeInput, onChangeSelect, onChangeInputPhone, onDel, handleClickNew, onChangeFiletwo }) => <>
    <Title textAlign='center'>Información Legal</Title>
    <Span margin='20px' color={PColor} />
    <Input type='text' name='vl_name' marginD='20px 0' title='Nombre de reprentante legal' value={state.values.vl_name} onChange={e => onChangeInput(e, true, true, false, true, 3, 30)} />
    <FlexBox>
        <NewSelect id='ti_id' options={state.dataTI || []} name='ti_id' optionName='ti_name' value={state.values.ti_id} title='Tipo' onChange={onChangeSelect} margin='0' minWidth='auto' width='20%' />
        <Input widthD='75%' marginD='0' type='text' name='vl_ideNum' title='No. de Identificación' value={numberFormat(state.values.vl_ideNum)} onChange={e => onChangeInput(e, true, false, true, true, 3, 20, false, true)} />
    </FlexBox>
    <Input type='text' marginD='20px 0' name='vl_email' title='E-mail de representante legal' value={state.values.vl_email} onChange={e => onChangeInput(e, true, false, false, true, 3, 50, true)} />
    <InputPhone value={state.values.vl_phone} onChange={(v, y, e) => onChangeInputPhone(v, e, true, true)} name='vl_phone' />
    <Input type='text' marginD='20px 0' name='vl_profession' title='Profesión' value={state.values.vl_profession} onChange={e => onChangeInput(e, true, false, false, true, 3, 50)} />
    <Span textAlign='center'>Cargar documentos</Span>
    <BoxContainer gridColumn={state.columns}>
        <ContainerDocs gridColumn='2' show={state.arrayDocuments?.length ? 'true' : 'false'}>
            {state.arrayDocuments?.length && state.arrayDocuments.map(x => <PreviewDoc key={x.id}>
                <PreviwDocName>{x.name}</PreviwDocName>
                <DeleteButton type='button' onClick={e => onDel(e, x)}>
                    <IconCancel size='15px' color={ESFColor} />
                </DeleteButton>
            </PreviewDoc>)}
        </ContainerDocs>
        <BoxRequire show={state.arrayDocuments?.length ? 'false' : 'true'}>
            <Title color={SFColor} size='17px' weight='200' margin='0 0 10px' textAlign='center'>Aliado</Title>
            <List>Rut</List>
            <List>Camara de comercio</List>
            <List>Cedula ambos lados</List>
        </BoxRequire>
        <BoxRequire show={state.arrayDocuments?.length ? 'false' : 'true'}>
            <Title color={SFColor} margin='0 0 10px' weight='200' size='17px' textAlign='center'>Prestador</Title>
            <List>Cedula ambos lados</List>
            <List>Certificado estudio</List>
        </BoxRequire>
        <ContentInput show={state.arrayDocuments?.length ? 'false' : 'true'}>
            <InputFile justify='flex-end' border='none' multiple width='100%' name='back' active={state.arrayDocuments ? PColor : SFColor} accept='image/x-png, image/gif, image/jpeg, image/jpg' margin='0' label='+Cargar Documentos' onChange={onChangeFiletwo} />
        </ContentInput>
    </BoxContainer>
    <FlexBox>
        <CustomButton type='button' onClick={handleClickNew} bgColor='transparent' padding='20px 0 0' color={PColor}>{'<'} Atrás</CustomButton>
        <CustomButton disabled={state.loading} type='submit' bgColor={PColor} color={BGColor} padding='4px 50px' margin='10px 0 5px'>Aceptar</CustomButton>
    </FlexBox>
</>

const ContainerDocs = styled.div`
    display: ${ ({ show }) => show === 'true' ? 'grid' : 'none' };
    grid-template-columns: repeat(${ ({ gridColumn }) => gridColumn ? gridColumn : '1' }, 1fr);
    column-gap: 4px;
    row-gap: 4px;
    width: 100%;
    padding: 10px;
`
const PreviewDoc = styled.div`
    position: relative;
    text-align: center;
    background: white;
    border: 1px solid #888888;
    border-radius: 10px;
    padding: 2px;
`
const PreviwDocName = styled.span`
    font-size: 12px;
    font-weight: 500;
`
const DeleteButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    background-color: #d9d9d9dd;
    border-radius: 0;
    width: 100%;
    cursor: pointer;
    transition: .5s;
    opacity: 0;
`