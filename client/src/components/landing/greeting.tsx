import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatchw, useSelectorw } from '../../redux/hooks';
import { setIsOnLandingPage } from '../../redux/slices/global';
import { setIsHoveringButton } from '../../redux/slices/landing';
import { FancyButton } from '../button/fancyButton';

export const cb = 'cubic-bezier(.28,.83,0,.99)';

export const Greeting = () => {
    const dispatch = useDispatchw();
    const isOnLandingPage = useSelectorw(state => state.global.isOnLandingPage);
    const [exited, setExited] = useState(false);

    const handleClick = () => {
        dispatch(setIsOnLandingPage(false));
        dispatch(setIsHoveringButton(false));

        setTimeout(() => {
            setExited(true);
        }, 2000);
    };
    return (
        <GreetingBase shouldExit={!isOnLandingPage} exited={exited}>
            <GreetingHeader>Hello, World!</GreetingHeader>
            <GreetingTextContainer>
                <GreetingText>I'm Anthony</GreetingText>
            </GreetingTextContainer>
            <FancyButton
                onClick={handleClick}
                onMouseEnter={() => dispatch(setIsHoveringButton(true))}
                onMouseLeave={() => dispatch(setIsHoveringButton(false))}>
                Get to know me
            </FancyButton>
        </GreetingBase>
    );
};

const fadeDown = keyframes({
    from: {
        bottom: '5vw',
        left: '5vw'
    },
    to: {
        opacity: 1,
        bottom: '0vw',
        left: '0vw'
    }
});

const fadeUp = keyframes({
    from: {
        top: '3vw',
        right: '3vw'
    },
    to: {
        opacity: 1,
        top: '0vw',
        right: '0vw'
    }
});

const fadeOut = keyframes({
    from: {
        opacity: 1
    },
    to: {
        opacity: 0
    }
});

const GreetingBase = styled('div')<{ shouldExit: boolean; exited: boolean }>(({ shouldExit, exited }) => ({
    flexDirection: 'column',
    position: 'absolute',
    display: exited ? 'none' : 'flex',
    padding: '1rem',
    zIndex: 5,
    textAlign: 'center',
    overflow: 'visible',
    animation: `${shouldExit && fadeOut} 1s ${cb} forwards 800ms`,

    '& > *': {
        position: 'relative'
    },

    '@media (max-width: 768px)': {
        transform: 'translateY(100%)'
    }
}));

const GreetingHeader = styled('h1')({
    bottom: '5vw',
    left: '5vw',
    animation: `${fadeDown} 1s ${cb} forwards`,
    animationDelay: '0',
    fontSize: '3rem',
    color: 'white'
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
    top: '3vw',
    animation: `${fadeUp} 1s ${cb} forwards`,
    animationDelay: '0',
    fontSize: '1.7rem',
    color: 'white'
});
