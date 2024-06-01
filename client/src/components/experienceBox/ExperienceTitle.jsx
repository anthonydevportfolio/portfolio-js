import { motion } from 'framer-motion';

const ExperienceTitle = ({ title, name, from, to }) => (
    <>
        <motion.p className='experienceTitle'>
            {title} @ <span className='bold'>{name}</span>
        </motion.p>
        <motion.p className='experienceFromTo' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2, duration: 1 } }}>
            {from} - {to}
        </motion.p>
    </>
);

export default ExperienceTitle;
