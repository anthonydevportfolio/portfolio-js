import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { useDispatchw, useSelectorw } from '../../redux/hooks';
import { setIsOnLandingPage } from '../../redux/slices/global';
import { setIsExited, setIsExiting, setIsHoveringButton } from '../../redux/slices/landing';
import { FancyButton } from '../button/fancyButton';

export const cb = 'cubic-bezier(.28,.83,0,.99)';

export const Greeting = () => {
    const dispatch = useDispatchw();
    const isExited = useSelectorw(state => state.landing.isExited);

    const handleClick = () => {
        dispatch(setIsOnLandingPage(false));
        dispatch(setIsHoveringButton(false));

        setTimeout(() => {
            dispatch(setIsExiting(true));
        }, 800);

        setTimeout(() => {
            dispatch(setIsExited(true));
        }, 2000);
    };
    return (
        <GreetingBase exited={isExited}>
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
