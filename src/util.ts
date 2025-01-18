export const MQ = {
    mobile: '@media (max-width: 768px)',
    desktopSmall: '@media (max-width: 1600px)',
    desktopMedium: '@media (max-width: 1814px)',
    desktop: '@media (min-width: 1815px)'
};

export type ValueOf<T> = T[keyof T];