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
            'Deployed to a project in service to a client. Developed creative and effective web solutions for real estate organization using Java, JavaScript, and SQL',
            'Collaborated with my team to expedite the testing and deployment process of several intranet applications. This was achieved using Cucumber, JUnit, and other testing tools and frameworks in an Agile environment',
            'Assisted external teams in the development and testing of several microservices used to process large amounts of data',
            'Designed and developed automated tests for internal API using XML spreadsheet input data.'
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
            'Led design and implementation of a React UI for internal application, enhancing user experience.',
            'Introduced Cypress into our testing platform via proof of concept, facilitating transition from outdated tech.',
            'Presented to end-users pre- and post-release, gathering feedback for actionable improvements.',
            'Organized bug bash sessions, resolving critical front-end and back-end issues.',
            'Developed and maintained a self-service automated testing platform widely used for QA and automation.'
        ],        
        img: 'https://avatars.slack-edge.com/2019-06-04/654730471380_7818728cd67608896caa_512.png',
        borderColor: 'white'
    }
];
