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

        const handlePointerMove = (event: PointerEvent) => {
            mouseXRef.current = event.clientX;
            mouseYRef.current = event.clientY;
            mouseHasMovedRef.current = true;
        };

        window.addEventListener('pointerdown', handlePointerMove, { passive: true });
        window.addEventListener('pointermove', handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener('pointerdown', handlePointerMove);
            window.removeEventListener('pointermove', handlePointerMove);
        };
    }, [isOnLandingPage]);

    return { mouseXRef, mouseYRef, mouseHasMovedRef, mouseTrackingExitedRef };
};
