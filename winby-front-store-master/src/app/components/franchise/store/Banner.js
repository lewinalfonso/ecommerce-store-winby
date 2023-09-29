import React from 'react'
import { Link } from 'react-router-dom'
// import { Banner, BannerContainer, Button } from './Styled'
import Slider from '../../../common/Slider'
import { Banner, Button, BoxCard } from './Styled'
import { PColor, PLColor } from '../../../../assets/colors'
import { url_base } from '../../../redux/types'
import { CardItems } from '../../../common/Cards'
import Loading from '../../../common/Loading'
import { IconArrowRight } from '../../../../assets/icons'

export default ({ data, handleClick, itemType }) =>(
    <Banner>
        <Slider>
            {data?.length ? data.map(x => <Link key={ x.uscs_id || x.uscp_id || x.usp_id || x.uss_id } to={{ state: { item: x }, pathname: `/${ x.uscs_id || x.uss_id ? 'servicios' : 'productos' }/${ x.usp_id || x.uss_id ? 'detalles' : 'categorias' }/${ x.uscs_id || x.uscp_id || x?.product?.p_id || x?.service?.s_id }` }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', padding: '10px 0', }}
            >
                <BoxCard applyHover={!!itemType}>
                    <CardItems price={!!itemType && (x.product?.p_price || x.service?.s_price)} title={ x.categoryservice?.cs_name || x.categoryproduct?.cp_name || x.product?.p_name || x.service?.s_name} image={`${ url_base }static/${ x.product ? 'products' : x.service ? 'services' : 'categories' }/${ x.product ? x.product?.p_id : x.service ? x.service?.s_id : x.categoryservice ? 'services' : 'products' }/${ x.categoryservice?.cs_id || x.categoryproduct?.cp_id || x.product?.productphotos[0]?.pp_name || x.service?.servicephotos[0]?.sp_name }${ !x.product && !x.service ? `/${ x.categoryservice?.cs_verPho || x.categoryproduct?.cp_verPho }` : '' }`} />
                </BoxCard>
            </Link>
            ) : <Loading bgColor={`${ PLColor }85`} height='260px' zIndex='1' /> }
        </Slider>
        <Button onClick={handleClick}>Ver Más <IconArrowRight size='10px' color={PColor} style={{ marginLeft: 5 }} /></Button>
    </Banner>
)