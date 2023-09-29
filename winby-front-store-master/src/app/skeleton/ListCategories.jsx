import React from 'react'
import ContentLoader from 'react-content-loader'

export const ListCategories = ({ width = 1366, height = 300, heading, column = 6, padding = 15, borderRadius = 4, item = true, title = true, subTitle = true, ...props }) => {
    const list = []

    for (let j = 0; j < column; j++) {
        const itemWidth = (width - padding * (column + 1)) / column
        const x = padding + j * (itemWidth + padding) + 20
        const y2 = padding + itemWidth
        const y3 = y2 + padding / 2 + 20

        list.push(
            <React.Fragment key={j}>
                {!!item && <rect
                    x={x}
                    y={10}
                    rx={borderRadius}
                    ry={borderRadius}
                    width={itemWidth}
                    height={itemWidth}
                />}
                {!!title && <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={20} />}
                {!!subTitle && <rect
                    x={x}
                    y={y3}
                    rx={0}
                    ry={0}
                    width={itemWidth * 0.6}
                    height={20}
                />}
            </React.Fragment>
        )
    }

    return (
        <ContentLoader
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            {...props}
        >
            {heading && (
                <rect
                    x={padding}
                    y={padding}
                    rx={0}
                    ry={0}
                    width={heading.width}
                    height={heading.height}
                />
            )}
            {list}
        </ContentLoader>
    )
}