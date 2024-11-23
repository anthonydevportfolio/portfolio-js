import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC, memo, useRef, useState } from 'react';
import { useInViewport } from 'react-in-viewport';
import { useLogger } from '../../redux/hooks';
import { MQ } from '../../util';
import { cb } from '../landing/greeting';
import { technologies } from './data';

export const Me = memo(() => {
    useLogger('Me');
    const isMobile = window.innerWidth < 800;
    const [initialized, setInitialized] = useState(false);
    const viewSentinel = useRef<HTMLDivElement | null>(null);
    const { inViewport, enterCount } = useInViewport(viewSentinel, {}, {disconnectOnLeave: true});

    const shouldRender = (isMobile && enterCount > 0 )|| inViewport

    return (
        <>
            <Sentinel className='sentinel' id='sent' ref={viewSentinel} />
            {!shouldRender && <Base />}
            {shouldRender && (
                <Base>
                    <BaseHeader>About</BaseHeader>
                    <BaseContent>
                        <MeParagraph>
                            I am a software engineer and full-stack web developer from Washington State, currently based
                            in Portland, OR. My core expertise lies in crafting solutions using Java and TypeScript.{' '}
                            <br />
                            <br /> I am passionate about software development and am continually seeking new
                            opportunities to contribute and grow in this field. When I'm not writing code for work, I am
                            likely writing code for my own projects.
                        </MeParagraph>
                        <MeTechnologies>
                            {technologies.map((tech, i) => (
                                <Tech
                                    key={i}
                                    src={tech.src}
                                    bgc={tech.bgc}
                                    idx={i}
                                    initialized={initialized}
                                    setInitialized={val => setInitialized(val)}
                                />
                            ))}
                        </MeTechnologies>
                    </BaseContent>
                </Base>
            )}
        </>
    );
});

const Sentinel = styled('span')({
    width: '100px',
    height: '100px',
    transform: 'translateY(70vh)',
    position: 'relative',

    [MQ.mobile]: {
        transform: 'translateY(60vh)',
    }
});

export const Base = styled('div')({
    flexDirection: 'column',
    position: 'relative',
    display: 'flex',
    zIndex: 1,
    width: '100%',
    minHeight: '62%',
    minWidth: '1020px',
    gap: '100px',

    '& > *': {
        position: 'relative'
    },

    [MQ.mobile]: {
        gap: 0,
        minHeight: 'max-content',
        minWidth: 'unset'
    }
});

export const BaseHeader = styled('div')({
    color: 'rgb(230, 230, 230)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '3.5rem',
    fontWeight: 'bold',
    fontFamily: '"Montserrat", Arial',
    zIndex: 2,
    transform: 'translateY(5vh)',

    [MQ.mobile]: {
        fontSize: '2.5rem',
        transform: 'translateY(-10vh)'
    }
});

export const BaseContent = styled('div')({
    position: 'relative',
    color: 'rgb(230, 230, 230)',
    display: 'flex',
    margin: 'auto',
    width: '70%',
    alignItems: 'center',
    height: '50%',
    fontSize: '1.5rem',
    minWidth: '935px',
    maxWidth: '1650px',
    fontFamily: '"Montserrat", Arial',
    zIndex: 2,

    [MQ.mobile]: {
        margin: '0% auto',
        transform: 'translateY(-70px)',
        flexDirection: 'column-reverse',
        width: '95%',
        height: '100%',
        justifyContent: 'center',
        minWidth: 'unset'
    }
});

const MeParagraph = styled('p')({
    width: '50%',
    padding: '2rem',
    lineHeight: '2.5rem',
    textAlign: 'justify',
    fontFamily: '"Montserrat", Arial',
    zIndex: 2,

    [MQ.desktopMedium]: {
        fontSize: '1.5rem'
    },

    [MQ.desktopSmall]: {
        fontSize: '1.2rem'
    },

    [MQ.mobile]: {
        width: '100%',
        padding: '0 1rem',
        fontSize: '1.5rem',
        height: 'unset'
    }
});

interface TechProps {
    src: string;
    bgc?: string;
    idx: number;
    initialized: boolean;
    setInitialized: (val: boolean) => void;
}

const Tech: FC<TechProps> = ({ src, bgc = 'rgb(255, 255, 255)', idx, initialized, setInitialized }) => {
    // Define a function that maps the original index to the desired index
    const getMappedIndex = (index: number) => {
        // const indexMapping = [0, 6, 5, 4, 1, 2, 3]; // Desired order
        const indexMapping = [0, 2, 4, 6, 1, 3, 5]; // Desired order
        return indexMapping[index];
    };

    // Use the mapped index to calculate the animation delay
    const animationDelay = (initialized ? 100 : 1600) + getMappedIndex(idx) * 110;

    if (!initialized && getMappedIndex(idx) === 6) {
        setTimeout(() => {
            setInitialized(true);
        }, animationDelay + 1000);
    }

    return (
        <HexagonalWrapper bgc={bgc} delay={animationDelay}>
            <HexagonalImage src={src} />
        </HexagonalWrapper>
    );
};

const MeTechnologies = styled('div')({
    display: 'flex',
    flexWrap: 'wrap', // Allow items to wrap to the next line
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '410px', // Adjust as needed
    margin: '0 auto',
    position: 'relative',
    columnGap: '0px',
    transform: 'scale(1.2)',

    [MQ.mobile]: {
        maxWidth: '100%',
        transform: 'scale(0.8)',
    }
});

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const HexagonalWrapper = styled('div')<{ bgc: string; delay: number }>(({ bgc, delay }) => ({
    width: '100px',
    height: '100px',
    clipPath: `polygon(
          50% 0%,
          100% 25%,
          100% 75%,
          50% 100%,
          0% 75%,
          0% 25%
        )`,
    overflow: 'hidden',
    backgroundColor: bgc,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '1px',
    opacity: 0,
    animation: `${fadeIn} 1s ${cb} forwards ${delay}ms`,

    '&:nth-of-type(n+5)': {
        transform: 'translate(0px, -24px)'
    },

    [MQ.mobile]: {
        width: '23vw',
        height: '23vw'
    }
}));

const HexagonalImage = styled('img')({
    width: '60%', // Control the size of the image inside the Hexagon
    height: '60%',
    objectFit: 'contain'
});
