import { FC } from 'react';
import {
    CORE_TECHNOLOGIES,
    CURRENT_ROLE_SUMMARY,
    GITHUB_URL,
    currentExperience,
    experienceEntries,
    formatPeriod,
    portfolioProjects
} from '../viewData';
import { ExternalLinkIcon, ProjectImage } from './shared';

const Constellation = () => (
    <div aria-hidden='true' className='proof-index__constellation'>
        <span className='proof-index__star proof-index__star--one' />
        <span className='proof-index__star proof-index__star--two' />
        <span className='proof-index__star proof-index__star--three' />
        <span className='proof-index__star proof-index__star--four' />
        <span className='proof-index__star proof-index__star--five' />
    </div>
);

export const ProofIndex: FC = () => (
    <div className='proof-index'>
        <Constellation />
        <header className='proof-index__nav'>
            <div className='proof-index__nav-inner'>
                <a
                    aria-label='Anthony Griffin, back to introduction'
                    className='proof-index__brand'
                    href='#portfolio-content'>
                    <span aria-hidden='true' />
                    Anthony Griffin
                </a>
                <nav aria-label='Portfolio sections'>
                    <a href='#portfolio-content'>About</a>
                    <a href='#proof-experience'>Experience</a>
                    <a href='#proof-work'>Work</a>
                    <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                        GitHub
                        <ExternalLinkIcon />
                    </a>
                </nav>
            </div>
        </header>

        <div className='proof-index__shell'>
            <section aria-labelledby='proof-about-title' className='proof-index__intro' id='portfolio-content'>
                <div>
                    <h1 id='proof-about-title'>React interfaces, testing platforms, and tools for complex work.</h1>
                    <p>
                        I’m Anthony Griffin, a full-stack software engineer in Portland. I work across TypeScript and
                        Java, from the interface people use to the services and test infrastructure behind it.
                    </p>
                    <ul aria-label='Core technologies' className='proof-index__tech'>
                        {CORE_TECHNOLOGIES.map(technology => (
                            <li key={technology}>{technology}</li>
                        ))}
                    </ul>
                </div>

                <aside aria-label='Current role' className='proof-index__current-role'>
                    <h2>{currentExperience.company}</h2>
                    <p className='proof-index__role-title'>{currentExperience.title}</p>
                    <div className='proof-index__meta'>
                        <span>{currentExperience.location}</span>
                        <span>{formatPeriod(currentExperience.startDate, currentExperience.endDate)}</span>
                    </div>
                    <p>{CURRENT_ROLE_SUMMARY}</p>
                </aside>
            </section>

            <section aria-labelledby='proof-experience-title' className='proof-index__section' id='proof-experience'>
                <header className='proof-index__section-heading'>
                    <h2 id='proof-experience-title'>Experience</h2>
                    <p>Roles, responsibilities, and the engineering work behind them.</p>
                </header>
                <ol className='proof-index__experience-list'>
                    {experienceEntries.map(experience => (
                        <li className='proof-index__experience-entry' key={experience.company}>
                            <div className='proof-index__period'>
                                <time>{formatPeriod(experience.startDate, experience.endDate)}</time>
                                <span>{experience.location}</span>
                            </div>
                            <div className='proof-index__experience-heading'>
                                <h3>{experience.company}</h3>
                                <p>{experience.title}</p>
                            </div>
                            <ul>
                                {experience.description.map(description => (
                                    <li key={description}>{description}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>
            </section>

            <section aria-labelledby='proof-work-title' className='proof-index__section' id='proof-work'>
                <header className='proof-index__section-heading'>
                    <h2 id='proof-work-title'>Selected work</h2>
                    <p>Working products are the clearest evidence. These two are live and inspectable.</p>
                </header>
                <div className='proof-index__project-list'>
                    {portfolioProjects.map((project, index) => (
                        <article className='proof-index__project' key={project.name}>
                            <figure>
                                <ProjectImage project={project} />
                            </figure>
                            <div>
                                <span aria-label={`Project ${index + 1}`} className='proof-index__version'>
                                    v0{index + 1}
                                </span>
                                <h3>{project.name}</h3>
                                {project.description.map(description => (
                                    <p key={description}>{description}.</p>
                                ))}
                                <ul aria-label={`${project.name} technologies`} className='proof-index__stack'>
                                    {project.stack.map(technology => (
                                        <li key={technology}>{technology}</li>
                                    ))}
                                </ul>
                                {project.url ? (
                                    <a
                                        className='portfolio-text-link'
                                        href={project.url}
                                        rel='noreferrer'
                                        target='_blank'>
                                        View live project
                                        <ExternalLinkIcon />
                                    </a>
                                ) : null}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section aria-labelledby='proof-github-title' className='proof-index__close'>
                <div>
                    <h2 id='proof-github-title'>See the code behind the work.</h2>
                    <p>Projects, experiments, and implementation details continue on GitHub.</p>
                </div>
                <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                    Open GitHub
                    <ExternalLinkIcon />
                </a>
            </section>

            <footer className='proof-index__footer'>
                <span>Anthony Griffin</span>
                <span>Portland, Oregon</span>
            </footer>
        </div>
    </div>
);
