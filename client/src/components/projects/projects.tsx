import styled from '@emotion/styled';
import { FC, memo, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { useLogger } from '../../redux/hooks';
import { MQ } from '../../util';
import { Base, BaseHeader } from '../me/me';
import { Project } from './project';
import { projectsData } from './projectsData';

export const Projects: FC = memo(() => {
    useLogger('Projects');

    const sentinel = useRef<HTMLDivElement | null>(null);
    const { enterCount: viewEnterCount } = useInViewport(sentinel);

    return (
        <ProjectsBase>
            <Sentinel ref={sentinel} />
            {viewEnterCount > 0 && (
                <>
                    <ProjectsHeader>Projects</ProjectsHeader>
            <ProjectsContainer>
               {projectsData.map((project, i) => (
                   <Project key={i} idx={i} project={project} />
                ))}
            </ProjectsContainer>
                </>
            )}
        </ProjectsBase>
    );
});

const Sentinel = styled('span')({
    width: '100px',
    height: '100px',
    transform: 'translateY(40vh)',
      [MQ.mobile]: {
          transform: 'translateY(10vh)',
      },
  });

const ProjectsBase = styled(Base)({
    minWidth: '1500px',
    minHeight: '400px',
    flexDirection: 'column',
    marginTop: '40px',
    gap: '0px',

    [MQ.mobile]: {
        transform: 'translateY(30vh)',
        minWidth: 'unset',
        marginTop: '120px',
        paddingBottom: '250px',
    }
});

const ProjectsHeader = styled(BaseHeader)({
    transform: 'translateY(0)',
    marginBottom: 0
});

const ProjectsContainer = styled('div')({
    width: '90%',
    margin: '1rem auto',
    position: 'relative',
    top: -60,

    [MQ.desktop]: {
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '200px',
    },
});
