import React from 'react'
import ContentLoader from 'react-content-loader'

const LoaderProducts = (props, { width, column, padding, }) => {
    const list = []

    for (let j = 0; j < column; j++) {
        const itemWidth = (width - padding * (column + 1)) / column
        const x = padding + j * (itemWidth + padding) + 20
        const y2 = padding + itemWidth
        const y3 = y2 + padding / 2 + 20

        list.push(
            <>
                {!!props.item && <rect
                    x={x}
                    y={10}
                    rx={props.borderRadius}
                    ry={props.borderRadius}
                    width={itemWidth}
                    height={itemWidth}
                />}
                {!!props.title && <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={20} />}
                {!!props.subTitle && <rect
                    x={x}
                    y={y3}
                    rx={0}
                    ry={0}
                    width={itemWidth * 0.6}
                    height={20}
                />}
            </>
        )
    }
    return (
        <ContentLoader
            speed={2}
            width={props.width}
            height={props.height}
            viewBox="0 0 310 375"
            backgroundColor="#faf9f9"
            foregroundColor="#dfdddd"
            {...props}
        >
            <rect x="5" y="1" rx="0" ry="0" width="300" height="335" />
            <rect x="5" y="345" rx="0" ry="0" width="300" height="25" />
        </ContentLoader>
    )
}

export default LoaderProducts