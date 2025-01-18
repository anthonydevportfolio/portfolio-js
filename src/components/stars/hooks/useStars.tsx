import { useEffect, useRef } from 'react';
import { useSelectorw } from '../../../redux/hooks';
import { constellations } from '../constellations';

const STAR_WIDTH = 4;
const STAR_HEIGHT = 4;

export interface Star {
    initialX: number;
    initialY: number;
    x: number;
    y: number;
    color: string;
    scale: number;
    vx: number; // Velocity in the x-direction
    vy: number; // Velocity in the y-direction
    opacity: number;
    constellationKey?: string;
    isOriginOfConstellation?: boolean;
    connectsTo?: string[];
    connectionId?: string;
    relativeX?: number;
    relativeY?: number;
}

// Star data generation function
export const generateStars = (num: number): Star[] => {
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    const stars: Star[] = [];

    for (let i = 0; i < num; i++) {
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        stars.push({
            x,
            initialX: x,
            y,
            initialY: y,
            color: `${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}`,
            scale: Math.random() * 0.7 + 0.3,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            opacity: 0
        });
    }

    return stars;
};

export const getStarCenter = (star: Star) => ({
    centerX: star.x + STAR_WIDTH / 2,
    centerY: star.y + STAR_HEIGHT / 2
});

export const useStars = () => {
    const starsRef = useRef<Star[]>([]);
    const { isOnLandingPage } = useSelectorw(state => state.global);

    // Number of stars per 10000 square pixels
    const starDensity = isOnLandingPage ? 20 : 1;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const numOfStars = Math.floor(((width * height) / 100000) * starDensity);

    useEffect(() => {
        const constallationStars: Star[] = constellations.flat().map(star => ({
            ...star,
            color: '192, 192, 192',
            scale: 1,
            vx: 0,
            vy: 0,
            opacity: 0,
            isPartOfConstellation: true
        }));
        const generatedStars = generateStars(numOfStars - constallationStars.length);
        starsRef.current = [...constallationStars, ...generatedStars];

        console.log('generating ' + numOfStars + ' stars');
    }, [numOfStars]);

    return starsRef;
};
