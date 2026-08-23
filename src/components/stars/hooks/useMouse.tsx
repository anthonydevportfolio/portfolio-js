import { useEffect, useRef } from 'react';
import { useSelectorw } from '../../../redux/hooks'; // Make sure this is the correct hook

export const useMouse = () => {
    const mouseXRef = useRef(0);
    const mouseYRef = useRef(0);
    const mouseHasMovedRef = useRef(false);
    const mouseTrackingExitedRef = useRef(false);

    // Get the landing page status from the Redux store
    const isOnLandingPage = useSelectorw(state => state.global.isOnLandingPage);

    useEffect(() => {
        if (!isOnLandingPage) {
            mouseTrackingExitedRef.current = true;
            return;
        }

        mouseTrackingExitedRef.current = false;

        const handleMouseMove = (event: MouseEvent) => {
            mouseXRef.current = event.clientX;
            mouseYRef.current = event.clientY;
            mouseHasMovedRef.current = true;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isOnLandingPage]);

    return { mouseXRef, mouseYRef, mouseHasMovedRef, mouseTrackingExitedRef };
};
