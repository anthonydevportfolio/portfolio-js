import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useSelectorw } from '../../redux/hooks';
import { cb } from '../landing/greeting';
import { Stars } from '../stars/stars';
import { Filter } from './filter';

interface BackgroundProps {
    children: React.ReactNode;
}

const fadeOut = keyframes({
    from: {
        opacity: 1
    },
    to: {
        opacity: 0
    }
});

export const Background: FC<BackgroundProps> = ({ children }) => {
    const isExited = useSelectorw(state => state.landing.isExited);
    const isExiting = useSelectorw(state => state.landing.isExiting);
    const isOnLandingPage = useSelectorw(state => state.global.isOnLandingPage);

    return (
        !isExited && (
            <BackgroundBase isExiting={isExiting}>
                <Stars isOnLandingPage={isOnLandingPage} />
                <Filter />
                {children}
            </BackgroundBase>
        )
    );
};

const BackgroundBase = styled('div')<{ isExiting: boolean }>(({ isExiting }) => ({
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
    animation: `${isExiting && fadeOut} 1s ${cb} forwards 600ms`,

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
}));
