import { AnimatePresence, motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import arrow from '../../static/arrow.png';
import '../box.css';
import './ProjectsBox.css';
import { ProjectsBoxEntry } from './ProjectsBoxEntry';

const ProjectsBox = ({ slideIn, yOffset, mobile, subHeader }) => {
    const yOffsetReq = mobile ? 50 : 100;

    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: mobile ? true : false,
        nextArrow: <img src={arrow} alt='' />,
        prevArrow: <img src={arrow} alt='' />
    };

    return (
        <>
            <AnimatePresence>
                {yOffset >= yOffsetReq && (
                    <motion.div
                        className='box projectsBox'
                        initial={{ y: '8vh', opacity: 0 }}
                        animate={{ ...slideIn, opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <h2 className='subHeader'>{subHeader}</h2>
                        <Slider {...settings} centerPadding={0}>
                            {entries.map((entry, key) => (
                                <ProjectsBoxEntry key={key} {...entry} />
                            ))}
                        </Slider>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const entries = [
    {
        href: 'https://www.pokedle.co',
        label: 'pokedle',
        description: `
            Wordle-inspired, Pokémon-themed guessing game developed using the standard MERN stack
        `
    },
    {
        href: 'https://github.com/Anthony4834/mario-project',
        label: 'mario',
        description: `
            Demo video game project recreating the first level of Super Mario Bros. 3 in Java 11 using LibGDX and Box2D. 
        `
    }
];

export default ProjectsBox;
