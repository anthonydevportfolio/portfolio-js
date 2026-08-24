import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const portfolioPath = join(projectRoot, 'src', 'data', 'portfolio.json');
const indexPath = join(projectRoot, 'index.html');
const publicDirectory = join(projectRoot, 'public');

const portfolio = JSON.parse(await readFile(portfolioPath, 'utf8'));
const siteUrl = portfolio.siteUrl.replace(/\/$/, '');

const escapeHtml = value =>
    String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

const escapeXml = value => escapeHtml(value);
const markdownLink = (label, url) => `[${label.replaceAll('[', '\\[').replaceAll(']', '\\]')}](${url})`;
const sentence = value => (/[.!?]$/.test(value) ? value : `${value}.`);

const projectDescription = project => project.description.map(sentence).join(' ');
const experienceNewestFirst = [...portfolio.experience].reverse();
const currentExperience = experienceNewestFirst[0];
const allTechnologies = [...new Set(portfolio.techStack.flatMap(group => group.items))];

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${siteUrl}/#anthony-griffin`,
            name: portfolio.name,
            url: `${siteUrl}/`,
            jobTitle: currentExperience.title,
            description: portfolio.summary,
            email: `mailto:${portfolio.contact.email}`,
            telephone: portfolio.contact.phoneUrl.replace('tel:', ''),
            homeLocation: {
                '@type': 'Place',
                name: portfolio.location
            },
            worksFor: {
                '@type': 'Organization',
                name: currentExperience.company
            },
            knowsAbout: allTechnologies,
            sameAs: [portfolio.profiles.github, portfolio.profiles.linkedin]
        },
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: `${portfolio.name} — Portfolio`,
            description: portfolio.summary,
            author: {
                '@id': `${siteUrl}/#anthony-griffin`
            }
        },
        {
            '@type': 'ItemList',
            '@id': `${siteUrl}/#projects`,
            name: `${portfolio.name}'s selected software projects`,
            itemListElement: portfolio.projects.map((project, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'SoftwareSourceCode',
                    name: project.name,
                    description: projectDescription(project),
                    url: project.url,
                    programmingLanguage: project.stack,
                    author: {
                        '@id': `${siteUrl}/#anthony-griffin`
                    }
                }
            }))
        }
    ]
};

const staticProjects = portfolio.projects
    .map(
        project => `
                    <article>
                        <h3>${escapeHtml(project.name)}</h3>
                        ${project.description.map(item => `<p>${escapeHtml(sentence(item))}</p>`).join('\n                        ')}
                        <p><strong>Technologies:</strong> ${escapeHtml(project.stack.join(', '))}</p>
                        <p><a href="${escapeHtml(project.url)}">View ${escapeHtml(project.name)}</a></p>
                    </article>`
    )
    .join('');

const staticExperience = experienceNewestFirst
    .map(
        experience => `
                    <article>
                        <h3>${escapeHtml(experience.company)} — ${escapeHtml(experience.title)}</h3>
                        <p>${escapeHtml(experience.startDate)}–${escapeHtml(experience.endDate)} · ${escapeHtml(experience.location)}</p>
                        <ul>
                            ${experience.description.map(item => `<li>${escapeHtml(item)}</li>`).join('\n                            ')}
                        </ul>
                    </article>`
    )
    .join('');

const staticTechStack = portfolio.techStack
    .map(
        group => `
                    <div>
                        <h3>${escapeHtml(group.label)}</h3>
                        <p>${escapeHtml(group.items.join(', '))}</p>
                    </div>`
    )
    .join('');

const head = `<!-- agent-head:start -->
        <meta name="description" content="${escapeHtml(portfolio.summary)}" />
        <meta name="author" content="${escapeHtml(portfolio.name)}" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="${escapeHtml(portfolio.name)} — Portfolio" />
        <meta property="og:description" content="${escapeHtml(portfolio.summary)}" />
        <meta property="og:url" content="${siteUrl}/" />
        <link rel="canonical" href="${siteUrl}/" />
        <link rel="alternate" type="text/markdown" href="/portfolio.md" title="${escapeHtml(portfolio.name)} portfolio in Markdown" />
        <link rel="describedby" type="text/markdown" href="/llms.txt" />
        <script type="application/ld+json">
${JSON.stringify(structuredData, null, 4).replaceAll('<', '\\u003c')}
        </script>
        <style>
            .static-portfolio { box-sizing: border-box; max-width: 72rem; margin: 0 auto; padding: 3rem 1.5rem 6rem; color: #202124; font: 1rem/1.65 system-ui, sans-serif; }
            .static-portfolio header, .static-portfolio section { margin-bottom: 3rem; }
            .static-portfolio h1, .static-portfolio h2, .static-portfolio h3 { line-height: 1.2; }
            .static-portfolio article { margin-block: 2rem; }
            .static-portfolio a { color: #3154d9; }
            @media (prefers-color-scheme: dark) {
                .static-portfolio { color: #f1f2f4; background: #101114; }
                .static-portfolio a { color: #a9b9ff; }
            }
        </style>
        <!-- agent-head:end -->`;

const staticShell = `<!-- agent-content:start -->
            <main class="static-portfolio">
                <header>
                    <h1>${escapeHtml(portfolio.name)}</h1>
                    <p><strong>${escapeHtml(portfolio.headline)}</strong></p>
                    <p>${escapeHtml(portfolio.introduction)}</p>
                    <p>${escapeHtml(portfolio.currentFocus)}</p>
                    <nav aria-label="Professional profiles">
                        <a href="${escapeHtml(portfolio.profiles.github)}">GitHub</a> ·
                        <a href="${escapeHtml(portfolio.profiles.linkedin)}">LinkedIn</a>
                    </nav>
                </header>
                <section aria-labelledby="static-projects-title">
                    <h2 id="static-projects-title">Selected projects</h2>${staticProjects}
                </section>
                <section aria-labelledby="static-experience-title">
                    <h2 id="static-experience-title">Experience</h2>${staticExperience}
                </section>
                <section aria-labelledby="static-skills-title">
                    <h2 id="static-skills-title">Skills</h2>${staticTechStack}
                </section>
                <section aria-labelledby="static-contact-title">
                    <h2 id="static-contact-title">Contact</h2>
                    <address>
                        <a href="mailto:${escapeHtml(portfolio.contact.email)}">${escapeHtml(portfolio.contact.email)}</a><br />
                        <a href="${escapeHtml(portfolio.contact.phoneUrl)}">${escapeHtml(portfolio.contact.phoneDisplay)}</a>
                    </address>
                </section>
            </main>
            <!-- agent-content:end -->`;

const indexTemplate = await readFile(indexPath, 'utf8');

if (!indexTemplate.includes('agent-head:start') || !indexTemplate.includes('agent-content:start')) {
    throw new Error('Could not find the agent content markers in index.html');
}

const generatedIndex = indexTemplate
    .replace(/<!-- agent-head:start -->[\s\S]*?<!-- agent-head:end -->/, head)
    .replace(/<!-- agent-content:start -->[\s\S]*?<!-- agent-content:end -->/, staticShell);

const portfolioMarkdown = `# ${portfolio.name}

${portfolio.headline}

${portfolio.introduction}

## Current focus

${portfolio.currentFocus}

## Selected projects
${portfolio.projects
    .map(
        project => `
### ${project.name}

${project.description.map(sentence).join(' ')}

Technologies: ${project.stack.join(', ')}

- ${markdownLink('Live project', project.url)}
`
    )
    .join('')}
## Experience
${experienceNewestFirst
    .map(
        experience => `
### ${experience.company} — ${experience.title}

${experience.startDate}–${experience.endDate} · ${experience.location}

${experience.description.map(item => `- ${item}`).join('\n')}
`
    )
    .join('')}
## Skills
${portfolio.techStack
    .map(
        group => `
### ${group.label}

${group.items.map(item => `- ${item}`).join('\n')}
`
    )
    .join('')}
## Contact

- Email: ${markdownLink(portfolio.contact.email, `mailto:${portfolio.contact.email}`)}
- Phone: ${markdownLink(portfolio.contact.phoneDisplay, portfolio.contact.phoneUrl)}
- GitHub: ${portfolio.profiles.github}
- LinkedIn: ${portfolio.profiles.linkedin}
`;

const llmsText = `# ${portfolio.name}

> Personal portfolio of ${portfolio.name}, a ${portfolio.headline.toLowerCase()}

## Portfolio

- ${markdownLink('Portfolio overview', `${siteUrl}/portfolio.md`)}: Biography, skills, experience, contact details, and selected software projects.
- ${markdownLink('Interactive portfolio', `${siteUrl}/`)}: Visual, interactive version of the same portfolio.

## Profiles

- ${markdownLink('GitHub', portfolio.profiles.github)}
- ${markdownLink('LinkedIn', portfolio.profiles.linkedin)}
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${escapeXml(`${siteUrl}/`)}</loc></url>
    <url><loc>${escapeXml(`${siteUrl}/portfolio.md`)}</loc></url>
    <url><loc>${escapeXml(`${siteUrl}/llms.txt`)}</loc></url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await Promise.all([
    writeFile(indexPath, generatedIndex, 'utf8'),
    writeFile(join(publicDirectory, 'portfolio.md'), portfolioMarkdown, 'utf8'),
    writeFile(join(publicDirectory, 'llms.txt'), llmsText, 'utf8'),
    writeFile(join(publicDirectory, 'sitemap.xml'), sitemap, 'utf8'),
    writeFile(join(publicDirectory, 'robots.txt'), robots, 'utf8')
]);

console.log('Generated agent-readable portfolio content.');
