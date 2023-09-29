import React from 'react'
import { Link } from 'react-router-dom'
import Slider from '../../common/Slider'
import { Banner, BannerContainer, Button, BoxCard } from '../home/Styled'
import { IconArrowRight } from '../../../assets/icons'
import { PColor } from '../../../assets/colors'
import { url_base } from '../../redux/types'
import { CardItems } from '../../common/Cards'
import Loading from '../../common/Loading'

// SwiperCore.use([Navigation, A11y])

export default ({ data, handleClick }) => (
    <Banner>
        <BannerContainer>
            <Slider>
                {data?.length ? data.map(x =>
                    <Link key={x.cs_id || x.cp_id} to={{ state: { item: x }, pathname: `/${x.cs_id ? 'servicios' : 'productos'}/${x.sp_id ? 'detalles' : 'categorias'}/${x.cs_id || x.cp_id || x.product.p_id}/Winby` }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                        <BoxCard>
                            <CardItems title={x.cs_name || x.cp_name} image={`${url_base}static/categories/${x.cs_id ? 'services' : 'products'}/${x.cs_id || x.cp_id}/${x.cs_verPho || x.cp_verPho}`} />
                        </BoxCard>
                    </Link>
                ) : <Loading />}
            </Slider>
            <Button onClick={handleClick}>Ver Mas <IconArrowRight size='10px' color={PColor} style={{ marginLeft: 5 }} /></Button>
        </BannerContainer>
    </Banner>
)