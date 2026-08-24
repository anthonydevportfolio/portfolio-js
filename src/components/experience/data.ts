import freddieMac from '../../assets/freddie-mac.jpg';

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

export const ExperienceData: ExperienceDataItem[] = [
    {
        title: 'Associate Software Engineer · SDET, via Hexaware Technologies',
        company: 'Freddie Mac',
        location: 'McLean, VA',
        startDate: '02/2022',
        endDate: '05/2023',
        description: [
            'Built a Java and Spring Boot end-to-end testing platform with Selenium and Cucumber, automating every contracted application flow ahead of project completion.',
            'Validated multi-system data integrity by tracing identifiers across large relational datasets and partnering across teams to diagnose failures and document edge cases.'
        ],
        img: freddieMac,
        borderColor: '#2d73d3'
    },
    {
        title: 'Software Development Engineer',
        company: 'Workday',
        location: 'Beaverton, OR',
        startDate: '05/2023',
        endDate: 'present',
        description: [
            "Shipped production features for Workday's Developer Site ahead of its largest developer event, supporting the platform's expansion beyond enterprise customers.",
            'Made JavaScript-rendered documentation usable by AI coding agents through build-time Markdown and content negotiation, avoiding a higher-risk SSR migration.',
            'Cut Jenkins validation from 30–60 minutes to about five by parallelizing Cypress suites—an 83–92% reduction across 900–1,200 monthly runs for 52 engineers.',
            'Own shared frontend architecture across an Nx monorepo of roughly 15 libraries supporting the core application and nine micro-frontends.',
            'Built testing-platform features for 400 users across 40 teams, including coverage analytics and virtualized heatmaps spanning 1,600 tests, 65,000+ daily runs, and 73 environments.'
        ],
        img: 'https://avatars.slack-edge.com/2019-06-04/654730471380_7818728cd67608896caa_512.png',
        borderColor: 'white'
    }
];
