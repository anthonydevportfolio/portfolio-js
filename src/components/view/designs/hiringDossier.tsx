import { FC } from 'react';
import {
    CORE_TECHNOLOGIES,
    GITHUB_URL,
    currentExperience,
    experienceEntries,
    formatPeriod,
    portfolioProjects
} from '../viewData';
import { ExternalLinkIcon, ProjectImage } from './shared';

export const HiringDossier: FC = () => (
    <div className='hiring-dossier'>
        <header className='hiring-dossier__masthead' id='portfolio-content'>
            <div>
                <h1>Anthony Griffin</h1>
                <p>Software engineer · Portland, Oregon</p>
            </div>
            <nav aria-label='Dossier sections'>
                <a href='#dossier-summary'>Summary</a>
                <a href='#dossier-experience'>Experience</a>
                <a href='#dossier-work'>Work</a>
                <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                    GitHub
                    <ExternalLinkIcon />
                </a>
            </nav>
        </header>

        <div className='hiring-dossier__body'>
            <aside className='hiring-dossier__profile' id='dossier-summary'>
                <section aria-labelledby='dossier-summary-title'>
                    <h2 id='dossier-summary-title'>Summary</h2>
                    <p>
                        Full-stack engineer working across React interfaces, Java services, developer tooling, and
                        automated testing infrastructure.
                    </p>
                </section>

                <section aria-labelledby='dossier-current-title'>
                    <h2 id='dossier-current-title'>Current</h2>
                    <h3>{currentExperience.company}</h3>
                    <p>{currentExperience.title}</p>
                    <span>{formatPeriod(currentExperience.startDate, currentExperience.endDate)}</span>
                    <span>{currentExperience.location}</span>
                </section>

                <section aria-labelledby='dossier-stack-title'>
                    <h2 id='dossier-stack-title'>Core stack</h2>
                    <ul>
                        {CORE_TECHNOLOGIES.map(technology => (
                            <li key={technology}>{technology}</li>
                        ))}
                    </ul>
                </section>

                <a className='hiring-dossier__github' href={GITHUB_URL} rel='noreferrer' target='_blank'>
                    Inspect repositories
                    <ExternalLinkIcon />
                </a>
            </aside>

            <div className='hiring-dossier__record'>
                <section aria-labelledby='dossier-experience-title' id='dossier-experience'>
                    <header className='hiring-dossier__section-heading'>
                        <h2 id='dossier-experience-title'>Experience</h2>
                        <span>{experienceEntries.length} roles</span>
                    </header>
                    <ol className='hiring-dossier__experience'>
                        {experienceEntries.map(experience => (
                            <li key={experience.company}>
                                <div className='hiring-dossier__role-meta'>
                                    <time>{formatPeriod(experience.startDate, experience.endDate)}</time>
                                    <span>{experience.location}</span>
                                </div>
                                <div className='hiring-dossier__role-title'>
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

                <section aria-labelledby='dossier-work-title' id='dossier-work'>
                    <header className='hiring-dossier__section-heading'>
                        <h2 id='dossier-work-title'>Public work</h2>
                        <span>{portfolioProjects.length} projects</span>
                    </header>
                    <div className='hiring-dossier__projects'>
                        {portfolioProjects.map(project => (
                            <article key={project.name}>
                                <figure>
                                    <ProjectImage project={project} />
                                </figure>
                                <div>
                                    <h3>{project.name}</h3>
                                    {project.description.map(description => (
                                        <p key={description}>{description}.</p>
                                    ))}
                                </div>
                                <ul aria-label={`${project.name} technologies`}>
                                    {project.stack.map(technology => (
                                        <li key={technology}>{technology}</li>
                                    ))}
                                </ul>
                                {project.url ? (
                                    <a href={project.url} rel='noreferrer' target='_blank'>
                                        Live project
                                        <ExternalLinkIcon />
                                    </a>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>

        <footer className='hiring-dossier__footer'>
            <span>Portfolio record · Anthony Griffin</span>
            <span>Updated from repository facts</span>
        </footer>
    </div>
);
