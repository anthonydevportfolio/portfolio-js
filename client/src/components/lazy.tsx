import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface LazyComponentWrapperProps {
    children: ReactNode;
    threshold: number;
    root?: Element | null;
}

export const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({ children, threshold, root }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!root || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    console.log(`Sentinel visible: ${entry.isIntersecting}`);
                    console.log(`Intersection ratio: ${entry.intersectionRatio}`);
                    console.log('Entry details:', entry.boundingClientRect, entry.rootBounds);

                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root,
                threshold
            }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [root, threshold]);

    return (
        <>
            {!isVisible && (
                <div
                    ref={sentinelRef}
                    style={{
                        display: 'block',
                        height: '10px',
                        width: '100%',
                        margin: 0,
                        padding: 0,
                        backgroundColor: 'rgba(255, 0, 0, 0.5)'
                    }}
                />
            )}
            {isVisible && children}
        </>
    );
};
