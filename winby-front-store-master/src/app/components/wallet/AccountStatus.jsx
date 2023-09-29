import React from 'react'
import { connect } from 'react-redux'
import TableSearch from '../../common/TableSearch'
import { Td, Th, Tr } from '../../common/TableUtils'
import { numberFormat, dateFormat } from '../../utils'
import styled from 'styled-components'

const CategoriesList = ({ moneyreport }) => (
    <Wrapper>
        <Scrolled>
            <TableSearch
                api={moneyreport.data || []}
                tHead={
                    <Tr>
                        <Th width='18%'>Fecha de Retiro</Th>
                        <Th width='12%'>Saldo</Th>
                        <Th width='12%'>Tipo de Transacción</Th>
                        <Th width='12%'>Saldo Retirado</Th>
                        <Th width='12%'>A</Th>
                        <Th width='12%'>Estado</Th>
                    </Tr>
                }
                tBody={x => (
                    <Tr key={x.mr_id}>
                        <Td>$ {dateFormat(x.mr_datCre)}</Td>
                        <Td>$ {numberFormat(x.mr_money)}</Td>
                        <Td>{x.mr_type === 1 ? 'Retiro' : 'Transferencia a terceros Wynby'}</Td>
                        <Td>$ {numberFormat(x.mr_retire)}</Td>
                        <Td>{x.mr_type === 1 ? x.userbankentity?.ube_alias : x.user?.u_email}</Td>
                        <Td>{x.mr_state === 0 ? 'Rechazada' : x.mr_state === 1 ? 'Aprobada' : x.mr_state === 2 && 'En Espera'}</Td>
                    </Tr>
                )}
            />
        </Scrolled>
    </Wrapper>
)

export default connect(({ moneyreport }) => ({ moneyreport }), null)(CategoriesList)

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