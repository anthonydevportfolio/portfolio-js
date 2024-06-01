import './IntroBox.css';
import '../box.css';
import Typewriter from 'typewriter-effect';
import { AnimatePresence, motion } from 'framer-motion';

const IntroBox = ({ slideIn, subHeader }) => {
    return (
        <div className='box introBox'>
            <h1 className='header'>
                <Typewriter
                    options={{ delay: 75 }}
                    onInit={typewriter => {
                        typewriter.typeString("hi, it's anthony").start();
                    }}
                />
            </h1>
            <AnimatePresence>
                <motion.section initial={{ y: '10vh' }} animate={slideIn}>
                    <h2 className='subHeader'>{subHeader}</h2>
                    <p>
                        I'm a software engineer from Washington State, currently based in McLean, VA. I create websites
                        and applications primarily using Java and JavaScript. I have a strong passion for computer
                        science and I'm always looking for my next adventure.
                    </p>
                </motion.section>
            </AnimatePresence>
        </div>
    );
};

export default IntroBox;
