import portfolioContent from './portfolio.json';

export interface PortfolioProject {
    name: string;
    description: string[];
    stack: string[];
    url?: string;
}

export interface PortfolioExperience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
}

export interface PortfolioData {
    siteUrl: string;
    name: string;
    headline: string;
    introductionHeading: string;
    introduction: string;
    summary: string;
    location: string;
    currentFocus: string;
    contact: {
        email: string;
        phoneDisplay: string;
        phoneUrl: string;
    };
    profiles: {
        github: string;
        linkedin: string;
    };
    projects: PortfolioProject[];
    experience: PortfolioExperience[];
    techStack: Array<{
        label: string;
        items: string[];
    }>;
}

export const portfolio: PortfolioData = portfolioContent;
