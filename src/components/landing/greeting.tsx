import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useDispatchw, useSelectorw } from '../../redux/hooks';
import { setIsOnLandingPage } from '../../redux/slices/global';
import { setIsExited, setIsExiting, setIsHoveringButton } from '../../redux/slices/landing';
import { FancyButton } from '../button/fancyButton';

export const cb = 'cubic-bezier(.28,.83,0,.99)';
export const LANDING_EXIT_DURATION_MS = 450;

const BUTTON_ANIMATION_DURATION_MS = 1000;
const BUTTON_SETTLE_DURATION_MS = 25;
const LANDING_EXIT_START_MS = BUTTON_ANIMATION_DURATION_MS + BUTTON_SETTLE_DURATION_MS;

export const Greeting = () => {
    const dispatch = useDispatchw();
    const isExited = useSelectorw(state => state.landing.isExited);
    const [isTransitioning, setIsTransitioning] = useState(false);

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
        <GreetingBase exited={isExited}>
            <GreetingHeader>Hello, World!</GreetingHeader>
            <GreetingTextContainer>
                <GreetingText>I'm Anthony</GreetingText>
            </GreetingTextContainer>
            <FancyButton
                onClick={handleClick}
                disabled={isTransitioning}
                onMouseEnter={() => dispatch(setIsHoveringButton(true))}
                onMouseLeave={() => dispatch(setIsHoveringButton(false))}>
                Get to know me
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

const GreetingBase = styled('div')<{ exited: boolean }>(({ exited }) => ({
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
}));

const GreetingHeader = styled('h1')({
    animation: `${focusReveal} 550ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both`,
    fontSize: '3rem',
    color: 'white',

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
    color: 'white',

    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none'
    }
});
