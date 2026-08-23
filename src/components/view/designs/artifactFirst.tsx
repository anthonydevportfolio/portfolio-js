import { FC } from 'react';
import { GITHUB_URL, experienceEntries, formatPeriod, portfolioProjects } from '../viewData';
import { ExternalLinkIcon, ProjectImage } from './shared';

export const ArtifactFirst: FC = () => {
    const [featuredProject, secondaryProject] = portfolioProjects;

    return (
        <div className='artifact-first'>
            <header className='artifact-first__nav'>
                <a className='artifact-first__brand' href='#portfolio-content'>
                    Anthony Griffin
                </a>
                <nav aria-label='Portfolio sections'>
                    <a href='#portfolio-content'>Featured work</a>
                    <a href='#artifact-profile'>Profile</a>
                    <a href='#artifact-history'>History</a>
                    <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                        GitHub
                        <ExternalLinkIcon />
                    </a>
                </nav>
            </header>

            <section aria-labelledby='artifact-title' className='artifact-first__hero' id='portfolio-content'>
                <div className='artifact-first__hero-copy'>
                    <h1 id='artifact-title'>Work you can open, use, and inspect.</h1>
                    <p>Anthony Griffin builds product interfaces, services, developer tools, and automated tests.</p>
                </div>

                <figure className='artifact-first__featured-media'>
                    <ProjectImage eager project={featuredProject} />
                </figure>

                <div className='artifact-first__featured-copy'>
                    <div>
                        <h2>{featuredProject.name}</h2>
                        {featuredProject.description.map(description => (
                            <p key={description}>{description}.</p>
                        ))}
                    </div>
                    <ul aria-label={`${featuredProject.name} technologies`}>
                        {featuredProject.stack.map(technology => (
                            <li key={technology}>{technology}</li>
                        ))}
                    </ul>
                    {featuredProject.url ? (
                        <a href={featuredProject.url} rel='noreferrer' target='_blank'>
                            Launch {featuredProject.name}
                            <ExternalLinkIcon />
                        </a>
                    ) : null}
                </div>
            </section>

            <section aria-labelledby='artifact-secondary-title' className='artifact-first__secondary'>
                <div className='artifact-first__secondary-copy'>
                    <h2 id='artifact-secondary-title'>{secondaryProject.name}</h2>
                    {secondaryProject.description.map(description => (
                        <p key={description}>{description}.</p>
                    ))}
                    <ul aria-label={`${secondaryProject.name} technologies`}>
                        {secondaryProject.stack.map(technology => (
                            <li key={technology}>{technology}</li>
                        ))}
                    </ul>
                    {secondaryProject.url ? (
                        <a className='portfolio-text-link' href={secondaryProject.url} rel='noreferrer' target='_blank'>
                            Open the experiment
                            <ExternalLinkIcon />
                        </a>
                    ) : null}
                </div>
                <figure>
                    <ProjectImage project={secondaryProject} />
                </figure>
            </section>

            <section aria-labelledby='artifact-profile-title' className='artifact-first__profile' id='artifact-profile'>
                <h2 id='artifact-profile-title'>I build both sides of the interface.</h2>
                <div>
                    <p>
                        I work across TypeScript and Java, from the screen people use to the services and test
                        infrastructure behind it.
                    </p>
                    <p>
                        At Workday, that has included a React interface for an internal application and a self-service
                        automated testing platform used for QA and automation.
                    </p>
                </div>
            </section>

            <section aria-labelledby='artifact-history-title' className='artifact-first__history' id='artifact-history'>
                <header>
                    <h2 id='artifact-history-title'>Employment history</h2>
                    <p>Complete role detail, after the shipped work.</p>
                </header>
                <ol>
                    {experienceEntries.map(experience => (
                        <li key={experience.company}>
                            <div className='artifact-first__history-heading'>
                                <h3>{experience.company}</h3>
                                <p>{experience.title}</p>
                                <span>{formatPeriod(experience.startDate, experience.endDate)}</span>
                                <span>{experience.location}</span>
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

            <footer className='artifact-first__footer'>
                <p>More projects and implementation detail live in the repository.</p>
                <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                    Browse GitHub
                    <ExternalLinkIcon />
                </a>
            </footer>
        </div>
    );
};
