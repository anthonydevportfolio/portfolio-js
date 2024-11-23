import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC } from 'react';
import { useLogger, useSelectorw } from '../../redux/hooks';
import useImagePreloader from '../../useImagePreloader';
import { MQ } from '../../util';
import { ExperienceData } from '../experience/data';
import { Experience } from '../experience/experience';
import { cb } from '../landing/greeting';
import { technologies } from '../me/data';
import { Me } from '../me/me';
import { Projects } from '../projects/projects';
import { projectsData } from '../projects/projectsData';
import { Footer } from './footer';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const allImageUrls = [
    ...ExperienceData.map(e => e.img),
    ...technologies.map(t => t.src),
    ...projectsData.map(p => p.img)
];


export const View: FC = () => {
    useLogger('View');

    const isOnLandingPage = useSelectorw(state => state.global.isOnLandingPage);
 
    const loaded = useImagePreloader(allImageUrls);

    if (!loaded) return <>Loading..</>
    if (isOnLandingPage) return <></>;
    return (
        <ViewBase id="view">
            <Me />
            <Experience />
            <Projects />
            <Footer />
        </ViewBase>
    );
};

const ViewBase = styled('span')({
    paddingTop: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 2,
    animation: `${fadeIn} 1s ${cb} forwards 1.5s`,
    overflowY: 'scroll',
    gap: '30px',

    [MQ.mobile]: {
        paddingTop: '200px',
        paddingBottom: '200px',
        gap: 0,
        overflowX: 'hidden'
    }
});
