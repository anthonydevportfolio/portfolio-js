import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './App.css';
import ExperienceBox from './components/experienceBox/ExperienceBox';
import IntroBox from './components/introBox/IntroBox';
import ProjectsBox from './components/projectsBox/ProjectsBox';
import arrow from './static/arrow.png';

function App() {
    const [yOffset, setYOffset] = useState(window.pageYOffset);
    const slideIn = { y: '0px', transition: { damping: 100, duration: '1', ease: 'easeOut' } };
    const [mobile, setMobile] = useState(false);

    const updateScroll = () => {
        setYOffset(window.pageYOffset);
    };

    const arrowOffsetReq = () => {
        return mobile ? 50 : 100;
    };

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        setMobile(window.innerWidth < 720 ? true : false);
        document.title = 'Anthony';
    }, []);

    const bouncingArrow = (
        <AnimatePresence>
            <motion.img
                initial={{ y: '0', opacity: 0.2 }}
                animate={{
                    y: '1vh',
                    opacity: 1,
                    transition: {
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: '1'
                    }
                }}
                exit={{ opacity: 0 }}
                className='arrow'
                src={arrow}
            />
        </AnimatePresence>
    );

    return (
        <div className='App'>
            <IntroBox slideIn={slideIn} subHeader={'I build things with code'} />
            {yOffset < arrowOffsetReq() && bouncingArrow}
            <ProjectsBox slideIn={slideIn} yOffset={yOffset} mobile={mobile} subHeader={'Projects'} />
            <ExperienceBox yOffset={yOffset} slideIn={slideIn} mobile={mobile} subHeader={'Experience'} />
        </div>
    );
}

export default App;
