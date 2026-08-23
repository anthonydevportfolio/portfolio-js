import { FC } from 'react';
import { handleImageError } from '../../imageFallback';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { ExperienceData } from '../experience/data';
import { projectsData } from '../projects/projectsData';
import './view.css';

const GITHUB_URL = 'https://github.com/anthonydevportfolio';
const CORE_TECHNOLOGIES = ['TypeScript', 'Java', 'React', 'Node.js', 'AWS', 'SQL'];
const experienceEntries = [...ExperienceData].reverse();
const currentExperience = experienceEntries[0];

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

    if (!isExited) return null;

    return (
        <main className='portfolio' id='main-content'>
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
                        <span aria-hidden='true' className='portfolio-nav__signal' />
                        Anthony Griffin
                    </a>
                    <nav aria-label='Portfolio sections' className='portfolio-nav__links'>
                        <a href='#about'>About</a>
                        <a href='#experience'>Experience</a>
                        <a href='#work'>Work</a>
                        <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                            GitHub
                            <ExternalLinkIcon />
                        </a>
                    </nav>
                </div>
            </header>

            <div className='portfolio-shell'>
                <section aria-labelledby='about-title' className='portfolio-intro' id='about'>
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
                        <h2>Currently at {currentExperience.company}</h2>
                        <p className='portfolio-current-role__title'>{currentExperience.title}</p>
                        <div className='portfolio-meta'>
                            <span>{currentExperience.location}</span>
                            <span>{formatPeriod(currentExperience.startDate, currentExperience.endDate)}</span>
                        </div>
                        <p>{currentExperience.description[0]}</p>
                    </aside>
                </section>

                <section aria-labelledby='experience-title' className='portfolio-section' id='experience'>
                    <header className='portfolio-section__header'>
                        <h2 id='experience-title'>Experience</h2>
                        <p>Selected roles and the work I contributed along the way.</p>
                    </header>

                    <ol className='experience-ledger'>
                        {experienceEntries.map(experience => (
                            <li className='experience-entry' key={experience.company}>
                                <div className='experience-entry__period'>
                                    <time>{formatPeriod(experience.startDate, experience.endDate)}</time>
                                    <span>{experience.location}</span>
                                </div>
                                <div className='experience-entry__heading'>
                                    <h3>{experience.company}</h3>
                                    <p>{experience.title}</p>
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

                <section aria-labelledby='work-title' className='portfolio-section' id='work'>
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

                <section aria-labelledby='github-title' className='portfolio-close'>
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
