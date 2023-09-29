import React from 'react'
import ContentLoader from 'react-content-loader'

export const AddCategoriesStoreS = ({ width, row = 2, height }) => {
    const list = []
    const mediumW = width / row
    const widthRow = (width / row)
    let ySquare = 46
    let yRectangle = 52
    let yLine = 31
    const columns = Math.round(height / 50)
    for (let i = 0; i < columns; i++) {
        list.push(<React.Fragment key={i}>
            <rect x='10' y={yLine} rx='0' ry='0' width={width} height='3' />
            <rect x={10 + widthRow * 0.06} y={yRectangle} rx='0' ry='0' width='15' height='15' />
            <rect x={widthRow * 0.30} y={ySquare} rx='5' ry='5' width='30' height='30' />
            <rect x={widthRow * 0.5} y={yRectangle} rx='0' ry='0' width={widthRow * 0.45} height='15' />
            <rect x={mediumW + 20 + (widthRow * 0.06)} y={yRectangle} rx='0' ry='0' width='15' height='15' />
            <rect x={widthRow * 0.30 + mediumW} y={ySquare} rx='5' ry='5' width='30' height='30' />
            <rect x={widthRow * 0.5 + mediumW} y={yRectangle} rx='0' ry='0' width={widthRow * 0.45} height='15' />
        </React.Fragment>)
        yRectangle += 52
        ySquare += 52
        yLine += 52
    }
    return (
        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor='#e6e6e6'
            foregroundColor='#ffffff'
        >
            <rect x='10' y='7' rx='0' ry='0' width={widthRow * 0.15} height='15' />
            <rect x={widthRow * 0.25} y='7' rx='0' ry='0' width={widthRow * 0.2} height='15' />
            <rect x={widthRow * 0.5} y='7' rx='0' ry='0' width={widthRow * 0.45} height='15' />
            <rect x={mediumW} y='7' rx='0' ry='0' width='3' height={height} />
            <rect x={mediumW + 20} y='7' rx='0' ry='0' width={widthRow * 0.15} height='15' />
            <rect x={widthRow * 0.25 + mediumW} y='7' rx='0' ry='0' width={widthRow * 0.2} height='15' />
            <rect x={widthRow * 0.5 + mediumW} y='7' rx='0' ry='0' width={widthRow * 0.45} height='15' />
            {list}
        </ContentLoader>
    )
}