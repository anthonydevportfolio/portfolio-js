import { useEffect, useState } from 'react';
import { imagePlaceholder } from './imageFallback';

const preloadImage = (url: string) =>
    new Promise<void>(resolve => {
        const image = new Image();

        image.onload = () => resolve();
        image.onerror = () => {
            image.onerror = () => resolve();
            image.src = imagePlaceholder;
        };
        image.src = url;
    });

const useImagePreloader = (imageUrls: string[]): boolean => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) {
            setLoaded(true);
            return;
        }

        let isMounted = true; // To avoid setting state on unmounted components
        const handleLoad = () => {
            if (isMounted) {
                setLoaded(true);
            }
        };

        Promise.all(imageUrls.map(preloadImage)).then(handleLoad);

        return () => {
            isMounted = false;
        };
    }, [imageUrls]);

    return loaded;
};

export default useImagePreloader;
