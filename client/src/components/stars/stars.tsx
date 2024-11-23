import { useEffect, useRef } from 'react';
import { useLogger } from '../../redux/hooks';
import { useMouse } from './hooks/useMouse';
import { Star, useStars } from './hooks/useStars';

// Constants
const CONSTELLATION_COLOR = '192, 192, 192';
const MAX_CONSTELLATION_LINE_LENGTH = 100;
const CONSTELLATION_MOUSE_RANGE = 400;
const STAR_MOUSE_RANGE = CONSTELLATION_MOUSE_RANGE * 3;

// Helper function to initialize and resize canvas
const initializeCanvas = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

// Helper function to determine if two stars can connect
const canStarsConnect = (starA: Star, starB: Star): boolean => {
    if (!starA.connectsTo && !starB.connectsTo && !starA.connectionId && !starB.connectionId) {
        return true;
    }
    if (starA.connectsTo && starB.connectionId && starA.connectsTo.includes(starB.connectionId)) {
        return true;
    }
    if (starB.connectsTo && starA.connectionId && starB.connectsTo.includes(starA.connectionId)) {
        return true;
    }
    return false;
};

// Main Stars Component
export const Stars = ({ isOnLandingPage }: { isOnLandingPage: boolean }) => {
    useLogger('Stars');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useStars();
    const { mouseX, mouseY, mouseHasMoved, mouseTrackingExited } = useMouse();
    const isMobile = window.innerWidth < 768;

    // Create refs for mouse positions
    const mouseXRef = useRef(mouseX);
    const mouseYRef = useRef(mouseY);
    const mouseHasMovedRef = useRef(mouseHasMoved);
    const mouseTrackingExitedRef = useRef(mouseTrackingExited);

    useEffect(() => {
        mouseXRef.current = mouseX;
        mouseYRef.current = mouseY;
    }, [mouseX, mouseY]);

    useEffect(() => {
        mouseHasMovedRef.current = mouseHasMoved;
    }, [mouseHasMoved]);

    useEffect(() => {
        mouseTrackingExitedRef.current = mouseTrackingExited;
    }, [mouseTrackingExited]);

    useEffect(() => {
        // Ensure canvas reference is available
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        initializeCanvas(canvas);

        let animationFrameId: number;

        const render = () => {
            const maxX = canvas.width;
            const maxY = canvas.height;

            // Clear and setup canvas background gradient
            context.clearRect(0, 0, maxX, maxY);
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0D0D0D');
            gradient.addColorStop(1, '#1e003c');
            context.fillStyle = gradient;
            context.fillRect(0, 0, maxX, maxY);

            // If not on the landing page, skip star and line rendering
            if (!isOnLandingPage) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Update mouse star position
            const refX = mouseHasMovedRef.current ? mouseXRef.current : maxX / 2;
            const refY = mouseHasMovedRef.current ? mouseYRef.current : maxY / 2;
            const mouseStar: Star = {
                x: refX + 10,
                y: refY + 10,
                initialX: refX + 10,
                initialY: refY + 10,
                color: 'rgba(255, 255, 255, 0.1)',
                scale: 1,
                vx: 0,
                vy: 0,
                opacity: 0
            };

            // Combine mouseStar with other stars
            const allStars = [mouseStar, ...starsRef.current];
            const gridSize = 100;
            const grid: { [key: string]: Star[] } = {};
            allStars.forEach(star => {
                const key = `${Math.floor(star.x / gridSize)},${Math.floor(star.y / gridSize)}`;
                if (!grid[key]) grid[key] = [];
                grid[key].push(star);
            });

            // Draw and update stars and lines between them if on landing page
            for (const key in grid) {
                if (isMobile || mouseTrackingExitedRef.current) break;

                const starsInCurrentCell = grid[key];
                for (const starA of starsInCurrentCell) {
                    for (const starB of allStars) {
                        if (starA !== starB && canStarsConnect(starA, starB)) {
                            // Draw lines between stars
                            const dx = starA.x - starB.x;
                            const dy = starA.y - starB.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < MAX_CONSTELLATION_LINE_LENGTH) {
                                const midX = (starA.x + starB.x) / 2;
                                const midY = (starA.y + starB.y) / 2;
                                const mouseDx = midX - refX;
                                const mouseDy = midY - refY;
                                const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                                const opacity =
                                    mouseDistance < CONSTELLATION_MOUSE_RANGE
                                        ? 1 - mouseDistance / CONSTELLATION_MOUSE_RANGE
                                        : 0;

                                if (opacity > 0) {
                                    context.beginPath();
                                    context.moveTo(starA.x, starA.y);
                                    context.lineTo(starB.x, starB.y);
                                    context.strokeStyle = `rgba(${CONSTELLATION_COLOR}, ${opacity})`;
                                    context.lineWidth = 0.5;
                                    context.stroke();
                                }
                            }
                        }
                    }
                }
            }

            // Draw and update each star
            allStars.forEach(star => {
                if (star !== mouseStar) {
                    // Update star positions
                    let newVx = star.vx + (Math.random() - 0.5) * 0.05;
                    let newVy = star.vy + (Math.random() - 0.5) * 0.05;
                    const maxSpeed = 0.25;
                    newVx = Math.max(Math.min(newVx, maxSpeed), -maxSpeed);
                    newVy = Math.max(Math.min(newVy, maxSpeed), -maxSpeed);

                    star.x = (star.x + newVx + maxX) % maxX;
                    star.y = (star.y + newVy + maxY) % maxY;
                    star.vx = newVx;
                    star.vy = newVy;

                    context.beginPath();
                    context.arc(star.x, star.y, star.scale * 2, 0, 2 * Math.PI);
                    const dx = star.x - refX;
                    const dy = star.y - refY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const isPartOfCluster = distance < CONSTELLATION_MOUSE_RANGE;
                    const starOpacity = 1 - distance / (isPartOfCluster ? CONSTELLATION_MOUSE_RANGE : STAR_MOUSE_RANGE);
                    const starColor = `rgba(${isPartOfCluster && !isMobile ? CONSTELLATION_COLOR : star.color}, ${starOpacity})`;
                    context.fillStyle = starColor;
                    context.fill();
                }
            });

            // Request the next animation frame if the canvas is active
            animationFrameId = requestAnimationFrame(render);
        };

        // Start the animation
        render();

        // Clean up on component unmount or when canvas is disabled
        return () => {
            cancelAnimationFrame(animationFrameId);
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [starsRef, isOnLandingPage, mouseX, mouseY, isMobile]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'block',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
            }}
        />
    );
};
