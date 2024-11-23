import { MutableRefObject, useEffect, useState } from 'react';

export const useTabBar = (
    tabsContainerRef: MutableRefObject<HTMLDivElement | null>,
    activeTab: number,
    shouldRender: boolean
) => {
    const [barStyle, setBarStyle] = useState({ left: 0, width: 0 });

    const updateBarStyle = () => {
        if (!tabsContainerRef.current || !shouldRender) return;

        const activeTabElement = tabsContainerRef.current.children[activeTab] as HTMLElement;

        if (activeTabElement) {
            const left = activeTabElement.offsetLeft;
            const width = activeTabElement.offsetWidth;

            setBarStyle({ left, width });
        }
    };

    useEffect(() => {
        // Update bar style when activeTab, tabsContainerRef, or shouldRender changes
        updateBarStyle();
    }, [activeTab, tabsContainerRef, shouldRender]);

    useEffect(() => {
        // Update bar style on window resize
        window.addEventListener('resize', updateBarStyle);

        return () => {
            window.removeEventListener('resize', updateBarStyle);
        };
    }, [activeTab, tabsContainerRef, shouldRender]);

    return barStyle;
};
