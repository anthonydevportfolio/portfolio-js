import {
    FC,
    FocusEvent as ReactFocusEvent,
    KeyboardEvent as ReactKeyboardEvent,
    useEffect,
    useRef,
    useState
} from 'react';
import { handleImageError } from '../../imageFallback';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { ExperienceData } from '../experience/data';
import { projectsData } from '../projects/projectsData';
import './view.css';

const GITHUB_URL = 'https://github.com/anthonydevportfolio';
const CORE_TECHNOLOGIES = ['TypeScript', 'Java', 'React', 'Node.js', 'AWS', 'SQL'];
const CURRENT_ROLE_SUMMARY =
    'Building developer-platform experiences, shared frontend architecture, and testing infrastructure across Workday.';
const THEME_STORAGE_KEY = 'portfolio-theme';
const experienceEntries = [...ExperienceData].reverse();
const currentExperience = experienceEntries[0];

type Theme = 'dark' | 'light';
type ThemePreference = Theme | 'system';

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

const ThemeMenuChevron = () => (
    <svg aria-hidden='true' className='portfolio-theme-menu__chevron' viewBox='0 0 16 16'>
        <path d='m5 6.5 3 3 3-3' />
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
    const themeMenuRef = useRef<HTMLDivElement | null>(null);
    const themeMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
    const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialThemePreference);
    const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const theme = themePreference === 'system' ? systemTheme : themePreference;

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
                rootMargin: '0px 0px -12% 0px',
                threshold: 0.08
            }
        );

        const activationLine = window.innerHeight * 0.88;

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
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setIsThemeMenuOpen(false);
    };

    return (
        <main className='portfolio' data-theme={theme} id='main-content' ref={portfolioRef}>
            <a className='portfolio-skip-link' href='#about'>
                Skip to content
            </a>
            <Constellation />

            <header className='portfolio-nav'>
                <div className='portfolio-nav__inner'>
                    <a
                        aria-label='Anthony Griffin, back to introduction'
                        className='portfolio-nav__brand'
                        href='#about'>
                        Anthony Griffin
                    </a>
                    <div className='portfolio-nav__actions'>
                        <nav aria-label='Portfolio sections' className='portfolio-nav__links'>
                            <a href='#about'>About</a>
                            <a href='#experience'>Experience</a>
                            <a href='#work'>Work</a>
                            <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                                GitHub
                                <ExternalLinkIcon />
                            </a>
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
                                <span>{THEME_PREFERENCE_LABELS[themePreference]}</span>
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
                                                aria-checked={isSelected}
                                                className='portfolio-theme-menu__option'
                                                data-selected={isSelected}
                                                key={preference}
                                                onClick={() => chooseThemePreference(preference)}
                                                role='menuitemradio'
                                                type='button'>
                                                <ThemePreferenceIcon preference={preference} />
                                                <span>{THEME_PREFERENCE_LABELS[preference]}</span>
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
                </div>
            </header>

            <div className='portfolio-shell'>
                <section aria-labelledby='about-title' className='portfolio-intro' data-reveal-section id='about'>
                    <div className='portfolio-intro__copy'>
                        <h1 id='about-title'>Software engineer building thoughtful, reliable products.</h1>
                        <p>
                            I’m Anthony, a full-stack engineer based in Portland, Oregon. I work across TypeScript and
                            Java to build interfaces, services, and developer tooling that make complex work easier to
                            understand.
                        </p>
                        <ul aria-label='Core technologies' className='portfolio-tech-list'>
                            {CORE_TECHNOLOGIES.map(technology => (
                                <li key={technology}>{technology}</li>
                            ))}
                        </ul>
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
                    aria-labelledby='experience-title'
                    className='portfolio-section'
                    data-reveal-section
                    id='experience'>
                    <header className='portfolio-section__header'>
                        <h2 id='experience-title'>Experience</h2>
                        <p>Selected roles and the work I contributed along the way.</p>
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

                <section aria-labelledby='work-title' className='portfolio-section' data-reveal-section id='work'>
                    <header className='portfolio-section__header portfolio-section__header--work'>
                        <h2 id='work-title'>Selected work</h2>
                        <p>Small products built to explore useful ideas and ship them in public.</p>
                    </header>

                    <div className='project-ledger'>
                        {projectsData.map((project, index) => {
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
                                        <div className='project-entry__version' aria-label={`Project ${index + 1}`}>
                                            v0{index + 1}
                                        </div>
                                        <h3>{project.name}</h3>
                                        <div className='project-entry__description'>
                                            {project.description.map(description => (
                                                <p key={description}>{description}.</p>
                                            ))}
                                        </div>
                                        <ul
                                            aria-label={`${project.name} technologies`}
                                            className='project-entry__stack'>
                                            {project.stack.map(technology => (
                                                <li key={technology}>{technology}</li>
                                            ))}
                                        </ul>
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

                <section aria-labelledby='github-title' className='portfolio-close' data-reveal-section>
                    <div>
                        <h2 id='github-title'>More work lives on GitHub.</h2>
                        <p>Explore the projects, experiments, and implementation details behind the portfolio.</p>
                    </div>
                    <a className='portfolio-close__action' href={GITHUB_URL} rel='noreferrer' target='_blank'>
                        View GitHub
                        <ExternalLinkIcon />
                    </a>
                </section>

                <footer className='portfolio-footer'>
                    <span>Anthony Griffin</span>
                    <span>Portland, Oregon</span>
                </footer>
            </div>
        </main>
    );
};
