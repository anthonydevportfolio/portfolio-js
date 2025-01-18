import { useCallback, useEffect, useState } from 'react';
import { useSelectorw } from '../../../redux/hooks'; // Make sure this is the correct hook

export const useMouse = () => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [mouseHasMoved, setMouseHasMoved] = useState(false);
    const [mouseTrackingExited, setMouseTrackingExited] = useState(false);

    // Get the landing page status from the Redux store
    const isOnLandingPage = useSelectorw(state => state.global.isOnLandingPage);

    // Memoize the event handler so it does not change on every render
    const handleMouseMove = useCallback((e: MouseEvent) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
        setMouseHasMoved(true);
    }, []);

    useEffect(() => {
        // Add event listener only when `isOnLandingPage` is true
        if (isOnLandingPage) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            // Remove event listener if `isOnLandingPage` is false
            setMouseTrackingExited(true);
            window.removeEventListener('mousemove', handleMouseMove);
        }

        // Clean up the event listener on unmount or when `isOnLandingPage` changes
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isOnLandingPage, handleMouseMove]); // Add `handleMouseMove` to the dependency array

    return { mouseX, mouseY, mouseHasMoved, mouseTrackingExited };
};
