import { motion } from 'framer-motion';

const ExperienceDetailItem = ({ detail, animation }) => (
    <motion.li className='experienceDetail' initial={{ y: '100px', opacity: 0 }} animate={animation}>
        {detail}
    </motion.li>
);

export default ExperienceDetailItem;
