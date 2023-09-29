import React from 'react'
import { url_base } from '../../redux/types'
import { WrapperCategory, Image, TitleCategory, SliderItem } from './styles'

export const CategoryCard = ({ state, onClick }) => (
    <SliderItem>
        <WrapperCategory>
            <Image onClick={onClick}
                src={`${url_base}static/categories/${state.cs_id ? 'services' : 'products'}/${state.cs_id || state.cp_id}/${state.scs_id || state.scp_id}/${state.scs_photo || state.scp_photo}`} name={state.scs_name || state.scp_name}
            />
            <TitleCategory>{state.scs_name || state.scp_name}</TitleCategory>
        </WrapperCategory>
    </SliderItem>
)