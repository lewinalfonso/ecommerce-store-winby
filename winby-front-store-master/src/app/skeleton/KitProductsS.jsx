import React from 'react'
import ContentLoader from 'react-content-loader'

export const KitProductsS = ({ width, height }) => (
    <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor='#e6e6e6'
        foregroundColor='#ffffff'
    >
        <rect x={width * .025} y={height * .062} rx='0' ry='0' width={width * .46} height={height * .4} />
        <rect x={width * .512} y={height * .062} rx='0' ry='0' width={width * .46} height={height * .4} />
        <rect x={width * .025} y={height * .53} rx='0' ry='0' width={width * .46} height={height * .4} />
        <rect x={width * .512} y={height * .53} rx='0' ry='0' width={width * .46} height={height * .4} />
    </ContentLoader>
)