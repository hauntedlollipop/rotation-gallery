import * as React from 'react'
import {useLoadImages} from './hooks/index';
import {IRotationGalleryProps} from './interfaces';
import { loop, initialConfig, clamp } from './tools';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {RTContext} from './provider'
require('./index.css');

export const RotationGalleryPure:React.FC<IRotationGalleryProps> = ({name, title, className, zoomPanPinch, allowZoom = true, options}) => 
{
    const conf = {...initialConfig, ...options};
    const {source} = React.useContext(RTContext);
    const [loading, images] = useLoadImages(name, source, conf);
    const [mouseDown, setMouseDown] = React.useState<boolean>(false);
    const [mouseDownXY, setMouseDownXY] = React.useState<{x: number, y: number}>({x: 0, y: 0});
    const [startImageXY, setStartImageXY] = React.useState<{x: number, y: number}>({x: conf.startX, y: conf.startY});
    const [imageXY, setImageXY] = React.useState<{x: number, y: number}>({x: startImageXY.x, y: startImageXY.y});

    const imageRef = React.useRef<HTMLImageElement>(null);
    const imageContainerRef = React.useRef<HTMLDivElement>(null);
    const {invertY} = conf;

    const handleMouseDown = (e: any) =>
    {
        e.preventDefault();
        setMouseDown(true);
        setMouseDownXY({x: e.screenX, y: e.screenY});
        setStartImageXY({x: imageXY.x, y: imageXY.y})
    }

    const handleMouseUp = (e: any) =>
    {
        e.preventDefault();
        setMouseDown(false);
    }

    const handleMouseMove = (e: any) =>
    {
        if (!mouseDown)
        {
            return;
        }
        e.preventDefault();
        const diff_x: number = Math.floor((mouseDownXY.x - e.screenX) / 4);
        const diff_y = Math.floor((mouseDownXY.y - e.screenY) / 100);
        setImageXY({
            x: loop(startImageXY.x + diff_x, conf.range_min.x, conf.range_max.x), 
            y: clamp(startImageXY.y + (invertY ? -diff_y : diff_y), conf.range_min.y, conf.range_max.y)
        });

        const img_name = source + name + '/' + imageXY.y + conf.img_infix + imageXY.x + conf.img_suffix;
        if (imageRef.current)
        {
            imageRef.current.src = img_name;
        }
    }

    const handleMouseOut = (e: any) =>
    {
        e.preventDefault();
        setMouseDown(false);
    }

    const EnabledZoom = (
        <TransformWrapper
            pan={{disabled: true}}
            pinch={{disabled: true}}
            options={{limitToBounds: true}}
            wheel={{limitsOnWheel: true}}
           {...zoomPanPinch}
        >
            <TransformComponent >
                <img src={`${source + name}/${imageXY.y}_${imageXY.x}.jpg`} ref={imageRef} alt='Rotation gallery'/>
            </TransformComponent>
        </TransformWrapper>
    )

    return (
        <div className={'rotation-gallery ' + (className ? className : '')}>
            {loading ? (
                <div className='rotation-loader'>
                    <img src='http://rotationgallery.com/assets/rotation_gallery_wheel.svg' alt='Rotation wheel'/>
                </div>) 
                : (
                <div 
                    className='image-rotation' 
                    ref={imageContainerRef} 
                    onMouseDown={handleMouseDown} 
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseOut={handleMouseOut}
                >
                    {allowZoom ? (EnabledZoom) : (<img src={`${source + name}/${imageXY.y}_${imageXY.x}.jpg`} ref={imageRef} alt='Rotation gallery'/>)}
                </div>
            )}
            {title && 
            <div>
                <h3>{title}</h3>
            </div>}
        </div>
    )
}
const RotationGallery = React.memo(RotationGalleryPure, (prevProps: any, nextProps: any) =>
{
    if (prevProps.name !== nextProps.name)
    {
        return false;
    }
    return true;
});

export default RotationGallery;