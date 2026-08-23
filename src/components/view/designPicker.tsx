import { CSSProperties, FC, PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from 'react';

export const portfolioDesigns = [
    {
        id: 'proof-index',
        name: 'Proof Index',
        description: 'A dark ledger groups roles, project screenshots, and implementation details.'
    },
    {
        id: 'artifact-first',
        name: 'Artifact First',
        description: 'A project opens at full scale before biography or employment history.'
    },
    {
        id: 'constellation-map',
        name: 'Constellation Map',
        description: 'The constellation links directly to roles, projects, and profile sections.'
    },
    {
        id: 'hiring-dossier',
        name: 'Hiring Dossier',
        description: 'A compact record groups role details and project links for a fast scan.'
    },
    {
        id: 'career-narrative',
        name: 'Career Narrative',
        description: 'Roles and independent projects interleave as a chronological story.'
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
                <div className='design-picker__context'>Portfolio designs</div>
                <span className='design-picker__count'>
                    {activeIndex + 1} / {portfolioDesigns.length}
                </span>
            </div>

            <div className='design-picker__controls'>
                <button aria-label='Previous design' onClick={() => onSelect(activeIndex - 1)} type='button'>
                    <ArrowIcon direction='left' />
                </button>
                <label className='portfolio-visually-hidden' htmlFor='portfolio-design'>
                    Choose a portfolio design
                </label>
                <select
                    aria-describedby='portfolio-design-description'
                    id='portfolio-design'
                    onChange={event => onSelect(Number(event.currentTarget.value))}
                    value={activeIndex}>
                    {portfolioDesigns.map((design, index) => (
                        <option key={design.id} value={index}>
                            {design.name}
                        </option>
                    ))}
                </select>
                <button aria-label='Next design' onClick={() => onSelect(activeIndex + 1)} type='button'>
                    <ArrowIcon direction='right' />
                </button>
            </div>
            <p aria-live='polite' className='portfolio-visually-hidden' id='portfolio-design-description'>
                <span className='design-picker__title'>{activeDesign.name}</span>. {activeDesign.description}
            </p>
        </aside>
    );
};
