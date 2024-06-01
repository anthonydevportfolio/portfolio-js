import { useEffect, useRef } from "react";

export const Bar = ({ mobile, listRef, active }) => {
    const barRef = useRef();

    useEffect(() => {
        let barElement = barRef.current;

        if (barElement) {
            barRef.current.style.top =
                listRef.current.children[active].offsetTop + listRef.current.children[active].offsetHeight / 15;
            barRef.current.style.height = listRef.current.children[active].offsetHeight;
        }
    }, [window.innerWidth, window.innerHeight]);

    const activeChild = listRef.current.children[active];
    const commonStyles = mobile 
        ? { left: activeChild.offsetLeft, width: activeChild.offsetWidth } 
        : { top: activeChild.offsetTop + activeChild.offsetHeight / 15, height: activeChild.offsetHeight };

    return (
        <section
            ref={barRef}
            className={`bar ${mobile ? 'horizontal' : ''}`}
            style={commonStyles}
        ></section>
    );
};
