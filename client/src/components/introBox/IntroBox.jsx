import { AnimatePresence, motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import '../box.css';
import './IntroBox.css';
import { Links } from './Links';

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
                    I'm a software engineer from Washington State, now based in Portland, OR. 
                    I specialize in crafting solutions using the latest tech, with strongest skills in Java and Java/TypeScript. 
                    Software development is my passion, and I'm constantly on the lookout for my next adventure in the field.
                    </p>

                </motion.section>
            </AnimatePresence>
            <Links />
        </div>
    );
};

export default IntroBox;
