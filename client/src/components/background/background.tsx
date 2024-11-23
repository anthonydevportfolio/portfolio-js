import styled from '@emotion/styled';
import { FC } from 'react';
import { useSelectorw } from '../../redux/hooks';
import { Stars } from '../stars/stars';
import { Filter } from './filter';

interface BackgroundProps {
    children: React.ReactNode;
}

export const Background: FC<BackgroundProps> = ({ children }) => {
    const isOnLandingPage = useSelectorw(state => state.global.isOnLandingPage);
    return (
        <BackgroundBase>
            <Stars isOnLandingPage={isOnLandingPage} />
            <Filter />
            {children}
        </BackgroundBase>
    );
};

const BackgroundBase = styled('div')({
    backgroundColor: 'rgb(0, 0, 0)',
    position: 'relative',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    padding: 0,
    margin: 0,
    fontFamily: '"Montserrat", Arial;',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Mobile
    '@media (max-width: 768px)': {
        alignItems: 'flex-start',
        width: '100vw',
        height: '120vh',
        bottom: 0,
        right: 0,
        overflowY: 'auto',
        flexWrap: 'wrap'
    }
});
