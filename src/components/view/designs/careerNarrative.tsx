import { FC } from 'react';
import { GITHUB_URL, experienceEntries, formatPeriod, portfolioProjects } from '../viewData';
import { ExternalLinkIcon, ProjectImage } from './shared';

export const CareerNarrative: FC = () => {
    const [currentRole, previousRole] = experienceEntries;
    const [pokedle, polai] = portfolioProjects;

    return (
        <div className='career-narrative'>
            <header className='career-narrative__header' id='portfolio-content'>
                <a href='#portfolio-content'>Anthony Griffin</a>
                <nav aria-label='Career narrative sections'>
                    <a href='#career-present'>Present</a>
                    <a href='#career-foundation'>Foundation</a>
                    <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                        GitHub
                        <ExternalLinkIcon />
                    </a>
                </nav>
                <div>
                    <h1>From Java services to React interfaces and testing platforms.</h1>
                    <p>
                        A chronological account of the roles and independent projects that shaped Anthony’s full-stack
                        practice.
                    </p>
                </div>
            </header>

            <div className='career-narrative__story'>
                <section
                    aria-labelledby='career-present-title'
                    className='career-narrative__chapter'
                    id='career-present'>
                    <div className='career-narrative__marker'>
                        <span>Present</span>
                        <time>{formatPeriod(currentRole.startDate, currentRole.endDate)}</time>
                    </div>
                    <article className='career-narrative__role'>
                        <header>
                            <h2 id='career-present-title'>{currentRole.company}</h2>
                            <p>{currentRole.title}</p>
                            <span>{currentRole.location}</span>
                        </header>
                        <ul>
                            {currentRole.description.map(description => (
                                <li key={description}>{description}</li>
                            ))}
                        </ul>
                    </article>
                </section>

                <section
                    aria-labelledby='career-pokedle-title'
                    className='career-narrative__chapter career-narrative__chapter--project'>
                    <div className='career-narrative__marker'>
                        <span>Independent build</span>
                        <span>Daily game</span>
                    </div>
                    <article>
                        <div className='career-narrative__project-copy'>
                            <h2 id='career-pokedle-title'>{pokedle.name}</h2>
                            {pokedle.description.map(description => (
                                <p key={description}>{description}.</p>
                            ))}
                            <ul aria-label={`${pokedle.name} technologies`}>
                                {pokedle.stack.map(technology => (
                                    <li key={technology}>{technology}</li>
                                ))}
                            </ul>
                            {pokedle.url ? (
                                <a className='portfolio-text-link' href={pokedle.url} rel='noreferrer' target='_blank'>
                                    Play Pokedle
                                    <ExternalLinkIcon />
                                </a>
                            ) : null}
                        </div>
                        <figure>
                            <ProjectImage project={pokedle} />
                        </figure>
                    </article>
                </section>

                <section
                    aria-labelledby='career-foundation-title'
                    className='career-narrative__chapter'
                    id='career-foundation'>
                    <div className='career-narrative__marker'>
                        <span>Foundation</span>
                        <time>{formatPeriod(previousRole.startDate, previousRole.endDate)}</time>
                    </div>
                    <article className='career-narrative__role'>
                        <header>
                            <h2 id='career-foundation-title'>{previousRole.company}</h2>
                            <p>{previousRole.title}</p>
                            <span>{previousRole.location}</span>
                        </header>
                        <ul>
                            {previousRole.description.map(description => (
                                <li key={description}>{description}</li>
                            ))}
                        </ul>
                    </article>
                </section>

                <section
                    aria-labelledby='career-polai-title'
                    className='career-narrative__chapter career-narrative__chapter--project'>
                    <div className='career-narrative__marker'>
                        <span>Independent build</span>
                        <span>Language experiment</span>
                    </div>
                    <article>
                        <div className='career-narrative__project-copy'>
                            <h2 id='career-polai-title'>{polai.name}</h2>
                            {polai.description.map(description => (
                                <p key={description}>{description}.</p>
                            ))}
                            <ul aria-label={`${polai.name} technologies`}>
                                {polai.stack.map(technology => (
                                    <li key={technology}>{technology}</li>
                                ))}
                            </ul>
                            {polai.url ? (
                                <a className='portfolio-text-link' href={polai.url} rel='noreferrer' target='_blank'>
                                    Open pol.ai
                                    <ExternalLinkIcon />
                                </a>
                            ) : null}
                        </div>
                        <figure>
                            <ProjectImage project={polai} />
                        </figure>
                    </article>
                </section>
            </div>

            <footer className='career-narrative__footer'>
                <div>
                    <h2>The next chapter is in the code.</h2>
                    <p>Browse projects, experiments, and implementation detail on GitHub.</p>
                </div>
                <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                    Open GitHub
                    <ExternalLinkIcon />
                </a>
            </footer>
        </div>
    );
};
