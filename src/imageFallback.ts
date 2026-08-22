import type { SyntheticEvent } from 'react';
import imagePlaceholder from './assets/image-placeholder.svg';

export { imagePlaceholder };

export const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;

    if (image.dataset.fallbackApplied === 'true') return;

    image.dataset.fallbackApplied = 'true';
    image.src = imagePlaceholder;
};
