import styled from '@emotion/styled';
import { FC, memo, useEffect, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { MQ } from '../../util';
import { Base, BaseBody, BaseHeader, Sentinel } from '../me/me';
import { Project } from './project';
import { projectsData } from './projectsData';

export const Projects: FC = memo(() => {
    useLogger('Projects');

    const sentinel = useRef<HTMLDivElement | null>(null);

    const baseRef = useRef<HTMLDivElement | null>(null);
    const containerHeight = useRef<number | undefined>();
    const containerSizeEstablished = useSelectorw(state => state.global.containerSizeEstablished);

    const { inViewport } = useInViewport(sentinel);

    useEffect(() => {
        if (baseRef.current) {
            const newHeight = Number(baseRef.current?.clientHeight);

            if (!containerHeight.current || (!isNaN(newHeight) && newHeight > containerHeight.current)) {
                containerHeight.current = Number(baseRef.current?.clientHeight);
            }
        }
    }, [inViewport]);

    return (
        containerSizeEstablished && (
            <Base ref={baseRef} style={{ minHeight: containerHeight.current, marginTop: '2rem' }}>
                <Sentinel ref={sentinel} color='purple' />
                {inViewport && (
                    <BaseBody style={{ gap: '7rem' }}>
                        <BaseHeader>Projects</BaseHeader>
                        <ProjectsContainer>
                            {projectsData.map((project, i) => (
                                <Project key={i} idx={i} project={project} />
                            ))}
                        </ProjectsContainer>
                    </BaseBody>
                )}
            </Base>
        )
    );
});

const ProjectsContainer = styled('div')({
    width: '90%',
    margin: 'auto',
    position: 'relative',

    [MQ.desktop]: {
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '200px'
    }
});
