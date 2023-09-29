/* import React, { useState } from "react";
import "./styles.css";
import useImageZoom from "react-image-zoom-hook";
import styled, { css } from "styled-components"; */

/* function AppWithZoomCustomization({ img }) {
 const [isShow, setIsShow] = useState(false)
    const imgHeight = 416;
    const imgWidth = 376;
    const lensHeight = 100;
    const lensWidth = 100;
    const previewLensHeight = 600;
    const {
        moveLens,
        imgDimesions,
        lensDimensions,
        previewLensDimensions,
        previewImgDimensions,
        imgContainerDimesions,
        imgRefCallback,
        meshRefCallback,
        imagePreviewRefCallback
    } = useImageZoom({
        imgHeight,
        imgWidth,
        lensHeight,
        lensWidth,
        previewLensHeight,
        img,
    }); */
/*     return (
        <div className='container'>
            <div
                className="img-main-container"
                onMouseMove={moveLens}
                style={{
                    ...imgContainerDimesions
                }}
            >
                <div
                    ref={meshRefCallback}
                    className="mesh"
                    style={{
                        ...lensDimensions
                    }}
                />
                <img
                    style={{
                        ...imgDimesions
                    }}
                    ref={imgRefCallback}
                    alt="test"
                    src={img}
                />
            </div>
            <div
                className="img-preview-section-container"
                style={{
                    ...previewLensDimensions
                }}
            >
                <img
                    ref={imagePreviewRefCallback}
                    alt="test-preview"
                    src={img}
                    style={{
                        ...previewImgDimensions
                    }}
                    className="img-preview-section"
                />
            </div>
        </div>
    );
}
 */
/* const Container = styled.div`
    position: relative;
    display: block;
    width: 100%;
    
` */
/* const Cursor = styled.div`
     display: none;
    cursor: zoom-in;
` */
/* const ContainerImage = styled.div`
    width: 100%;
    &:hover ${Cursor}{
        display: block;
} 
` */
/* const ContainerImagePreview = styled.div` 
    ${({ active }) => active && css`display: ${active};`};
    position: fixed;
    left: calc(100% - 1%);
` */
/* const ImgPreview = styled.img``
const MainImg = styled.img`
    width: 100%;
    height: 100%;
` */
/* export default ({ img }) => {
    return (
            <AppWithZoomCustomization img={img}/>
    );
}
 */

