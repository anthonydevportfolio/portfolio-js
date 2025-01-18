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
        description: ['Wordle inspired, Pokemon themed guessing game', 'New monsters to guess daily'],
        stack: ['JavaScript', 'Node', 'MongoDB', 'Express.js'],
        url: 'https://pokedle.co'
    },
    {
        name: 'pol.ai',
        img: polai,
        description: ['For fun ChatGPT wrapper', 'Analyzes and highlights political bias in text', 'Provides alternative phrasing when bias is detected'],
        stack: ['TypeScript', 'Node', 'MongoDB', 'Express.js', 'ChatGPT'],
        url: 'https://anthony4834.github.io/polai/'
    }
];
