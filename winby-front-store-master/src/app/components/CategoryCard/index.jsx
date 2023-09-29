import React from 'react'
import { url_base } from '../../redux/types'
import { AnchorCategory, Image, TitleCategory, SliderItem } from './styles'

export const CategoryCard = ({ state }) => (
    <SliderItem>
        <AnchorCategory
            to={{
                state: { item: state },
                search: (state?.scp_id || state?.scs_id) ? `${state?.scp_id ? 'scp_id' : 'scs_id'}=${state?.scp_id || state?.scs_id}` : '',
                pathname: `/${state.uscs_id || state.cs_id || state.scs_id ? 'servicios' : 'productos'}/categorias/${state?.categoryproduct?.cp_id || state?.categoryservice?.cs_id || state.uscs_id || state.uscp_id || state?.cp_id || state?.cs_id}`
            }}
        >
            <Image
                title={state.categoryservice?.cs_name || state.categoryproduct?.cp_name || state.cp_name || state.cs_name || state.scp_name || state.scs_name}
                src={`${url_base}static/categories/${state.categoryservice || state.cs_id || state.scs_id ? 'services' : 'products'}/${state.categoryservice?.cs_id || state.cs_id || state.categoryproduct?.cp_id || state.cp_id}/${state.scp_id || state.scs_id ? `${state.scp_id || state.scs_id}/` : ''}${state.categoryservice?.cs_verPho || state.cs_verPho || state.categoryproduct?.cp_verPho || state.cp_verPho || state.scp_photo || state.scs_photo}`}
            />
            <TitleCategory>{state.categoryservice?.cs_name || state.cs_name || state.categoryproduct?.cp_name || state.cp_name || state.scp_name || state.scs_name}</TitleCategory>
        </AnchorCategory>
    </SliderItem>
)