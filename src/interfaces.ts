import {PropsList} from 'react-zoom-pan-pinch';

export interface IRotationGalleryProps
{
    name: string
    title?: string
    allowZoom?: boolean
    className?: string
    zoomPanPinch?: PropsList
    options?: Partial<IConfig>
}

export type Image = '.png' | '.jpg' | '.jpg' | any;

export interface IConfig 
{
    range_max: ICoordinates
    range_min: ICoordinates
    img_suffix: Image
    img_infix: string
    startX: number
    startY: number
    invertY?: boolean
    loadingText?: string
}

export interface ICoordinates
{
    x: number
    y: number
}
