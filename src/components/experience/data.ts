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
        title: 'Associate Software Development Engineer',
        company: 'Hexaware',
        location: 'McLean, VA',
        startDate: '06/2021',
        endDate: '05/2022',
        description: [
            'Built web solutions for a real-estate client using Java, JavaScript, and SQL.',
            'Worked with the team to accelerate testing and deployment for several intranet applications using Cucumber, JUnit, and an Agile delivery process.',
            'Supported external teams developing and testing microservices that process high-volume data.',
            'Designed automated API tests driven by XML spreadsheet input data.'
        ],
        img: 'https://api.getkoala.com/web/companies/hexaware.com/logo',
        borderColor: '#2d73d3'
    },
    {
        title: 'Software Development Engineer',
        company: 'Workday',
        location: 'Beaverton, OR',
        startDate: '05/2022',
        endDate: 'present',
        description: [
            'Led the design and implementation of a React interface for an internal application, improving its user experience.',
            'Prototyped Cypress integration for the testing platform, helping the team move away from outdated tooling.',
            'Presented to end users before and after release, translating feedback into product improvements.',
            'Organized bug bashes that surfaced and resolved critical frontend and backend issues.',
            'Built and maintained a self-service automated testing platform used for QA and automation.'
        ],
        img: 'https://avatars.slack-edge.com/2019-06-04/654730471380_7818728cd67608896caa_512.png',
        borderColor: 'white'
    }
];
