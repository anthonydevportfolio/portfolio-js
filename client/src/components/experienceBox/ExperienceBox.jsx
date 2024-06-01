import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import experience from '../../util/experience';
import '../box.css';
import { Bar } from './Bar';
import './ExperienceBox.css';
import ExperienceDetails from './ExperienceDetails';
import ExperienceList from './ExperienceList';

const ExperienceBox = ({ yOffset, slideIn, mobile, subHeader }) => {
    const listRef = useRef();
    const [active, setActive] = useState(0);
    const [activeDetails, setActiveDetails] = useState(experience.workday);
    const [detailsShowing, setDetailsShowing] = useState(true);
    const yOffsetReq = mobile ? 161 : 451;

    const detailAnimationDelays = useMemo(() =>
        activeDetails?.info.map((_, index) => index * 0.1) || [], 
        [activeDetails]
    );

    const handleClick = useCallback((item) => {
        if(experience[item] === activeDetails) {
            return;
        }
        const index = Object.keys(experience).indexOf(item);
        setActive(index);
        setActiveDetails(experience[item]);
        setDetailsShowing(false);
    }, [activeDetails]);

    useEffect(() => {
        setDetailsShowing(true);
    }, [activeDetails]);

    console.log(listRef.current)
    return (
        <AnimatePresence>
            {yOffset > yOffsetReq && (
                <motion.div className='eBox box' initial={{ y: '8vh' }} animate={slideIn}>
                    <h2 className='subHeader'>{subHeader}</h2>
                    {listRef.current && <Bar mobile={mobile} listRef={listRef} active={active} />}
                    <ExperienceList listRef={listRef} experience={experience} handleClick={handleClick} />
                    {activeDetails && (
                        <ExperienceDetails
                            activeDetails={activeDetails}
                            detailsShowing={detailsShowing}
                            detailAnimationDelays={detailAnimationDelays}
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExperienceBox;
