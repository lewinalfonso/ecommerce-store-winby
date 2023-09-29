import React, { useEffect, Fragment, useRef } from 'react'
import { ShadowCard } from '../../common/ShadowCard'
import { useStoreKits } from '../../hooks/useStoreKits'
import { url_base } from '../../redux/types'
import { KitProductsS } from '../../skeleton/KitProductsS'
import { getDataLS } from '../../utils'
import { Card, Img } from './styled'
import { useGeneralBanners } from '../../hooks/useGeneralBanners'
import { To } from '../../common/Buttons'

export const ProcutsRelevants = ({ store }) => {
    const size = window.screen.width
    const [generalBanners, setStoreBannersAll, { loading: loadingGb }] = useGeneralBanners()

    const refNode = useRef(null)

    const [storeKits, getStoreKits, { loading }] = useStoreKits()
    useEffect(() => {
        const code = getDataLS('code', true)
        getStoreKits({ u_code: store ? (code || 'Winby') : 'Winby' })
    }, [getStoreKits, store])

    useEffect(() => {
        if (!generalBanners?.length && !loadingGb) {
            setStoreBannersAll({ gbType: 3 })
        }
    }, [loadingGb, generalBanners, setStoreBannersAll])

    return (
        <>
            { loading ?
            <ShadowCard refNode={refNode}>
                <KitProductsS width={size > 768 ? (refNode?.current?.offsetWidth || 1000) : size - 30}  height={size > 768 ? 450 : 310}/>
            </ShadowCard>
            : storeKits.map(z => <ShadowCard key={z.skId} title={z.skName} fontSize='20px'>
                <Card>
                    {z.storeKitItems?.map(x => <Fragment key={x.product?.p_id ? `pro-${x.product?.p_id}` : `ser-${x.service?.s_id}`}>
                        <To to={{ state: { item: x, mode: true }, pathname: `/${ x?.product?.p_id ? 'productos' : 'servicios' }/detalles/${x?.product?.p_id ? x?.product?.p_id : x?.service?.s_id}` }}>
                            <Img src={`${ url_base }static/${ x.product ? 'products' : 'services' }/${ x.product?.p_id || x.service?.s_id }/${ x.product?.productphotos[0]?.pp_name || x.service?.servicephotos[0]?.sp_name }`} />
                        </To>
                    </Fragment>)}
                </Card>
            </ShadowCard>
            )}
            {!!generalBanners.length && <ShadowCard>
                <Card horizontal>
                    <Img width='90%' height='270px' src={`${url_base}static/banners/${generalBanners[0]?.gbId}/${generalBanners[0]?.gbImg}`}/>
                    <Img width='90%' height='270px' src={`${url_base}static/banners/${generalBanners[1]?.gbId}/${generalBanners[1]?.gbImg}`}/>
                </Card>
            </ShadowCard>}
        </>
    )
}