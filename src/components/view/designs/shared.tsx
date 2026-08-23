import { FC } from 'react';
import { handleImageError } from '../../../imageFallback';
import { ProjectData } from '../../projects/projectsData';
import { projectImageDimensions } from '../viewData';

export const ExternalLinkIcon = () => (
    <svg aria-hidden='true' className='portfolio-external-icon' viewBox='0 0 20 20'>
        <path d='M6.75 13.25 13.25 6.75M8 6.75h5.25V12' />
    </svg>
);

interface ProjectImageProps {
    className?: string;
    eager?: boolean;
    project: ProjectData;
}

export const ProjectImage: FC<ProjectImageProps> = ({ className, eager = false, project }) => {
    const dimensions = projectImageDimensions[project.name];

    return (
        <img
            alt={`${project.name} application screenshot`}
            className={className}
            decoding='async'
            height={dimensions.height}
            loading={eager ? 'eager' : 'lazy'}
            onError={handleImageError}
            src={project.img}
            width={dimensions.width}
        />
    );
};
