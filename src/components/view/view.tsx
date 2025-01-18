import { FC } from 'react';
import { useLogger, useSelectorw } from '../../redux/hooks';
import useImagePreloader from '../../useImagePreloader';
import { ExperienceData } from '../experience/data';
import { Experience } from '../experience/experience';
import { technologies } from '../me/data';
import { Me } from '../me/me';
import { Projects } from '../projects/projects';
import { projectsData } from '../projects/projectsData';
import { Footer } from './footer';

const allImageUrls = [
    ...ExperienceData.map(e => e.img),
    ...technologies.map(t => t.src),
    ...projectsData.map(p => p.img)
];

export const View: FC = () => {
    useLogger('View');

    const isExited = useSelectorw(state => state.landing.isExited);

    const loaded = useImagePreloader(allImageUrls);

    if (!loaded) return <>Loading..</>;
    if (!isExited) return null;

    return (
        <>
            <Me />
            <Experience />
            <Projects />
            <Footer />
        </>
    );
};

// const ViewBase = styled('span')({
//     paddingTop: '20vh',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     height: '100%',
//     opacity: 0,
//     zIndex: 2,
//     animation: `${fadeIn} 1s ${cb} forwards 1.5s`,
//     overflowY: 'scroll',
//     gap: '30px',

//     [MQ.mobile]: {
//         paddingTop: '200px',
//         paddingBottom: '200px',
//         gap: 0,
//         overflowX: 'hidden'
//     }
// });
