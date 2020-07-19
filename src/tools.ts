import {IConfig} from './interfaces';

export const initialConfig: IConfig = 
{
    range_max: {
        x: 108,
        y: 3
    },
    range_min: {
        x: 1,
        y: 1
    },
    img_suffix: '.jpg',
    img_infix: '_',
    startX: 1,
    startY: 1
}

export function clamp(val: number, low: number, high: number) {
    return Math.max(low, Math.min(val, high));
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function loop(val: number, low: number, high: number): number {
    return low + mod((val - low), (high - low));
}