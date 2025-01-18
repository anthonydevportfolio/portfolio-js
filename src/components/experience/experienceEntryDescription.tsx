import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC, memo, useEffect, useState } from 'react';
import { MQ } from '../../util';
import { cb } from '../landing/greeting';

interface ExperienceEntryDescriptionProps {
    description: string[];
}

const fadeInAndUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ExperienceEntryDescription: FC<ExperienceEntryDescriptionProps> = memo(({ description }) => {
    const [animationKey, setAnimationKey] = useState(0);

    // Update animation key whenever description changes to re-trigger animations
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [description]);

    return (
        <Description key={animationKey}>
            {description.map((desc, index) => (
                <DescriptionItem
                    key={index}
                    style={{
                        animationDelay: `${100 + 50 * index}ms`
                    }}>
                    {desc}
                </DescriptionItem>
            ))}
        </Description>
    );
});

// Styled Components
const Description = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    lineHeight: '1.5'
});

const DescriptionItem = styled('div')({
    display: 'flex',
    alignItems: 'center',

    fontSize: '1.2rem',
    animation: `${fadeInAndUp} 250ms ${cb} forwards`,
    opacity: 0,
    transform: 'translateY(0)',
    '&::before': {
        content: '"•"',
        position: 'relative',

        fontSize: '3rem',
        marginRight: '2rem',
        top: '-0.25rem',
        [MQ.mobile]: {
            display: 'none'
        }
    },
    '&.title': {
        fontWeight: 'bold'
    },
    '&.subtitle': {
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    '&.description': {
        marginLeft: '1rem',
        marginTop: '0.5rem'
    },
    [MQ.mobile]: {
        fontSize: '1rem'
    }
});
