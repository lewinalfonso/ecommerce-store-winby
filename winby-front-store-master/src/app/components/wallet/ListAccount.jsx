import React from 'react'
import { connect } from 'react-redux'
import { PColor, PLColor } from '../../../assets/colors'
import TableSearch from '../../common/TableSearch'
import { Td, Th, Tr } from '../../common/TableUtils'
import { IconSee } from '../../../assets/icons'
import { ButtonSubmit } from '../../common/Buttons'
import styled from 'styled-components'

const CategoriesList = ({ handleOption, userbanks, handleChange }) => (
    <Wrapper>
        <Scrolled>
            <TableSearch
                title='Lista de Cuentas'
                api={userbanks?.data || []}
                tHead={
                    <Tr>
                        <Th width='18%'>Alias</Th>
                        <Th width='12%'>Tipo</Th>
                        <Th width='12%'>Entidad Bancaria</Th>
                        <Th width='12%'>Tipo de Cuenta</Th>
                        <Th width='12%'>N° de Cuenta</Th>
                        <Th width='12%'>Cripto Moneda</Th>
                        <Th width='12%'>Billetera</Th>
                        <Th width='10%' colSpan='2'></Th>
                    </Tr>
                }
                tBody={x => (
                    <Tr key={x.ube_id}>
                        <Td>{x.ube_alias}</Td>
                        <Td>{x.ube_type === 1 ? 'Cripto Moneda' : 'Entidad Bancaria'}</Td>
                        <Td>{x.typebank?.tb_name}</Td>
                        <Td>{x.accounttype?.at_name}</Td>
                        <Td>{x.ube_accNum}</Td>
                        <Td>{x.typecryptocurrency?.tc_name}</Td>
                        <Td>{x.ube_hash}</Td>
                        <Td><IconSee size='15px' onClick={() => handleOption(x, 1)} color={PLColor} /></Td>
                        <Td><IconSee type='button' onClick={() => handleOption(x, 0)}><IconSee size='15px' color={PColor} /></IconSee></Td>
                    </Tr>
                )}
            />
            <ButtonSubmit type='button' padding='5px 10px' margin='0 10px 10px 0' bgColor={PColor} width='150px' float='right' onClick={() => handleChange(1)}>Crear</ButtonSubmit>
        </Scrolled>
    </Wrapper>
)

export default connect(({ userbanks }) => ({ userbanks }), null)(CategoriesList)

const Wrapper = styled.div`
    width: 100%;
    overflow: auto;
`

const Scrolled = styled.div`
    width: 200%;

    @media (min-width: 768px) {
        width: 100%;
    } 
`