import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { handleImageError } from '../../imageFallback';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { ExperienceData } from '../experience/data';
import { projectsData } from '../projects/projectsData';
import './view.css';

const GITHUB_URL = 'https://github.com/anthonydevportfolio';
const CORE_TECHNOLOGIES = ['TypeScript', 'Java', 'React', 'Node.js', 'AWS', 'SQL'];
const CURRENT_ROLE_SUMMARY = 'Developing tools used by engineers and customers for the Workday Developer Platform.';
const THEME_STORAGE_KEY = 'portfolio-theme';
const experienceEntries = [...ExperienceData].reverse();
const currentExperience = experienceEntries[0];

type Theme = 'dark' | 'light';
type ThemePreference = Theme | 'system';

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
    Pokedle: { width: 3808, height: 2264 },
    'pol.ai': { width: 4320, height: 2584 }
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

const ThemeSelectChevron = () => (
    <svg aria-hidden='true' className='portfolio-theme-select__icon' viewBox='0 0 16 16'>
        <path d='m5 6.5 3 3 3-3' />
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
    const [themePreference, setThemePreference] = useState<ThemePreference>(getInitialThemePreference);
    const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);
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

    const changeThemePreference = (event: ChangeEvent<HTMLSelectElement>) => {
        const nextPreference = event.target.value as ThemePreference;
        saveThemePreference(nextPreference);
        setThemePreference(nextPreference);
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
                        <div className='portfolio-theme-select'>
                            <select
                                aria-label='Theme preference'
                                onChange={changeThemePreference}
                                value={themePreference}>
                                <option value='system'>System</option>
                                <option value='light'>Light</option>
                                <option value='dark'>Dark</option>
                            </select>
                            <ThemeSelectChevron />
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
