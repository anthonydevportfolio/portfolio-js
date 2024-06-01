import { useMemo } from 'react';
import ExperienceDetailItem from './ExperienceDetailItem';
import ExperienceTitle from './ExperienceTitle';

const ExperienceDetails = ({ activeDetails, detailsShowing, detailAnimationDelays }) => {
    const animations = useMemo(() =>
        activeDetails.info.map((_, index) => ({
            y: 0,
            opacity: 1,
            transition: {
                damping: 100,
                duration: 0.7,
                ease: 'easeOut',
                delay: detailAnimationDelays[index],
            },
        })), [detailAnimationDelays, activeDetails.info]);

    return (
        <div className='experienceDetails'>
            <ExperienceTitle
                title={activeDetails.title}
                name={activeDetails.name}
                from={activeDetails.from}
                to={activeDetails.to}
            />
            {detailsShowing && (
                <ul className='experienceDetailsList'>
                    {activeDetails.info.map((detail, key) => (
                        <ExperienceDetailItem
                            key={key}
                            detail={detail}
                            animation={animations[key]}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExperienceDetails;
