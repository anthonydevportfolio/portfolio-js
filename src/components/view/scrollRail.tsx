import { FC, KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent, useEffect, useRef } from 'react';

const BAR_COUNT = 65;
const KEY_SCROLL_STEP = 72;
const RAIL_FALLOFF = 3;
const NEIGHBOR_EMPHASIS = 0.94;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

const getScrollMetrics = () => {
    const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = maximumScroll === 0 ? 0 : clamp(window.scrollY / maximumScroll, 0, 1);

    return { maximumScroll, progress };
};

export const ScrollRail: FC = () => {
    const railRef = useRef<HTMLDivElement | null>(null);
    const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const prefersReducedMotionRef = useRef(false);

    useEffect(() => {
        const rail = railRef.current;

        if (!rail) return;

        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const targetProgress = { current: 0 };
        const displayedProgress = { current: 0 };
        let animationFrame: number | null = null;
        let previousTime = 0;
        let activeBar: HTMLSpanElement | null = null;

        prefersReducedMotionRef.current = motionPreference.matches;
        document.documentElement.classList.add('portfolio-scrollbar-replaced');

        const renderProgress = (progress: number) => {
            const activePosition = progress * (BAR_COUNT - 1);
            const activeIndex = Math.round(activePosition);
            const activeDistance = Math.abs(activeIndex - activePosition);
            const activeEmphasis = Math.exp(-Math.pow(activeDistance / RAIL_FALLOFF, 2));
            const nextActiveBar = barRefs.current[activeIndex] ?? null;

            rail.setAttribute('aria-valuenow', `${Math.round(progress * 100)}`);
            rail.setAttribute('aria-valuetext', `${Math.round(progress * 100)}% through the page`);

            if (activeBar !== nextActiveBar) {
                activeBar?.removeAttribute('data-active');
                nextActiveBar?.setAttribute('data-active', 'true');
                activeBar = nextActiveBar;
            }

            barRefs.current.forEach((bar, index) => {
                if (!bar) return;

                const distance = Math.abs(index - activePosition);
                const rawEmphasis = Math.exp(-Math.pow(distance / RAIL_FALLOFF, 2));
                const emphasis = index === activeIndex ? 1 : (rawEmphasis / activeEmphasis) * NEIGHBOR_EMPHASIS;

                bar.style.setProperty('--scroll-rail-scale', `${0.14 + emphasis * 0.86}`);
                bar.style.setProperty('--scroll-rail-opacity', `${0.18 + emphasis * 0.8}`);
            });
        };

        const animateToTarget = (time: number) => {
            const elapsed = previousTime === 0 ? 16 : Math.min(time - previousTime, 48);
            const blend = 1 - Math.exp(-elapsed / 88);

            previousTime = time;
            displayedProgress.current += (targetProgress.current - displayedProgress.current) * blend;
            renderProgress(displayedProgress.current);

            if (Math.abs(targetProgress.current - displayedProgress.current) > 0.0001) {
                animationFrame = window.requestAnimationFrame(animateToTarget);
                return;
            }

            displayedProgress.current = targetProgress.current;
            renderProgress(displayedProgress.current);
            animationFrame = null;
            previousTime = 0;
        };

        const syncWithDocument = () => {
            targetProgress.current = getScrollMetrics().progress;

            if (prefersReducedMotionRef.current) {
                if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
                previousTime = 0;
                displayedProgress.current = targetProgress.current;
                renderProgress(displayedProgress.current);
                return;
            }

            if (animationFrame === null) animationFrame = window.requestAnimationFrame(animateToTarget);
        };

        const syncMotionPreference = (event: MediaQueryListEvent) => {
            prefersReducedMotionRef.current = event.matches;
            syncWithDocument();
        };

        displayedProgress.current = getScrollMetrics().progress;
        targetProgress.current = displayedProgress.current;
        renderProgress(displayedProgress.current);

        window.addEventListener('scroll', syncWithDocument, { passive: true });
        window.addEventListener('resize', syncWithDocument);
        motionPreference.addEventListener('change', syncMotionPreference);

        const documentResizeObserver = new ResizeObserver(syncWithDocument);
        documentResizeObserver.observe(document.documentElement);

        return () => {
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('scroll', syncWithDocument);
            window.removeEventListener('resize', syncWithDocument);
            motionPreference.removeEventListener('change', syncMotionPreference);
            documentResizeObserver.disconnect();
            document.documentElement.classList.remove('portfolio-scrollbar-replaced');
        };
    }, []);

    const scrollToPointer = (clientY: number) => {
        const rail = railRef.current;

        if (!rail) return;

        const bounds = rail.getBoundingClientRect();
        const progress = clamp((clientY - bounds.top) / bounds.height, 0, 1);
        const { maximumScroll } = getScrollMetrics();

        window.scrollTo({ top: progress * maximumScroll });
    };

    const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        scrollToPointer(event.clientY);
    };

    const continueDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        scrollToPointer(event.clientY);
    };

    const navigateWithKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        const { maximumScroll } = getScrollMetrics();
        let nextPosition: number | null = null;

        if (event.key === 'ArrowUp') nextPosition = window.scrollY - KEY_SCROLL_STEP;
        if (event.key === 'ArrowDown') nextPosition = window.scrollY + KEY_SCROLL_STEP;
        if (event.key === 'PageUp') nextPosition = window.scrollY - window.innerHeight * 0.85;
        if (event.key === 'PageDown') nextPosition = window.scrollY + window.innerHeight * 0.85;
        if (event.key === 'Home') nextPosition = 0;
        if (event.key === 'End') nextPosition = maximumScroll;
        if (nextPosition === null) return;

        event.preventDefault();
        window.scrollTo({
            behavior: prefersReducedMotionRef.current ? 'auto' : 'smooth',
            top: clamp(nextPosition, 0, maximumScroll)
        });
    };

    return (
        <div
            aria-controls='main-content'
            aria-label='Page position'
            aria-orientation='vertical'
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={0}
            className='portfolio-scroll-rail'
            onKeyDown={navigateWithKeyboard}
            onPointerDown={beginDrag}
            onPointerMove={continueDrag}
            ref={railRef}
            role='scrollbar'
            tabIndex={0}>
            {Array.from({ length: BAR_COUNT }, (_, index) => (
                <span
                    aria-hidden='true'
                    className='portfolio-scroll-rail__bar'
                    key={index}
                    ref={bar => {
                        barRefs.current[index] = bar;
                    }}
                />
            ))}
        </div>
    );
};
