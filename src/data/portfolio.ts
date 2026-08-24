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
    landing: {
        greeting: string;
        introduction: string;
        action: string;
    };
    sections: {
        about: {
            title: string;
        };
        projects: {
            title: string;
            description: string;
        };
        experience: {
            title: string;
            description: string;
        };
        techStack: {
            title: string;
            description: string;
        };
        contact: {
            title: string;
            description: string;
        };
    };
    labels: {
        currentRole: string;
        projectLink: string;
        email: string;
        phone: string;
        linkedin: string;
    };
    footer: string;
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
