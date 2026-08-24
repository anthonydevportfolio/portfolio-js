import {
    CSSProperties,
    FC,
    KeyboardEvent as ReactKeyboardEvent,
    PointerEvent as ReactPointerEvent,
    useEffect,
    useRef
} from 'react';

const BAR_COUNT = 65;
const KEY_SCROLL_STEP = 72;
const RAIL_FALLOFF = 3;
const NEIGHBOR_EMPHASIS = 0.94;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

type DragMetrics = {
    height: number;
    maximumScroll: number;
    pointerType: string;
    startClientY: number;
    startScrollPosition: number;
    top: number;
};

const getScrollMetrics = () => {
    const maximumScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = maximumScroll === 0 ? 0 : clamp(window.scrollY / maximumScroll, 0, 1);

    return { maximumScroll, progress };
};

const revealSectionsForDirectNavigation = () => {
    document.querySelectorAll<HTMLElement>('[data-reveal-section]').forEach(section => {
        section.dataset.revealState = 'visible';
    });
};

export const ScrollRail: FC = () => {
    const railRef = useRef<HTMLDivElement | null>(null);
    const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const dragAnimationFrameRef = useRef<number | null>(null);
    const dragMetricsRef = useRef<DragMetrics | null>(null);
    const isDraggingRef = useRef(false);
    const activeTouchIdentifierRef = useRef<number | null>(null);
    const pendingPointerYRef = useRef<number | null>(null);
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

            if (prefersReducedMotionRef.current || isDraggingRef.current) {
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
            if (dragAnimationFrameRef.current !== null) window.cancelAnimationFrame(dragAnimationFrameRef.current);
            window.removeEventListener('scroll', syncWithDocument);
            window.removeEventListener('resize', syncWithDocument);
            motionPreference.removeEventListener('change', syncMotionPreference);
            documentResizeObserver.disconnect();
            document.documentElement.classList.remove('portfolio-scrollbar-dragging');
            document.documentElement.classList.remove('portfolio-scrollbar-replaced');
        };
    }, []);

    const scrollToPointer = (clientY: number) => {
        const rail = railRef.current;

        if (!rail) return;

        let metrics = dragMetricsRef.current;

        if (!metrics) {
            const bounds = rail.getBoundingClientRect();

            metrics = {
                height: bounds.height,
                maximumScroll: getScrollMetrics().maximumScroll,
                pointerType: 'mouse',
                startClientY: clientY,
                startScrollPosition: window.scrollY,
                top: bounds.top
            };
        }

        const scrollPosition =
            metrics.pointerType === 'mouse'
                ? clamp((clientY - metrics.top) / metrics.height, 0, 1) * metrics.maximumScroll
                : clamp(
                      metrics.startScrollPosition +
                          ((clientY - metrics.startClientY) / metrics.height) * metrics.maximumScroll,
                      0,
                      metrics.maximumScroll
                  );

        window.scrollTo({ behavior: 'instant', top: scrollPosition });
    };

    const queueTouchScroll = (clientY: number) => {
        pendingPointerYRef.current = clientY;

        if (dragAnimationFrameRef.current !== null) return;

        dragAnimationFrameRef.current = window.requestAnimationFrame(() => {
            dragAnimationFrameRef.current = null;
            const pendingPointerY = pendingPointerYRef.current;

            pendingPointerYRef.current = null;
            if (pendingPointerY === null || !dragMetricsRef.current) return;
            scrollToPointer(pendingPointerY);
        });
    };

    const startDrag = (clientY: number, pointerType: string) => {
        const rail = railRef.current;

        if (!rail) return false;

        revealSectionsForDirectNavigation();
        const bounds = rail.getBoundingClientRect();

        dragMetricsRef.current = {
            height: bounds.height,
            maximumScroll: getScrollMetrics().maximumScroll,
            pointerType,
            startClientY: clientY,
            startScrollPosition: window.scrollY,
            top: bounds.top
        };
        isDraggingRef.current = true;
        document.documentElement.classList.add('portfolio-scrollbar-dragging');
        if (pointerType === 'mouse') scrollToPointer(clientY);

        return true;
    };

    const finishDrag = (cancelled: boolean) => {
        if (dragAnimationFrameRef.current !== null) {
            window.cancelAnimationFrame(dragAnimationFrameRef.current);
            dragAnimationFrameRef.current = null;
        }

        const pendingPointerY = pendingPointerYRef.current;

        pendingPointerYRef.current = null;
        if (pendingPointerY !== null && !cancelled) scrollToPointer(pendingPointerY);

        dragMetricsRef.current = null;
        isDraggingRef.current = false;
        document.documentElement.classList.remove('portfolio-scrollbar-dragging');
    };

    useEffect(() => {
        const rail = railRef.current;

        if (!rail) return;

        const listenerOptions = { passive: false } as const;
        const findTouch = (touches: TouchList, identifier: number) => {
            for (let index = 0; index < touches.length; index += 1) {
                const touch = touches.item(index);

                if (touch?.identifier === identifier) return touch;
            }

            return null;
        };

        const beginTouchDrag = (event: TouchEvent) => {
            if (activeTouchIdentifierRef.current !== null || event.touches.length !== 1) return;

            const touch = event.changedTouches.item(0) ?? event.touches.item(0);

            if (!touch) return;

            event.preventDefault();
            activeTouchIdentifierRef.current = touch.identifier;

            if (!startDrag(touch.clientY, 'touch')) activeTouchIdentifierRef.current = null;
        };

        const continueTouchDrag = (event: TouchEvent) => {
            const identifier = activeTouchIdentifierRef.current;

            if (identifier === null) return;

            const touch = findTouch(event.touches, identifier);

            if (!touch) return;

            event.preventDefault();
            queueTouchScroll(touch.clientY);
        };

        const endTouchDrag = (event: TouchEvent) => {
            const identifier = activeTouchIdentifierRef.current;

            if (identifier === null) return;

            const touch = findTouch(event.changedTouches, identifier);

            if (!touch) return;

            event.preventDefault();
            pendingPointerYRef.current = touch.clientY;
            activeTouchIdentifierRef.current = null;
            finishDrag(false);
        };

        const cancelTouchDrag = (event: TouchEvent) => {
            if (activeTouchIdentifierRef.current === null) return;

            event.preventDefault();
            activeTouchIdentifierRef.current = null;
            finishDrag(true);
        };

        rail.addEventListener('touchstart', beginTouchDrag, listenerOptions);
        rail.addEventListener('touchmove', continueTouchDrag, listenerOptions);
        rail.addEventListener('touchend', endTouchDrag, listenerOptions);
        rail.addEventListener('touchcancel', cancelTouchDrag, listenerOptions);

        return () => {
            rail.removeEventListener('touchstart', beginTouchDrag);
            rail.removeEventListener('touchmove', continueTouchDrag);
            rail.removeEventListener('touchend', endTouchDrag);
            rail.removeEventListener('touchcancel', cancelTouchDrag);
            activeTouchIdentifierRef.current = null;
            finishDrag(true);
        };
    }, []);

    const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'touch' || !event.isPrimary || event.button !== 0) return;

        event.preventDefault();
        if (!startDrag(event.clientY, event.pointerType)) return;
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const continueDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'touch') return;
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        event.preventDefault();

        if (event.pointerType === 'mouse') {
            scrollToPointer(event.clientY);
            return;
        }

        queueTouchScroll(event.clientY);
    };

    const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.pointerType === 'touch') return;

        finishDrag(event.type === 'pointercancel');

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
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
            onLostPointerCapture={endDrag}
            onPointerCancel={endDrag}
            onPointerDown={beginDrag}
            onPointerMove={continueDrag}
            onPointerUp={endDrag}
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
                    style={{ '--scroll-rail-index': index } as CSSProperties}
                />
            ))}
        </div>
    );
};
