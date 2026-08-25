import styled from '@emotion/styled';
import { FocusEvent as ReactFocusEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from 'react';
import {
    THEME_PREFERENCES,
    THEME_PREFERENCE_LABELS,
    ThemePreferenceIcon,
    type ThemePreference,
    useTheme
} from '../../theme';

const ThemeChevronIcon = () => (
    <svg aria-hidden='true' className='landing-theme-control__chevron' viewBox='0 0 12 12'>
        <path d='m3.5 4.75 2.5 2.5 2.5-2.5' />
    </svg>
);

export const LandingThemeControl = () => {
    const { setThemePreference, theme, themePreference } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        const closeOnOutsidePointer = (event: PointerEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            setIsOpen(false);
            triggerRef.current?.focus();
        };
        const focusFrame = window.requestAnimationFrame(() => {
            menuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
        });

        document.addEventListener('pointerdown', closeOnOutsidePointer);
        document.addEventListener('keydown', closeOnEscape);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener('pointerdown', closeOnOutsidePointer);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isOpen]);

    const chooseTheme = (nextPreference: ThemePreference) => {
        setThemePreference(nextPreference);
        setIsOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
    };

    const chooseMobileTheme = (nextPreference: ThemePreference) => {
        setThemePreference(nextPreference);
        setIsOpen(false);
    };

    const closeOnBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
    };

    const navigateOptions = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

        const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
        const currentIndex = options.indexOf(document.activeElement as HTMLButtonElement);
        let nextIndex = currentIndex;

        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = options.length - 1;
        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % options.length;
        if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + options.length) % options.length;

        event.preventDefault();
        options[nextIndex]?.focus();
    };

    return (
        <ThemeControlBase data-theme={theme} onBlur={closeOnBlur} ref={menuRef}>
            <ThemeTrigger
                aria-controls='landing-theme-options'
                aria-expanded={isOpen}
                aria-haspopup='menu'
                aria-label={`Theme preference: ${THEME_PREFERENCE_LABELS[themePreference]}`}
                onClick={() => setIsOpen(current => !current)}
                ref={triggerRef}
                title={`Theme preference: ${THEME_PREFERENCE_LABELS[themePreference]}`}
                type='button'>
                <ThemePreferenceIcon className='landing-theme-control__icon' preference={themePreference} />
                <ThemeChevronIcon />
            </ThemeTrigger>
            {isOpen ? (
                <ThemeOptions
                    aria-label='Theme preference'
                    id='landing-theme-options'
                    onKeyDown={navigateOptions}
                    role='menu'>
                    {THEME_PREFERENCES.map(preference => {
                        const isSelected = preference === themePreference;
                        const label = `${THEME_PREFERENCE_LABELS[preference]} theme`;

                        return (
                            <ThemeOption
                                aria-checked={isSelected}
                                aria-label={label}
                                data-selected={isSelected}
                                key={preference}
                                onClick={() => chooseTheme(preference)}
                                role='menuitemradio'
                                title={label}
                                type='button'>
                                <ThemePreferenceIcon className='landing-theme-control__icon' preference={preference} />
                            </ThemeOption>
                        );
                    })}
                </ThemeOptions>
            ) : null}
            <MobileThemeOptions aria-label='Theme preference' role='radiogroup'>
                {THEME_PREFERENCES.map(preference => {
                    const isSelected = preference === themePreference;
                    const label = `${THEME_PREFERENCE_LABELS[preference]} theme`;

                    return (
                        <ThemeOption
                            aria-checked={isSelected}
                            aria-label={label}
                            data-selected={isSelected}
                            key={preference}
                            onClick={() => chooseMobileTheme(preference)}
                            role='radio'
                            title={label}
                            type='button'>
                            <ThemePreferenceIcon className='landing-theme-control__icon' preference={preference} />
                        </ThemeOption>
                    );
                })}
            </MobileThemeOptions>
        </ThemeControlBase>
    );
};

const ThemeControlBase = styled('div')({
    '--landing-theme-accent': '#8b91ff',
    '--landing-theme-accent-soft': 'rgba(139, 145, 255, 0.14)',
    '--landing-theme-bg': 'rgba(14, 17, 23, 0.94)',
    '--landing-theme-fg': '#a9afbd',
    '--landing-theme-fg-strong': '#f3f4f7',
    '--landing-theme-line': 'rgba(199, 207, 255, 0.22)',
    color: 'var(--landing-theme-fg)',
    position: 'absolute',
    right: 'max(1.5rem, env(safe-area-inset-right))',
    top: 'max(1.5rem, env(safe-area-inset-top))',
    zIndex: 8,

    '& .landing-theme-control__icon, & .landing-theme-control__chevron': {
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 1.5
    },

    '& .landing-theme-control__icon': {
        height: '20px',
        width: '20px'
    },

    '& .landing-theme-control__chevron': {
        height: '12px',
        width: '12px'
    },

    '&[data-theme="light"]': {
        '--landing-theme-accent': '#5557cc',
        '--landing-theme-accent-soft': 'rgba(85, 87, 204, 0.1)',
        '--landing-theme-bg': 'rgba(255, 255, 255, 0.96)',
        '--landing-theme-fg': '#555d6e',
        '--landing-theme-fg-strong': '#171922',
        '--landing-theme-line': 'rgba(31, 35, 48, 0.22)'
    },

    '@media (max-width: 640px)': {
        right: 'max(1rem, env(safe-area-inset-right))',
        top: 'max(1rem, env(safe-area-inset-top))'
    }
});

const ThemeTrigger = styled('button')({
    alignItems: 'center',
    appearance: 'none',
    background: 'var(--landing-theme-bg)',
    border: '1px solid var(--landing-theme-line)',
    borderRadius: '12px',
    color: 'inherit',
    cursor: 'pointer',
    display: 'grid',
    gap: '0.125rem',
    gridTemplateColumns: '20px 12px',
    height: '44px',
    justifyContent: 'center',
    padding: 0,
    transition: 'border-color 160ms ease, color 160ms ease, background-color 160ms ease',
    width: '48px',

    '&:hover, &[aria-expanded="true"]': {
        color: 'var(--landing-theme-fg-strong)'
    },

    '&:focus-visible': {
        outline: '2px solid var(--landing-theme-accent)',
        outlineOffset: '3px'
    },

    '.landing-theme-control__chevron': {
        transition: 'transform 160ms ease'
    },

    '&[aria-expanded="true"] .landing-theme-control__chevron': {
        transform: 'rotate(180deg)'
    },

    '@media (max-width: 640px)': {
        display: 'none'
    }
});

const ThemeOptions = styled('div')({
    animation: 'landing-theme-menu-enter 140ms cubic-bezier(0.16, 1, 0.3, 1) both',
    background: 'var(--landing-theme-bg)',
    border: '1px solid var(--landing-theme-line)',
    borderRadius: '12px',
    display: 'grid',
    gap: '0.125rem',
    gridAutoFlow: 'column',
    padding: '0.25rem',
    position: 'absolute',
    right: 0,
    top: 'calc(100% + 0.5rem)',
    transformOrigin: 'top right',

    '@keyframes landing-theme-menu-enter': {
        from: {
            opacity: 0,
            transform: 'translateY(-4px) scale(0.98)'
        },
        to: {
            opacity: 1,
            transform: 'translateY(0) scale(1)'
        }
    },

    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none'
    },

    '@media (max-width: 640px)': {
        display: 'none'
    }
});

const MobileThemeOptions = styled('div')({
    background: 'var(--landing-theme-bg)',
    border: '1px solid var(--landing-theme-line)',
    borderRadius: '12px',
    display: 'none',
    gap: '0.125rem',
    gridAutoFlow: 'column',
    padding: '0.1875rem',

    '@media (max-width: 640px)': {
        display: 'grid'
    }
});

const ThemeOption = styled('button')({
    appearance: 'none',
    background: 'transparent',
    border: 0,
    borderRadius: '4px',
    color: 'inherit',
    cursor: 'pointer',
    display: 'grid',
    height: '40px',
    padding: 0,
    placeItems: 'center',
    transition: 'background-color 140ms ease, color 140ms ease',
    width: '40px',

    '&:hover, &:focus-visible, &[data-selected="true"]': {
        background: 'var(--landing-theme-accent-soft)',
        color: 'var(--landing-theme-fg-strong)'
    },

    '&:focus-visible': {
        outline: '2px solid var(--landing-theme-accent)',
        outlineOffset: '-2px'
    },

    '@media (pointer: coarse)': {
        height: '44px',
        width: '44px'
    }
});
