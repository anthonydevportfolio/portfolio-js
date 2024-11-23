import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC, memo, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import extLinkIcon from '../../assets/external-link.png';
import { MQ } from '../../util';
import { cb } from '../landing/greeting';
import { ProjectData } from './projectsData';

interface ProjectProps {
    project: ProjectData;
    idx: number;
}

export const Project: FC<ProjectProps> = memo(({ project, idx }) => {
    const isOdd = idx % 2 !== 0;

    const sentinel = useRef<HTMLDivElement | null>(null);
    const { inViewport, enterCount } = useInViewport(sentinel);

    const shouldRender = inViewport || enterCount > 0;
    return (
        <>
            <Sentinel className='sentinel' ref={sentinel} />
            {!shouldRender && <ProjectContainer isOdd />}
            {shouldRender && (
                <ProjectContainer isOdd={isOdd}>
                    <ProjectImage isOdd={isOdd} src={project.img} />
                    <ProjectDetails isOdd={isOdd}>
                        <ProjectName>
                            <h1>{project.name}</h1>
                        </ProjectName>
                        <ProjectStack>
                            {project.stack.map((item, idx) => (
                                <p key={idx}>
                                    {item}
                                    {idx < project.stack.length - 1 && ','}
                                </p>
                            ))}
                        </ProjectStack>
                        <ProjectDescriptionContainer>
                            {project.description.map((line, idx) => (
                                <ProjectDescription key={idx}>{line}</ProjectDescription>
                            ))}
                        </ProjectDescriptionContainer>
                        {!!project.url && (
                            <ViewAppLink href={project.url} target='_blank'>
                                View live app
                                <Icon src={extLinkIcon} />
                            </ViewAppLink>
                        )}
                    </ProjectDetails>
                </ProjectContainer>
            )}
        </>
    );
});

const Sentinel = styled('span')({
    width: '100px',
    height: '100px',
    transform: 'translateY(15vh)',
    [MQ.mobile]: {
        transform: 'translateY(25vh)',
    }
});

const slideInEven = keyframes({
    from: {
        transform: 'translateX(-1vw)',
    },
    to: {
        transform: 'translateX(0)',
    }
});

const slideInOdd = keyframes({
    from: {
        transform: 'translateX(1vw)',
    },
    to: {
        transform: 'translateX(0)',
    }
});


const slideInDetailsEven = keyframes({
    from: {
        transform: 'translateX(-8vw)',
    },
    to: {
        transform: 'translateX(-9vw)',
    }
});

const slideInDetailsOdd = keyframes({
    from: {
        transform: 'translateX(10vw)',
    },
    to: {
        transform: 'translateX(11vw)',
    }
});

const slideDown = keyframes({
    from: {
        transform: 'translateY(-2vh)',
    },
    to: {
        transform: 'translateY(1vh)',
    }
});

const slideUp = keyframes({
    from: {
        transform: 'translateY(2vh)',
    },
    to: {
        transform: 'translateY(-1vh)',
    }
});

interface Props {
    isOdd: boolean;
}

const ProjectContainer = styled('div')<Props>(({ isOdd }) => ({
    minHeight: '487px',
    display: 'flex',
    alignItems: isOdd ? 'flex-end' : 'flex-start',
    flexDirection: isOdd ? 'row-reverse' : 'row',

    [MQ.mobile]: {
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const ProjectImage = styled('img')<Props>(({ isOdd }) => ({
    top: '0.5rem',
    width: '40vw',
    height: 'auto',
    position: 'relative',
    zIndex: 2,
    willChange: 'transform',
    animation: `${isOdd ? slideInOdd : slideInEven} 1.5s forwards`,

    [MQ.mobile]: {
        width: '111%',
        height: 'auto',
        transform: 'translateY(-5vh)',
        // zIndex: 1,
        animation: `${slideDown} 1.5s ${cb} forwards`
    }
}));

const ProjectDetails = styled('div')<Props>(({ isOdd }) => ({
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '2rem',
    boxShadow: 'rgba(31, 38, 46, 0.12) 0px 2px 8px 0px, rgba(31, 38, 46, 0.08) 0px 4px 16px 0px',
    width: '30vw',
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    willChange: 'transform',
    animation: `${isOdd ? slideInDetailsOdd : slideInDetailsEven} 1.5s ${cb} forwards`,

    '& > *': {
        marginLeft: isOdd ? 0 : '10rem',
        marginRight: isOdd ? '10rem' : 0
    },

    [MQ.mobile]: {
        transform: 'translateY(5vh)',
        width: '100%',
        height: 'unset',
        animation: `${slideUp} 1.5s ${cb} forwards`,

        '& > *': {
            marginLeft: 0,
            marginRight: 0
        },
       
    }
}));

const ProjectName = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& > h1': {
        fontWeight: '500',
        fontSize: '1.5rem'
    }
});

const ProjectDescription = styled('p')({});

const ProjectDescriptionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
    padding: '1rem 0'
});

const ProjectStack = styled('div')({
    display: 'flex',
    padding: '1rem 0',
    columnGap: '.5rem',
    fontStyle: 'italic',
    flexWrap: 'wrap',
});

const Icon = styled('img')({
    marginLeft: '0.5rem',
    width: '1rem',
    opacity: 0,
    transition: 'all 200ms'
});

const ViewAppLink = styled('a')({
    fontWeight: '500',
    textDecoration: 'none',
    fontSize: '1.1rem',
    color: '#0875e1',
    marginTop: '1rem',

    '&:hover': {
        color: '#004387',

        '& img': {
            opacity: 1
        }
    }
});
