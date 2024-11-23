import { useEffect, useState } from 'react';

const useImagePreloader = (imageUrls: string[]): boolean => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!imageUrls || imageUrls.length === 0) {
            setLoaded(true);
            return;
        }

        const images = imageUrls.map(url => {
            const img = new Image();
            img.src = url;
            return img;
        });

        let isMounted = true; // To avoid setting state on unmounted components
        const handleLoad = () => {
            if (isMounted) {
                setLoaded(true);
            }
        };

        const loadPromises = images.map(img => new Promise(resolve => (img.onload = resolve)));

        Promise.all(loadPromises).then(handleLoad);

        return () => {
            isMounted = false;
        };
    }, [imageUrls]);

    return loaded;
};

export default useImagePreloader;
