import React from 'react'
import { url_base } from '../../redux/types'
import { Anchor, Image, SliderItem } from './styles'

export const VendorsCard = ({ state }) => (
    <SliderItem>
        <Anchor to={{ state: { item: state }, pathname: `/aliados/detalle/${state.v_id}` }}>
            <Image
                title={ state.categoryservice?.cs_name || state.categoryproduct?.cp_name}
                src={`${url_base}static/vendors/${state.v_id}/${state.v_logo}`} name={state.v_alias}
            />
        </Anchor>
    </SliderItem>
)