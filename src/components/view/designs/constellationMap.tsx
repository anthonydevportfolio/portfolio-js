import { FC } from 'react';
import { CORE_TECHNOLOGIES, GITHUB_URL, experienceEntries, formatPeriod, portfolioProjects } from '../viewData';
import { ExternalLinkIcon, ProjectImage } from './shared';

const mapNodes = [
    { className: 'constellation-map__node--about', href: '#constellation-about', label: 'About' },
    { className: 'constellation-map__node--workday', href: '#constellation-workday', label: 'Workday' },
    { className: 'constellation-map__node--pokedle', href: '#constellation-pokedle', label: 'Pokedle' },
    { className: 'constellation-map__node--hexaware', href: '#constellation-hexaware', label: 'Hexaware' },
    { className: 'constellation-map__node--polai', href: '#constellation-polai', label: 'pol.ai' },
    { className: 'constellation-map__node--github', href: GITHUB_URL, label: 'GitHub' }
];

export const ConstellationMap: FC = () => (
    <div className='constellation-map'>
        <header className='constellation-map__header'>
            <a href='#portfolio-content'>Anthony Griffin</a>
            <span>Portfolio map</span>
        </header>

        <section aria-labelledby='constellation-title' className='constellation-map__stage' id='portfolio-content'>
            <div className='constellation-map__intro'>
                <h1 id='constellation-title'>Choose a signal.</h1>
                <p>This constellation is the portfolio index. Each node opens its role, project, or profile section.</p>
            </div>

            <nav aria-label='Portfolio map' className='constellation-map__network'>
                <svg aria-hidden='true' preserveAspectRatio='none' viewBox='0 0 1000 620'>
                    <path d='M150 382 320 170 535 245 760 125 868 335 665 505 420 475 150 382' />
                    <path d='m320 170 100 305 115-230 130 260 203-170' />
                </svg>
                {mapNodes.map(node => {
                    const isExternal = node.href.startsWith('http');
                    return (
                        <a
                            className={`constellation-map__node ${node.className}`}
                            href={node.href}
                            key={node.label}
                            rel={isExternal ? 'noreferrer' : undefined}
                            target={isExternal ? '_blank' : undefined}>
                            <span aria-hidden='true' />
                            {node.label}
                        </a>
                    );
                })}
            </nav>
        </section>

        <section
            aria-labelledby='constellation-about-title'
            className='constellation-map__about'
            id='constellation-about'>
            <div>
                <h2 id='constellation-about-title'>I work across the interface boundary.</h2>
                <p>
                    I’m Anthony Griffin, a full-stack software engineer in Portland. My work spans React interfaces,
                    Java services, developer tooling, and automated testing infrastructure.
                </p>
            </div>
            <ul aria-label='Core technologies'>
                {CORE_TECHNOLOGIES.map(technology => (
                    <li key={technology}>{technology}</li>
                ))}
            </ul>
        </section>

        <section aria-labelledby='constellation-experience-title' className='constellation-map__experience'>
            <header>
                <h2 id='constellation-experience-title'>Role signals</h2>
                <p>Employment detail appears where its node lands.</p>
            </header>
            <div>
                {experienceEntries.map(experience => (
                    <article id={`constellation-${experience.company.toLowerCase()}`} key={experience.company}>
                        <div className='constellation-map__role-heading'>
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
                    </article>
                ))}
            </div>
        </section>

        <section aria-labelledby='constellation-project-title' className='constellation-map__projects'>
            <header>
                <h2 id='constellation-project-title'>Project signals</h2>
                <p>Two public projects with screenshots, technology details, and live links.</p>
            </header>
            <div>
                {portfolioProjects.map(project => (
                    <article id={`constellation-${project.name.toLowerCase().replace('.', '')}`} key={project.name}>
                        <figure>
                            <ProjectImage project={project} />
                        </figure>
                        <div>
                            <h3>{project.name}</h3>
                            {project.description.map(description => (
                                <p key={description}>{description}.</p>
                            ))}
                            <ul aria-label={`${project.name} technologies`}>
                                {project.stack.map(technology => (
                                    <li key={technology}>{technology}</li>
                                ))}
                            </ul>
                            {project.url ? (
                                <a className='portfolio-text-link' href={project.url} rel='noreferrer' target='_blank'>
                                    Open project
                                    <ExternalLinkIcon />
                                </a>
                            ) : null}
                        </div>
                    </article>
                ))}
            </div>
        </section>

        <footer className='constellation-map__footer'>
            <span>Anthony Griffin · Portland, Oregon</span>
            <a href={GITHUB_URL} rel='noreferrer' target='_blank'>
                Continue to GitHub
                <ExternalLinkIcon />
            </a>
        </footer>
    </div>
);
