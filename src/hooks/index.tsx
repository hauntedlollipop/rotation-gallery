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
            // @ts-ignore
            const cache: {[key: string]: any} = JSON.parse(localStorage.getItem('images')) || {};
            return Promise.all(imgs.map(i =>
            {
                return new Promise((resolve, reject) =>
                {
                    const arr = i.src.split('/');
                    const name: string = arr[arr.length - 1].split('.')[0];
                    try {
                        const img = new Image();
                        let data = null;
                        img.onload = () =>
                        {
                            data = getBase64Image(img);
                            if (!cache[name])
                            {
                                cache[name] = data;
                                localStorage.setItem('images', JSON.stringify(cache));
                            }
                            resolve(img);
                        }
                        img.src = !!cache[name] ? "data:image/jpeg;base64," + cache[name] : i.src;
                        img.setAttribute('crossorigin', '*');
                        // @ts-ignore
                        console.log()

                        // const obj = localStorage.getItem('images')
                        // console.log(JSON.stringify(obj))
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

function getBase64Image(img: HTMLImageElement) {

    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx!.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/jpeg");

    return dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
}