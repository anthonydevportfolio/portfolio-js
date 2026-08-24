import freddieMac from '../../assets/freddie-mac.jpg';
import { portfolio } from '../../data/portfolio';

export interface ExperienceDataItem {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
    img: string;
    borderColor: string;
}

const experienceVisuals: Record<string, Pick<ExperienceDataItem, 'img' | 'borderColor'>> = {
    'Freddie Mac': {
        img: freddieMac,
        borderColor: '#2d73d3'
    },
    Workday: {
        img: 'https://avatars.slack-edge.com/2019-06-04/654730471380_7818728cd67608896caa_512.png',
        borderColor: 'white'
    }
};

export const ExperienceData: ExperienceDataItem[] = portfolio.experience.map(experience => ({
    ...experience,
    ...experienceVisuals[experience.company]
}));
