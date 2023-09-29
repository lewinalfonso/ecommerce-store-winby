import React from 'react'
import { url_base } from '../../redux/types'
import { Anchor, Image, TitleCategory, SliderItem } from './styles'

export const CategoryCard = ({ state }) => (
    <SliderItem>
        <Anchor
            to={{
                state: { item: state },
                pathname: `/${ state.uscs_id ? 'servicios' : 'productos' }/categorias/${ state.uscs_id || state.uscp_id }` }}
        >
            <Image
                src={`${url_base}static/categories/${state.cp_id ? 'products' : 'services'}/${state.cp_id || state.cs_id}/${state.cp_icon || state.cs_icon}`}
            />
            <TitleCategory>{state.cs_name || state.cp_name}</TitleCategory>
        </Anchor>
    </SliderItem>
)