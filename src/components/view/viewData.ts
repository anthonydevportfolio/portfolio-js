import { ExperienceData } from '../experience/data';
import { projectsData } from '../projects/projectsData';

export const GITHUB_URL = 'https://github.com/anthonydevportfolio';
export const CORE_TECHNOLOGIES = ['TypeScript', 'Java', 'React', 'Node.js', 'AWS', 'SQL'];
export const CURRENT_ROLE_SUMMARY =
    'Built a React interface for an internal application and a self-service automated testing platform used for QA and automation.';

export const experienceEntries = [...ExperienceData].reverse();
export const currentExperience = experienceEntries[0];
export const portfolioProjects = projectsData;

export const projectImageDimensions: Record<string, { width: number; height: number }> = {
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

export const formatPeriod = (startDate: string, endDate: string) => `${formatDate(startDate)} — ${formatDate(endDate)}`;
