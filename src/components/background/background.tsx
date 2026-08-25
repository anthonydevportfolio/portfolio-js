import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC, useEffect } from 'react';
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

    useEffect(() => {
        if (isExited) return;

        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousBodyOverflow = document.body.style.overflow;
        const previousBodyOverscrollBehavior = document.body.style.overscrollBehavior;

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';

        return () => {
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousBodyOverflow;
            document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
        };
    }, [isExited]);

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
        position: 'fixed',
        overflow: 'hidden',
        overscrollBehavior: 'none',
        width: '100%',
        height: '100vh',
        inset: 0,
        padding: 0,
        margin: 0,
        fontFamily: '"Montserrat", Arial;',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: isExiting ? `${fadeOut} ${LANDING_EXIT_DURATION_MS}ms cubic-bezier(0.4, 0, 1, 1) forwards` : 'none',

        '@supports (height: 100dvh)': {
            height: '100dvh'
        },

        // Mobile
        '@media (max-width: 768px)': {
            width: '100%',
            touchAction: 'manipulation'
        }
    })
);
