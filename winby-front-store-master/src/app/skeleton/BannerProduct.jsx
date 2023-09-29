import React from 'react'
import ContentLoader from 'react-content-loader'

export const BannerProduct = ({ width, height, widthR, heightR, viewBox }) => (
    <ContentLoader
        speed={2}
        width={width || 1200}
        height={height || 300}
        viewBox={viewBox || '0 0 1200 300'}
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <rect x='10' y='10' rx='10' ry='10' width={widthR || '1180'} height={heightR || '280'} />
    </ContentLoader>
)