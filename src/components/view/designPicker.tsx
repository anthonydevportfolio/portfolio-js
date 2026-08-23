import { CSSProperties, FC, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';

export const portfolioDesigns = [
    {
        id: 'proof-index',
        name: 'Proof Index',
        description: 'Dark evidence ledger with precise hierarchy and a quiet constellation layer.'
    },
    {
        id: 'editorial-dossier',
        name: 'Editorial Dossier',
        description: 'Warm, reading-led portfolio with assertive serif type and printed-profile restraint.'
    },
    {
        id: 'signal-rail',
        name: 'Signal Rail',
        description: 'Asymmetric night layout organized by one constellation-like progress rail.'
    },
    {
        id: 'work-first',
        name: 'Work First',
        description: 'Projects take the first viewport; biography and employment become supporting proof.'
    },
    {
        id: 'profile-brief',
        name: 'Profile Brief',
        description: 'Persistent identity rail and a compact white canvas built for fast portfolio scans.'
    }
] as const;

export type PortfolioDesignId = (typeof portfolioDesigns)[number]['id'];

interface DesignPickerProps {
    activeIndex: number;
    onSelect: (index: number) => void;
}

interface PickerPosition {
    left: number;
    top: number;
}

interface DragState extends PickerPosition {
    pointerId: number;
    startX: number;
    startY: number;
}

const ArrowIcon: FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
    <svg aria-hidden='true' className='design-picker__arrow' viewBox='0 0 20 20'>
        {direction === 'left' ? (
            <path d='m11.75 5.5-4.5 4.5 4.5 4.5M7.5 10h7' />
        ) : (
            <path d='m8.25 5.5 4.5 4.5-4.5 4.5M12.5 10h-7' />
        )}
    </svg>
);

export const DesignPicker: FC<DesignPickerProps> = ({ activeIndex, onSelect }) => {
    const pickerRef = useRef<HTMLElement | null>(null);
    const dragState = useRef<DragState | null>(null);
    const [position, setPosition] = useState<PickerPosition | null>(null);
    const activeDesign = portfolioDesigns[activeIndex];

    useEffect(() => {
        const keepPickerInView = () => setPosition(null);
        window.addEventListener('resize', keepPickerInView);
        return () => window.removeEventListener('resize', keepPickerInView);
    }, []);

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        const picker = pickerRef.current;
        if (!picker) return;

        const rect = picker.getBoundingClientRect();
        dragState.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            left: rect.left,
            top: rect.top
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        const drag = dragState.current;
        const picker = pickerRef.current;
        if (!drag || !picker || event.pointerId !== drag.pointerId) return;

        const rect = picker.getBoundingClientRect();
        const left = Math.min(window.innerWidth - rect.width - 8, Math.max(8, drag.left + event.clientX - drag.startX));
        const top = Math.min(window.innerHeight - rect.height - 8, Math.max(8, drag.top + event.clientY - drag.startY));
        setPosition({ left, top });
    };

    const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (dragState.current?.pointerId === event.pointerId) dragState.current = null;
    };

    const pickerStyle: CSSProperties | undefined = position
        ? { bottom: 'auto', left: position.left, right: 'auto', top: position.top }
        : undefined;

    return (
        <aside aria-label='Design selector' className='design-picker' ref={pickerRef} style={pickerStyle}>
            <div
                className='design-picker__handle'
                onPointerCancel={handlePointerEnd}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}>
                <div className='design-picker__context'>Portfolio direction</div>
                <div aria-live='polite' className='design-picker__title'>
                    {activeDesign.name}
                </div>
                <p className='design-picker__description'>{activeDesign.description}</p>
            </div>

            <div className='design-picker__controls'>
                <button aria-label='Previous design' onClick={() => onSelect(activeIndex - 1)} type='button'>
                    <ArrowIcon direction='left' />
                </button>
                <div aria-label='Choose a design' className='design-picker__options' role='group'>
                    {portfolioDesigns.map((design, index) => (
                        <button
                            aria-label={design.name}
                            aria-pressed={index === activeIndex}
                            key={design.id}
                            onClick={() => onSelect(index)}
                            type='button'>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button aria-label='Next design' onClick={() => onSelect(activeIndex + 1)} type='button'>
                    <ArrowIcon direction='right' />
                </button>
            </div>
            <p className='design-picker__hint'>Use the left and right arrow keys · drag this panel</p>
        </aside>
    );
};
