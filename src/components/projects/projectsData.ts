import pokedle from '../../assets/pokedle.png';
import polai from '../../assets/polai.png';

export interface ProjectData {
    name: string;
    img: string;
    description: string[];
    stack: string[];
    url?: string;
}

export const projectsData: ProjectData[] = [
    {
        name: 'Pokedle',
        img: pokedle,
        description: ['Daily Pokémon guessing game inspired by Wordle', 'A new Pokémon to identify every day'],
        stack: ['JavaScript', 'Node', 'MongoDB', 'Express.js'],
        url: 'https://pokedle.co'
    },
    {
        name: 'pol.ai',
        img: polai,
        description: [
            'ChatGPT-powered experiment that analyzes political bias in text',
            'Highlights potentially biased language and suggests alternative phrasing'
        ],
        stack: ['TypeScript', 'Node', 'MongoDB', 'Express.js', 'ChatGPT'],
        url: 'https://anthony4834.github.io/polai/'
    }
];
