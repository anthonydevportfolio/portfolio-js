// Ursa Major Data
export const ursaMajor = {
    origin: { x: 0, y: 0, connectionId: 'merak', connectsTo: ['dubhe', 'phecda'], isOriginOfConstellation: true },
    rest: [
        { relativeX: 22, relativeY: 385, connectionId: 'dubhe', connectsTo: ['merak', 'megrez'] }, // Dubhe
        { relativeX: 603, relativeY: -193, connectionId: 'phecda', connectsTo: ['megrez', 'merak'] }, // Phecda
        { relativeX: 854, relativeY: 47, connectionId: 'megrez', connectsTo: ['dubhe', 'phecda', 'alioth'] }, // Megrez
        { relativeX: 1300, relativeY: -31, connectionId: 'alioth', connectsTo: ['megrez', 'mizar'] }, // Alioth
        { relativeX: 1646, relativeY: -105, connectionId: 'mizar', connectsTo: ['alioth', 'alkaid'] }, // Mizar
        { relativeX: 1920, relativeY: -508, connectionId: 'alkaid', connectsTo: ['mizar'] } // Alkaid
    ]
};

const scale = 0.1;

const createConstellation = (
    mapping: { origin: { x: number; y: number }; rest: { relativeX: number; relativeY: number }[] },
    constellationKey: string,
    offsetX: number = 0,
    offsetY: number = 0
) => {
    const mappingArray = [
        mapping.origin,
        ...mapping.rest.map(star => ({
            ...star,
            x: mapping.origin.x + star.relativeX,
            y: mapping.origin.y + star.relativeY
        }))
    ];

    const xs = mappingArray.map(({ x }) => x);
    const ys = mappingArray.map(({ y }) => y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const constellationCenterX = (minX + maxX) / 2;
    const constellationCenterY = (minY + maxY) / 2;

    const canvasCenterX = 1920 / 3;
    const canvasCenterY = 893 / 3;

    return mappingArray.map(star => ({
        ...star,
        x: (star.x - constellationCenterX) * scale + canvasCenterX + offsetX,
        y: (star.y - constellationCenterY) * scale + canvasCenterY + offsetY,
        initialX: (star.x - constellationCenterX) * scale + canvasCenterX + offsetX,
        initialY: (star.y - constellationCenterY) * scale + canvasCenterY + offsetY,
        constellationKey
    }));
};

// Create and export the scaled constellations
export const constellations = [createConstellation(ursaMajor, 'ursaMajor')];
