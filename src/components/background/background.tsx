import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useSelectorw } from '../../redux/hooks';
import { useTheme } from '../../theme';
import { LANDING_EXIT_DURATION_MS } from '../landing/greeting';
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
    const { theme } = useTheme();

    return (
        !isExited && (
            <BackgroundBase isExiting={isExiting} resolvedTheme={theme}>
                <Stars isOnLandingPage={isOnLandingPage} />
                <Filter />
                {children}
            </BackgroundBase>
        )
    );
};

const BackgroundBase = styled('div')<{ isExiting: boolean; resolvedTheme: 'dark' | 'light' }>(
    ({ isExiting, resolvedTheme }) => ({
        backgroundColor: resolvedTheme === 'light' ? '#f6f7fb' : 'rgb(0, 0, 0)',
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
        animation: isExiting ? `${fadeOut} ${LANDING_EXIT_DURATION_MS}ms cubic-bezier(0.4, 0, 1, 1) forwards` : 'none',

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
    })
);
