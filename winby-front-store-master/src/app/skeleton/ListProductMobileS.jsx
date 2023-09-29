import React from 'react'
import ContentLoader from 'react-content-loader'

export const ListProductMobileS = ({ width = 1366, height = 300, row = 1, ...props }) => {
    const list = []
    let yImg = 10
    let yTitle = 10
    let yPrice = 40
    let yIcon = 70
    let yInf = 105
    let yLine = 135

    for (let i = 0; i < row; i++) {
        list.push(
            <React.Fragment key={i}>
                <rect x='10' y={yImg} rx='5' ry='5' width='130' height='115' />
                <rect x='160' y={yTitle} rx='3' ry='3' width='180' height='20' />
                <rect x='160' y={yPrice} rx='3' ry='3' width='100' height='20' />
                <rect x='160' y={yIcon} rx='3' ry='3' width='40' height='25' />
                <rect x='160' y={yInf} rx='3' ry='3' width='160' height='20' />
                <rect x='10' y={yLine} rx='0' ry='0' width='345' height='2' />
            </React.Fragment>
        )
        yImg += 140
        yTitle += 140
        yPrice += 140
        yIcon += 140
        yInf += 140
        yLine += 140
    }
    return (
        <ContentLoader
            speed={2}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            backgroundColor='#e6e6e6'
            foregroundColor='#ffffff'
            {...props}
        >
            {list}
        </ContentLoader>

    )
}