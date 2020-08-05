import {useState, useEffect} from 'react';
import { IConfig } from '../interfaces';

export const useLoadImages = (name: string, source: string, config: IConfig) =>
{
    const [loading, setLoading] = useState<boolean>(true);
    const [images, setImages] = useState<any[] | null>([]);

    useEffect(() =>
    {
        const imgs: {idx: number, src: string}[] = [];
        for (var j = config.range_min.y; j <= config.range_max.y; j++) {
            for (var i = config.range_min.x; i <= config.range_max.x; i++) {
                var idx = 3 * i + j;
                imgs.push({idx, src: `${source + name}/${j + config.img_infix + i + config.img_suffix}`});
            }
        }
        function loadImages()
        {
            return Promise.all(imgs.map(i =>
            {
                return new Promise((resolve, reject) =>
                {
                    try {
                        const img = new Image();
                        img.onload = () => resolve(img);
                        img.src = i.src;
                    }
                    catch(err) {
                        reject(err);
                    }
                })
            }))
        }
        loadImages().then(res =>
        {
            setLoading(false);
            setImages(res);
        })
    }, [name])

    return [loading, images];
}
