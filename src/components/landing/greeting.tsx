import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { portfolio } from '../../data/portfolio';
import { useDispatchw, useSelectorw } from '../../redux/hooks';
import { setIsOnLandingPage } from '../../redux/slices/global';
import { setIsExited, setIsExiting, setIsHoveringButton } from '../../redux/slices/landing';
import { useTheme } from '../../theme';
import { FancyButton } from '../button/fancyButton';

export const cb = 'cubic-bezier(.28,.83,0,.99)';
export const LANDING_EXIT_DURATION_MS = 450;

const BUTTON_ANIMATION_DURATION_MS = 1000;
const BUTTON_SETTLE_DURATION_MS = 25;
const LANDING_EXIT_START_MS = BUTTON_ANIMATION_DURATION_MS + BUTTON_SETTLE_DURATION_MS;
const GREETING_COPY_EXIT_DURATION_MS = 300;
const GREETING_COPY_EXIT_DELAY_MS = LANDING_EXIT_START_MS - GREETING_COPY_EXIT_DURATION_MS;
const REDUCED_MOTION_COPY_EXIT_DURATION_MS = 180;
const REDUCED_MOTION_COPY_EXIT_DELAY_MS = LANDING_EXIT_START_MS - REDUCED_MOTION_COPY_EXIT_DURATION_MS;

export const Greeting = () => {
    const dispatch = useDispatchw();
    const isExited = useSelectorw(state => state.landing.isExited);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        if (!isTransitioning) return;

        const exitTimer = window.setTimeout(() => {
            dispatch(setIsExiting(true));
        }, LANDING_EXIT_START_MS);

        const completeTimer = window.setTimeout(() => {
            dispatch(setIsOnLandingPage(false));
            dispatch(setIsExited(true));
        }, LANDING_EXIT_START_MS + LANDING_EXIT_DURATION_MS);

        return () => {
            window.clearTimeout(exitTimer);
            window.clearTimeout(completeTimer);
        };
    }, [dispatch, isTransitioning]);

    const handleClick = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        dispatch(setIsHoveringButton(false));
    };

    return (
        <GreetingBase data-landing-reading-zone exited={isExited} resolvedTheme={theme}>
            <GreetingCopy isTransitioning={isTransitioning}>
                <GreetingHeader>{portfolio.landing.greeting}</GreetingHeader>
                <GreetingTextContainer>
                    <GreetingText>{portfolio.landing.introduction}</GreetingText>
                </GreetingTextContainer>
            </GreetingCopy>
            <FancyButton
                onClick={handleClick}
                disabled={isTransitioning}
                onMouseEnter={() => dispatch(setIsHoveringButton(true))}
                onMouseLeave={() => dispatch(setIsHoveringButton(false))}>
                {portfolio.landing.action}
            </FancyButton>
        </GreetingBase>
    );
};

const focusReveal = keyframes({
    from: {
        opacity: 0,
        filter: 'blur(4px)',
        transform: 'scale(0.99)'
    },
    to: {
        opacity: 1,
        filter: 'blur(0)',
        transform: 'scale(1)'
    }
});

const focusExit = keyframes({
    from: {
        opacity: 1,
        filter: 'blur(0)',
        transform: 'translateY(0)'
    },
    to: {
        opacity: 0.01,
        filter: 'blur(4px)',
        transform: 'translateY(-12px)'
    }
});

const reducedMotionFocusExit = keyframes({
    from: {
        opacity: 1
    },
    to: {
        opacity: 0.01
    }
});

const GreetingBase = styled('div')<{ exited: boolean; resolvedTheme: 'dark' | 'light' }>(
    ({ exited, resolvedTheme }) => ({
        '--landing-foreground': resolvedTheme === 'light' ? '#171922' : '#ffffff',
        '--landing-button-foreground': resolvedTheme === 'light' ? '#171922' : '#ffffff',
        '--landing-button-bg': resolvedTheme === 'light' ? 'rgba(23, 25, 34, 0.12)' : 'rgba(255, 255, 255, 0.3)',
        '--landing-button-hover-bg': resolvedTheme === 'light' ? 'rgba(23, 25, 34, 0.18)' : 'rgba(255, 255, 255, 0.4)',
        '--landing-button-active-bg': resolvedTheme === 'light' ? 'rgba(23, 25, 34, 1)' : 'rgba(255, 255, 255, 1)',
        '--landing-button-settled-bg':
            resolvedTheme === 'light' ? 'rgba(23, 25, 34, 0.14)' : 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'column',
        position: 'absolute',
        display: exited ? 'none' : 'flex',
        padding: '1rem',
        zIndex: 5,
        textAlign: 'center',
        overflow: 'visible',

        '& > *': {
            position: 'relative'
        },

        '@media (max-width: 768px)': {
            transform: 'translateY(100%)'
        }
    })
);

const GreetingCopy = styled('div')<{ isTransitioning: boolean }>(({ isTransitioning }) => ({
    animation: isTransitioning
        ? `${focusExit} ${GREETING_COPY_EXIT_DURATION_MS}ms cubic-bezier(0.4, 0, 1, 1) ${GREETING_COPY_EXIT_DELAY_MS}ms both`
        : 'none',
    position: 'relative',

    '@media (prefers-reduced-motion: reduce)': {
        animation: isTransitioning
            ? `${reducedMotionFocusExit} ${REDUCED_MOTION_COPY_EXIT_DURATION_MS}ms linear ${REDUCED_MOTION_COPY_EXIT_DELAY_MS}ms both`
            : 'none'
    }
}));

const GreetingHeader = styled('h1')({
    animation: `${focusReveal} 550ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both`,
    fontSize: '3rem',
    color: 'var(--landing-foreground)',
    userSelect: 'none',

    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none'
    }
});

const GreetingTextContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 2,
    rowGap: '1rem',
    overflow: 'visible'
});

const GreetingText = styled('p')({
    position: 'relative',
    animation: `${focusReveal} 550ms cubic-bezier(0.16, 1, 0.3, 1) 250ms both`,
    fontSize: '1.7rem',
    color: 'var(--landing-foreground)',
    userSelect: 'none',

    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none'
    }
});
