import {
    FC,
    FocusEvent as ReactFocusEvent,
    KeyboardEvent as ReactKeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react';
import linkedinLogo from '../../assets/linkedin-in.png';
import { handleImageError } from '../../imageFallback';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { ExperienceData } from '../experience/data';
import { projectsData } from '../projects/projectsData';
import { ScrollRail } from './scrollRail';
import './view.css';

const GITHUB_URL = 'https://github.com/anthony4834';
const LINKEDIN_URL = 'https://www.linkedin.com/in/anthony-griffin-0513271aa/';
const EMAIL_ADDRESS = 'anthony.js.griffin@gmail.com';
const PHONE_DISPLAY = '971-488-6554';
const PHONE_URL = 'tel:+19714886554';
const CONTACT_COPY_RESET_MS = 1800;
const CURRENT_ROLE_SUMMARY =
    'Building developer-platform experiences, shared frontend architecture, and testing infrastructure across Workday.';
const THEME_STORAGE_KEY = 'portfolio-theme';
const experienceEntries = [...ExperienceData].reverse();
const currentExperience = experienceEntries[0];
const TECH_STACK_GROUPS = [
    {
        label: 'Languages',
        items: ['TypeScript', 'JavaScript', 'Kotlin', 'Java', 'SQL', 'HTML/CSS']
    },
    {
        label: 'Frontend & architecture',
        items: [
            'React',
            'Redux Toolkit',
            'RTK Query',
            'Nx',
            'Micro-frontends',
            'Design systems',
            'Accessibility',
            'Internationalization'
        ]
    },
    {
        label: 'Backend & data',
        items: ['Spring Boot', 'MySQL', 'Redis', 'REST APIs']
    },
    {
        label: 'Testing & delivery',
        items: ['Cypress', 'Jest', 'Vitest', 'Selenium', 'Cucumber', 'GitHub Actions', 'Jenkins', 'JFrog']
    },
    {
        label: 'Cloud & observability',
        items: ['AWS', 'CloudWatch', 'Grafana', 'PagerDuty', 'Mixpanel']
    },
    {
        label: 'AI developer tooling',
        items: ['Claude Code', 'Cursor', 'GitHub Copilot', 'Model Context Protocol (MCP)']
    }
] as const;

type Theme = 'dark' | 'light';
type ThemePreference = Theme | 'system';

const PORTFOLIO_SECTIONS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
] as const;

type PortfolioSection = (typeof PORTFOLIO_SECTIONS)[number]['id'];

const THEME_PREFERENCES: ThemePreference[] = ['system', 'light', 'dark'];
const THEME_PREFERENCE_LABELS: Record<ThemePreference, string> = {
    system: 'System',
    light: 'Light',
    dark: 'Dark'
};

const readSavedThemePreference = (): ThemePreference | null => {
    try {
        const savedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
        return savedPreference === 'system' || savedPreference === 'dark' || savedPreference === 'light'
            ? savedPreference
            : null;
    } catch {
        return null;
    }
};

const getSystemTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const getInitialThemePreference = (): ThemePreference => {
    if (typeof window === 'undefined') return 'system';

    return readSavedThemePreference() ?? 'system';
};

const saveThemePreference = (themePreference: ThemePreference) => {
    try {
        window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    } catch {
        // The theme still applies for this visit when storage is unavailable.
    }
};

const projectImageDimensions: Record<string, { width: number; height: number }> = {
    'fmr.fyi': { width: 1920, height: 961 },
    Pokedle: { width: 3808, height: 2264 },
    BlockLens: { width: 1920, height: 1040 },
    Chrona: { width: 1920, height: 1040 },
    'pol.ai': { width: 1920, height: 1040 },
    Solas: { width: 1920, height: 1040 }
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
});

const formatDate = (value: string) => {
    if (value.toLowerCase() === 'present') return 'Present';

    const [month, year] = value.split('/').map(Number);
    return dateFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
};

const formatPeriod = (startDate: string, endDate: string) => `${formatDate(startDate)} — ${formatDate(endDate)}`;

const ExternalLinkIcon = () => (
    <svg aria-hidden='true' className='portfolio-link__icon' viewBox='0 0 20 20'>
        <path d='M6.75 13.25 13.25 6.75M8 6.75h5.25V12' />
    </svg>
);

const GitHubIcon = () => (
    <svg aria-hidden='true' className='portfolio-action-icon' viewBox='0 0 24 24'>
        <path
            d='M12 2.75a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.67c-2.67.58-3.23-1.13-3.23-1.13-.44-1.11-1.07-1.4-1.07-1.4-.87-.6.07-.59.07-.59.96.07 1.47.99 1.47.99.86 1.47 2.25 1.05 2.8.8.09-.62.34-1.05.61-1.29-2.13-.24-4.37-1.06-4.37-4.7 0-1.04.37-1.89.99-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.61.98A9 9 0 0 1 12 7.44a9 9 0 0 1 2.38.32c1.81-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.09 2.52.62.67.99 1.52.99 2.56 0 3.65-2.25 4.46-4.39 4.7.35.3.65.88.65 1.78v2.47c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.75Z'
            fill='currentColor'
        />
    </svg>
);

const LinkedInIcon = () => (
    <img
        alt=''
        aria-hidden='true'
        className='portfolio-action-icon portfolio-action-icon--linkedin'
        height='24'
        src={linkedinLogo}
        width='26'
    />
);

const EmailIcon = () => (
    <svg aria-hidden='true' className='portfolio-action-icon' viewBox='0 0 24 24'>
        <rect height='14' rx='2' width='18' x='3' y='5' />
        <path d='m4 7 8 6 8-6' />
    </svg>
);

const PhoneIcon = () => (
    <svg aria-hidden='true' className='portfolio-action-icon' viewBox='0 0 24 24'>
        <path d='M7.1 3.5 9.4 8l-2.1 1.8a15.8 15.8 0 0 0 6.9 6.9l1.8-2.1 4.5 2.3-.8 3a2 2 0 0 1-2 1.5C9.35 20.7 3.3 14.65 2.6 6.3a2 2 0 0 1 1.5-2l3-.8Z' />
    </svg>
);

const CopyIcon = () => (
    <svg aria-hidden='true' className='portfolio-copy-button__svg' viewBox='0 0 20 20'>
        <rect height='11' rx='2' width='10' x='6.25' y='5.25' />
        <path d='M4.25 13.25v-7a2.5 2.5 0 0 1 2.5-2.5h6.5' />
    </svg>
);

const CheckIcon = () => (
    <svg aria-hidden='true' className='portfolio-copy-button__svg' viewBox='0 0 20 20'>
        <path d='m4.5 10.25 3.25 3.25 7.75-8' />
    </svg>
);

const copyTextToClipboard = async (value: string) => {
    try {
        await navigator.clipboard.writeText(value);
        return true;
    } catch {
        const activeElement = document.activeElement as HTMLElement | null;
        const textarea = document.createElement('textarea');

        textarea.value = value;
        textarea.setAttribute('readonly', '');
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand('copy');
        } finally {
            textarea.remove();
            activeElement?.focus();
        }
    }
};

interface ContactCopyButtonProps {
    label: string;
    value: string;
}

const ContactCopyButton: FC<ContactCopyButtonProps> = ({ label, value }) => {
    const [isCopied, setIsCopied] = useState(false);
    const resetTimerRef = useRef<number | null>(null);

    useEffect(
        () => () => {
            if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
        },
        []
    );

    const handleCopy = async () => {
        if (!(await copyTextToClipboard(value))) return;

        setIsCopied(true);
        if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = window.setTimeout(() => {
            setIsCopied(false);
            resetTimerRef.current = null;
        }, CONTACT_COPY_RESET_MS);
    };

    const buttonLabel = isCopied ? `Copied ${label}` : `Copy ${label}`;

    return (
        <button
            aria-label={buttonLabel}
            className='portfolio-copy-button'
            data-copied={isCopied}
            onClick={handleCopy}
            title={buttonLabel}
            type='button'>
            <span aria-hidden='true' className='portfolio-copy-button__icon-stack'>
                <span className='portfolio-copy-button__icon portfolio-copy-button__icon--copy'>
                    <CopyIcon />
                </span>
                <span className='portfolio-copy-button__icon portfolio-copy-button__icon--check'>
                    <CheckIcon />
                </span>
            </span>
            <span aria-live='polite' className='portfolio-sr-only'>
                {isCopied ? `${label} copied` : ''}
            </span>
        </button>
    );
};

const ThemeMenuChevron = () => (
    <svg aria-hidden='true' className='portfolio-theme-menu__chevron' viewBox='0 0 16 16'>
        <path d='m5 6.5 3 3 3-3' />
    </svg>
);

const ThemeMenuBackIcon = () => (
    <svg aria-hidden='true' className='portfolio-mobile-theme-submenu__back-icon' viewBox='0 0 16 16'>
        <path d='m9.5 3.5-4.5 4.5 4.5 4.5' />
    </svg>
);

const ThemePreferenceIcon: FC<{ preference: ThemePreference }> = ({ preference }) => {
    if (preference === 'system') {
        return (
            <svg aria-hidden='true' className='portfolio-theme-menu__icon' viewBox='0 0 20 20'>
                <rect height='9.25' rx='1.75' width='13.5' x='3.25' y='3.75' />
                <path d='M10 13v3.25M7.25 16.25h5.5' />
            </svg>
        );
    }

    if (preference === 'light') {
        return (
            <svg aria-hidden='true' className='portfolio-theme-menu__icon' viewBox='0 0 20 20'>
                <circle cx='10' cy='10' r='3.25' />
                <path d='M10 2.25v1.5M10 16.25v1.5M2.25 10h1.5M16.25 10h1.5M4.52 4.52l1.06 1.06M14.42 14.42l1.06 1.06M15.48 4.52l-1.06 1.06M5.58 14.42l-1.06 1.06' />
            </svg>
        );
    }

    return (
        <svg aria-hidden='true' className='portfolio-theme-menu__icon' viewBox='0 0 20 20'>
            <path d='M16.35 12.52A7 7 0 0 1 7.48 3.65a7 7 0 1 0 8.87 8.87Z' />
        </svg>
    );
};

const ThemeCheckIcon = () => (
    <svg aria-hidden='true' className='portfolio-theme-menu__check-icon' viewBox='0 0 16 16'>
        <path d='m3.75 8.25 2.5 2.5 6-6' />
    </svg>
);

interface CompanyLogoProps {
    src: string;
}

const CompanyLogo: FC<CompanyLogoProps> = ({ src }) => (
    <img
        alt=''
        aria-hidden='true'
        className='portfolio-company-logo'
        decoding='async'
        height='44'
        loading='lazy'
        onError={handleImageError}
        src={src}
        width='44'
    />
);

const Constellation = () => (
    <div aria-hidden='true' className='portfolio-constellation'>
        <span className='portfolio-constellation__node portfolio-constellation__node--one' />
        <span className='portfolio-constellation__node portfolio-constellation__node--two' />
        <span className='portfolio-constellation__node portfolio-constellation__node--three' />
        <span className='portfolio-constellation__node portfolio-constellation__node--four' />
        <span className='portfolio-constellation__node portfolio-constellation__node--five' />
    </div>
);

export const View: FC = () => {
    useLogger('View');

    const isExited = useSelectorw(state => state.landing.isExited);
    const portfolioRef = useRef<HTMLElement | null>(null);
    const mobileNavRef = useRef<HTMLDivElement | null>(null);
    const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null);
    const themeMenuRef = useRef<HTMLDivElement | null>(null);
    const themeMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
    const mobileThemeTriggerRef = useRef<HTMLButtonElement | null>(null);
    const mobileThemeSubmenuRef = useRef<HTMLDivElement | null>(null);
    const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialThemePreference);
    const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isMobileThemeSubmenuOpen, setIsMobileThemeSubmenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<PortfolioSection>('about');
    const theme = themePreference === 'system' ? systemTheme : themePreference;

    const suppressMobileMenuMotion = useCallback(() => {
        const mobileNav = mobileNavRef.current;

        if (!mobileNav) return;

        mobileNav.dataset.mobileMenuImmediate = 'true';
        window.requestAnimationFrame(() => {
            delete mobileNav.dataset.mobileMenuImmediate;
        });
    }, []);

    const closeMobileMenu = useCallback(
        (restoreFocus = false, skipMotion = false) => {
            if (skipMotion) suppressMobileMenuMotion();

            setIsMobileMenuOpen(false);
            setIsThemeMenuOpen(false);
            setIsMobileThemeSubmenuOpen(false);

            if (restoreFocus) {
                window.requestAnimationFrame(() => mobileMenuToggleRef.current?.focus());
            }
        },
        [suppressMobileMenuMotion]
    );

    useEffect(() => {
        const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
        const syncWithSystem = (event: MediaQueryListEvent) => {
            setSystemTheme(event.matches ? 'light' : 'dark');
        };

        systemTheme.addEventListener('change', syncWithSystem);
        return () => systemTheme.removeEventListener('change', syncWithSystem);
    }, []);

    useEffect(() => {
        if (!isExited) return;
        document.documentElement.dataset.portfolioTheme = theme;
    }, [isExited, theme]);

    useEffect(() => {
        const portfolio = portfolioRef.current;

        if (!isExited || !portfolio) return;

        const nav = portfolio.querySelector<HTMLElement>('.portfolio-nav');
        const mobileNavigation = window.matchMedia('(max-width: 640px)');
        const sections = PORTFOLIO_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
            (section): section is HTMLElement => section !== null
        );

        if (sections.length === 0) return;

        let animationFrame: number | null = null;

        const updateActiveSection = () => {
            animationFrame = null;

            const activationOffset = (nav?.offsetHeight ?? 0) + (mobileNavigation.matches ? 48 : 24);
            let nextSection = sections[0].id as PortfolioSection;

            sections.forEach(section => {
                if (section.getBoundingClientRect().top <= activationOffset) {
                    nextSection = section.id as PortfolioSection;
                }
            });

            const bottomScrollPosition = document.documentElement.scrollHeight - window.innerHeight;

            if (window.scrollY >= bottomScrollPosition - 2) {
                nextSection = sections[sections.length - 1].id as PortfolioSection;
            }

            setActiveSection(currentSection => (currentSection === nextSection ? currentSection : nextSection));
        };

        const queueActiveSectionUpdate = () => {
            if (animationFrame === null) {
                animationFrame = window.requestAnimationFrame(updateActiveSection);
            }
        };

        updateActiveSection();
        window.addEventListener('resize', queueActiveSectionUpdate);
        window.addEventListener('scroll', queueActiveSectionUpdate, { passive: true });

        return () => {
            if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', queueActiveSectionUpdate);
            window.removeEventListener('scroll', queueActiveSectionUpdate);
        };
    }, [isExited]);

    useEffect(() => {
        if (!isThemeMenuOpen) return;

        const closeOnOutsidePointer = (event: PointerEvent) => {
            if (!themeMenuRef.current?.contains(event.target as Node)) setIsThemeMenuOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            setIsThemeMenuOpen(false);
            themeMenuTriggerRef.current?.focus();
        };
        const focusFrame = window.requestAnimationFrame(() => {
            themeMenuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
        });

        document.addEventListener('pointerdown', closeOnOutsidePointer);
        document.addEventListener('keydown', closeOnEscape);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener('pointerdown', closeOnOutsidePointer);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isThemeMenuOpen]);

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const mobileNavigation = window.matchMedia('(max-width: 640px)');
        const closeOnOutsidePointer = (event: PointerEvent) => {
            if (!mobileNavRef.current?.contains(event.target as Node)) closeMobileMenu();
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            if (isThemeMenuOpen || isMobileThemeSubmenuOpen) return;
            closeMobileMenu(true, true);
        };
        const closeAtDesktopWidth = (event: MediaQueryListEvent) => {
            if (!event.matches) closeMobileMenu(false, true);
        };

        document.addEventListener('pointerdown', closeOnOutsidePointer);
        document.addEventListener('keydown', closeOnEscape);
        mobileNavigation.addEventListener('change', closeAtDesktopWidth);

        return () => {
            document.removeEventListener('pointerdown', closeOnOutsidePointer);
            document.removeEventListener('keydown', closeOnEscape);
            mobileNavigation.removeEventListener('change', closeAtDesktopWidth);
        };
    }, [closeMobileMenu, isMobileMenuOpen, isMobileThemeSubmenuOpen, isThemeMenuOpen]);

    useEffect(() => {
        if (!isMobileThemeSubmenuOpen) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;
            suppressMobileMenuMotion();
            setIsMobileThemeSubmenuOpen(false);
            window.requestAnimationFrame(() => mobileThemeTriggerRef.current?.focus());
        };
        const focusFrame = window.requestAnimationFrame(() => {
            mobileThemeSubmenuRef.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
        });

        document.addEventListener('keydown', closeOnEscape);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [isMobileThemeSubmenuOpen, suppressMobileMenuMotion]);

    useEffect(() => {
        const portfolio = portfolioRef.current;

        if (!isExited || !portfolio) return;

        const sections = Array.from(portfolio.querySelectorAll<HTMLElement>('[data-reveal-section]'));
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            sections.forEach(section => {
                section.dataset.revealState = 'visible';
            });
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const section = entry.target as HTMLElement;
                    section.dataset.revealState = 'visible';
                    observer.unobserve(section);
                });
            },
            {
                rootMargin: '0px 0px -18% 0px',
                threshold: 0
            }
        );

        const activationLine = window.innerHeight * 0.82;

        sections.forEach(section => {
            const bounds = section.getBoundingClientRect();

            if (bounds.top < activationLine && bounds.bottom > 0) {
                section.dataset.revealState = 'visible';
                return;
            }

            section.dataset.revealState = 'pending';
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, [isExited]);

    if (!isExited) return null;

    const chooseThemePreference = (nextPreference: ThemePreference) => {
        saveThemePreference(nextPreference);
        setThemePreference(nextPreference);
        setIsThemeMenuOpen(false);
        window.requestAnimationFrame(() => themeMenuTriggerRef.current?.focus());
    };

    const chooseMobileThemePreference = (nextPreference: ThemePreference) => {
        saveThemePreference(nextPreference);
        setThemePreference(nextPreference);
    };

    const navigateThemeMenu = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

        const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
        const currentIndex = options.indexOf(document.activeElement as HTMLButtonElement);
        let nextIndex = currentIndex;

        if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % options.length;
        if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + options.length) % options.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = options.length - 1;

        event.preventDefault();
        options[nextIndex]?.focus();
    };

    const closeThemeMenuOnBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsThemeMenuOpen(false);
        }
    };

    return (
        <main className='portfolio' data-theme={theme} id='main-content' ref={portfolioRef}>
            <a className='portfolio-skip-link' href='#about'>
                Skip to content
            </a>
            <ScrollRail />
            <Constellation />

            <header className='portfolio-nav'>
                <div className='portfolio-nav__inner' ref={mobileNavRef}>
                    <a
                        aria-label='Anthony Griffin, back to introduction'
                        className='portfolio-nav__brand'
                        href='#about'
                        onClick={event => {
                            if (!window.matchMedia('(max-width: 640px)').matches) return;
                            closeMobileMenu(true, event.detail === 0);
                        }}>
                        Anthony Griffin
                    </a>
                    <button
                        aria-controls='portfolio-mobile-menu'
                        aria-expanded={isMobileMenuOpen}
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        className='portfolio-nav__toggle'
                        onClick={event => {
                            const skipMotion = event.detail === 0;

                            if (skipMotion) suppressMobileMenuMotion();
                            if (isMobileMenuOpen) {
                                setIsThemeMenuOpen(false);
                                setIsMobileThemeSubmenuOpen(false);
                            }
                            setIsMobileMenuOpen(isOpen => !isOpen);
                        }}
                        ref={mobileMenuToggleRef}
                        type='button'>
                        <span aria-hidden='true' className='portfolio-nav__toggle-icon'>
                            <span />
                            <span />
                        </span>
                    </button>
                    <div
                        className='portfolio-nav__actions'
                        data-mobile-open={isMobileMenuOpen}
                        data-mobile-submenu-open={isMobileThemeSubmenuOpen}
                        id='portfolio-mobile-menu'>
                        <div className='portfolio-mobile-menu__primary'>
                            <nav aria-label='Portfolio sections' className='portfolio-nav__links'>
                                {PORTFOLIO_SECTIONS.map(({ id, label }) => (
                                    <a
                                        aria-current={activeSection === id ? 'location' : undefined}
                                        href={`#${id}`}
                                        key={id}
                                        onClick={event => {
                                            if (!window.matchMedia('(max-width: 640px)').matches) return;
                                            closeMobileMenu(true, event.detail === 0);
                                        }}>
                                        {label}
                                    </a>
                                ))}
                            </nav>
                            <div className='portfolio-theme-menu' onBlur={closeThemeMenuOnBlur} ref={themeMenuRef}>
                                <button
                                    aria-controls='portfolio-theme-options'
                                    aria-expanded={isThemeMenuOpen}
                                    aria-haspopup='menu'
                                    aria-label={`Theme preference: ${THEME_PREFERENCE_LABELS[themePreference]}`}
                                    className='portfolio-theme-menu__trigger'
                                    onClick={() => setIsThemeMenuOpen(isOpen => !isOpen)}
                                    ref={themeMenuTriggerRef}
                                    type='button'>
                                    <ThemePreferenceIcon preference={themePreference} />
                                    <span className='portfolio-theme-menu__label'>
                                        {THEME_PREFERENCE_LABELS[themePreference]}
                                    </span>
                                    <ThemeMenuChevron />
                                </button>
                                {isThemeMenuOpen ? (
                                    <div
                                        aria-label='Theme preference'
                                        className='portfolio-theme-menu__options'
                                        id='portfolio-theme-options'
                                        onKeyDown={navigateThemeMenu}
                                        role='menu'>
                                        {THEME_PREFERENCES.map(preference => {
                                            const isSelected = preference === themePreference;

                                            return (
                                                <button
                                                    aria-label={`${THEME_PREFERENCE_LABELS[preference]} theme`}
                                                    aria-checked={isSelected}
                                                    className='portfolio-theme-menu__option'
                                                    data-selected={isSelected}
                                                    key={preference}
                                                    onClick={() => chooseThemePreference(preference)}
                                                    role='menuitemradio'
                                                    type='button'>
                                                    <ThemePreferenceIcon preference={preference} />
                                                    <span className='portfolio-theme-menu__label'>
                                                        {THEME_PREFERENCE_LABELS[preference]}
                                                    </span>
                                                    <span aria-hidden='true' className='portfolio-theme-menu__check'>
                                                        {isSelected ? <ThemeCheckIcon /> : null}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className='portfolio-mobile-theme-slot'>
                            <div className='portfolio-mobile-theme-slot__row'>
                                <div
                                    aria-hidden={isMobileThemeSubmenuOpen || undefined}
                                    className='portfolio-mobile-theme-slot__trigger-pane'>
                                    <button
                                        aria-controls='portfolio-mobile-theme-submenu'
                                        aria-expanded={isMobileThemeSubmenuOpen}
                                        aria-label={`Theme, ${THEME_PREFERENCE_LABELS[themePreference]} selected`}
                                        className='portfolio-mobile-theme-trigger'
                                        onClick={event => {
                                            if (event.detail === 0) suppressMobileMenuMotion();
                                            setIsMobileThemeSubmenuOpen(true);
                                        }}
                                        ref={mobileThemeTriggerRef}
                                        type='button'>
                                        <ThemePreferenceIcon preference={themePreference} />
                                        <span>Theme</span>
                                        <span className='portfolio-mobile-theme-trigger__preference'>
                                            {THEME_PREFERENCE_LABELS[themePreference]}
                                        </span>
                                        <ThemeMenuChevron />
                                    </button>
                                </div>
                                <header
                                    aria-hidden={!isMobileThemeSubmenuOpen}
                                    className='portfolio-mobile-theme-submenu__header'>
                                    <button
                                        aria-label='Back to navigation'
                                        className='portfolio-mobile-theme-submenu__back'
                                        onClick={event => {
                                            if (event.detail === 0) suppressMobileMenuMotion();
                                            setIsMobileThemeSubmenuOpen(false);
                                            window.requestAnimationFrame(() => mobileThemeTriggerRef.current?.focus());
                                        }}
                                        type='button'>
                                        <ThemeMenuBackIcon />
                                        <span>Back</span>
                                    </button>
                                    <span className='portfolio-mobile-theme-submenu__title'>Theme</span>
                                    <span aria-hidden='true' />
                                </header>
                            </div>
                            <div
                                aria-hidden={!isMobileThemeSubmenuOpen}
                                className='portfolio-mobile-theme-submenu'
                                id='portfolio-mobile-theme-submenu'
                                ref={mobileThemeSubmenuRef}>
                                <div
                                    aria-label='Theme preference'
                                    className='portfolio-mobile-theme-submenu__options'
                                    onKeyDown={navigateThemeMenu}
                                    role='menu'>
                                    {THEME_PREFERENCES.map(preference => {
                                        const isSelected = preference === themePreference;

                                        return (
                                            <button
                                                aria-label={`${THEME_PREFERENCE_LABELS[preference]} theme`}
                                                aria-checked={isSelected}
                                                className='portfolio-theme-menu__option'
                                                data-selected={isSelected}
                                                key={preference}
                                                onClick={() => chooseMobileThemePreference(preference)}
                                                role='menuitemradio'
                                                type='button'>
                                                <ThemePreferenceIcon preference={preference} />
                                                <span className='portfolio-theme-menu__label'>
                                                    {THEME_PREFERENCE_LABELS[preference]}
                                                </span>
                                                <span aria-hidden='true' className='portfolio-theme-menu__check'>
                                                    {isSelected ? <ThemeCheckIcon /> : null}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className='portfolio-shell'>
                <section aria-labelledby='about-title' className='portfolio-intro' data-reveal-section id='about'>
                    <div className='portfolio-intro__copy'>
                        <h1 id='about-title'>Building thoughtful, reliable products.</h1>
                        <p>
                            I’m Anthony, a full-stack software engineer based in Portland, Oregon. I build things for
                            the web that just work.
                        </p>
                        <div aria-label='Professional profiles' className='portfolio-intro__profiles'>
                            <a
                                aria-label='LinkedIn profile (opens in a new tab)'
                                href={LINKEDIN_URL}
                                rel='noreferrer'
                                target='_blank'>
                                <LinkedInIcon />
                            </a>
                            <a
                                aria-label='GitHub profile (opens in a new tab)'
                                href={GITHUB_URL}
                                rel='noreferrer'
                                target='_blank'>
                                <GitHubIcon />
                            </a>
                        </div>
                    </div>

                    <aside aria-label='Current role' className='portfolio-current-role'>
                        <h2
                            aria-label={`Currently at ${currentExperience.company}`}
                            className='portfolio-company-heading'>
                            <span>Currently at</span>
                            <CompanyLogo src={currentExperience.img} />
                        </h2>
                        <p className='portfolio-current-role__title'>{currentExperience.title}</p>
                        <div className='portfolio-meta'>
                            <span>{currentExperience.location}</span>
                            <span>{formatPeriod(currentExperience.startDate, currentExperience.endDate)}</span>
                        </div>
                        <p>{CURRENT_ROLE_SUMMARY}</p>
                    </aside>
                </section>

                <section
                    aria-labelledby='projects-title'
                    className='portfolio-section'
                    data-reveal-section
                    id='projects'>
                    <header className='portfolio-section__header portfolio-section__header--work'>
                        <h2 id='projects-title'>Projects</h2>
                        <p>Small products built to explore useful ideas and ship them in public.</p>
                    </header>

                    <div className='project-ledger'>
                        {projectsData.map(project => {
                            const dimensions = projectImageDimensions[project.name];

                            return (
                                <article className='project-entry' key={project.name}>
                                    <figure className='project-entry__media'>
                                        <img
                                            alt={`${project.name} application screenshot`}
                                            decoding='async'
                                            height={dimensions.height}
                                            loading='lazy'
                                            onError={handleImageError}
                                            src={project.img}
                                            width={dimensions.width}
                                        />
                                    </figure>

                                    <div className='project-entry__content'>
                                        <h3>{project.name}</h3>
                                        <div className='project-entry__description'>
                                            {project.description.map(description => (
                                                <p key={description}>{description}.</p>
                                            ))}
                                        </div>
                                        {project.url ? (
                                            <a
                                                className='portfolio-link'
                                                href={project.url}
                                                rel='noreferrer'
                                                target='_blank'>
                                                View live project
                                                <ExternalLinkIcon />
                                            </a>
                                        ) : null}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section
                    aria-labelledby='experience-title'
                    className='portfolio-section'
                    data-reveal-section
                    id='experience'>
                    <header className='portfolio-section__header'>
                        <h2 id='experience-title'>Experience</h2>
                        <p>A timeline of roles, responsibilities, and outcomes.</p>
                    </header>

                    <ol className='experience-ledger'>
                        {experienceEntries.map(experience => (
                            <li className='experience-entry' key={experience.company}>
                                <div className='experience-entry__summary'>
                                    <div className='experience-entry__heading'>
                                        <CompanyLogo src={experience.img} />
                                        <div>
                                            <h3>{experience.company}</h3>
                                            <p>{experience.title}</p>
                                        </div>
                                    </div>
                                    <div className='experience-entry__period'>
                                        <time>{formatPeriod(experience.startDate, experience.endDate)}</time>
                                        <span>{experience.location}</span>
                                    </div>
                                </div>
                                <ul className='experience-entry__details'>
                                    {experience.description.map(description => (
                                        <li key={description}>{description}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </section>

                <section
                    aria-labelledby='stack-title'
                    className='portfolio-section portfolio-section--compact'
                    data-reveal-section
                    id='stack'>
                    <header className='portfolio-section__header'>
                        <h2 id='stack-title'>Tech stack</h2>
                        <p>The languages, platforms, and tools I use to take software from idea to production.</p>
                    </header>

                    <dl className='tech-stack'>
                        {TECH_STACK_GROUPS.map(group => (
                            <div className='tech-stack__group' key={group.label}>
                                <dt>{group.label}</dt>
                                <dd>
                                    <ul>
                                        {group.items.map(item => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </section>

                <section
                    aria-labelledby='contact-title'
                    className='portfolio-section portfolio-contact'
                    data-reveal-section
                    id='contact'>
                    <header className='portfolio-section__header portfolio-contact__intro'>
                        <h2 id='contact-title'>Contact</h2>
                        <p>Let’s connect</p>
                    </header>

                    <address className='portfolio-contact__methods'>
                        <div className='portfolio-contact__method portfolio-contact__method--copyable'>
                            <a className='portfolio-contact__method-main' href={`mailto:${EMAIL_ADDRESS}`}>
                                <EmailIcon />
                                <span className='portfolio-contact__details'>
                                    <small>Email</small>
                                    <strong>{EMAIL_ADDRESS}</strong>
                                </span>
                            </a>
                            <ContactCopyButton label='email address' value={EMAIL_ADDRESS} />
                        </div>
                        <div className='portfolio-contact__method portfolio-contact__method--copyable'>
                            <div className='portfolio-contact__method-main portfolio-contact__phone-static'>
                                <PhoneIcon />
                                <span className='portfolio-contact__details'>
                                    <small>Phone</small>
                                    <strong>{PHONE_DISPLAY}</strong>
                                </span>
                            </div>
                            <a
                                className='portfolio-contact__method-main portfolio-contact__phone-link'
                                href={PHONE_URL}>
                                <PhoneIcon />
                                <span className='portfolio-contact__details'>
                                    <small>Phone</small>
                                    <strong>{PHONE_DISPLAY}</strong>
                                </span>
                            </a>
                            <ContactCopyButton label='phone number' value={PHONE_DISPLAY} />
                        </div>
                        <a
                            className='portfolio-contact__method portfolio-contact__method--linkedin'
                            href={LINKEDIN_URL}
                            rel='noreferrer'
                            target='_blank'>
                            <LinkedInIcon />
                            <span className='portfolio-contact__details'>
                                <small>LinkedIn</small>
                                <strong>Anthony Griffin</strong>
                            </span>
                            <ExternalLinkIcon />
                        </a>
                    </address>
                </section>

                <footer className='portfolio-footer'>
                    <span>I have nothing to put here but keeping the footer for easier scrolling :)</span>
                </footer>
            </div>
        </main>
    );
};
