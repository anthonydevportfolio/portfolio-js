import fmr from '../../assets/fmr.png';
import pokedle from '../../assets/pokedle.png';
import blocklens from '../../assets/blocklens.png';
import chrona from '../../assets/chrona.png';
import polai from '../../assets/polai.png';
import solas from '../../assets/solas.png';

export interface ProjectData {
    name: string;
    img: string;
    description: string[];
    stack: string[];
    url?: string;
}

export const projectsData: ProjectData[] = [
    {
        name: 'fmr.fyi',
        img: fmr,
        description: [
            'Free Section 8 market-research platform built for a dedicated investor community',
            'Connects HUD FMR and SAFMR lookup, market screening, cash-flow modeling, and saved comparisons',
            'Adds FMR and cash-flow context to Zillow, Redfin, and Realtor.com through a Chrome extension'
        ],
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
        url: 'https://fmr.fyi'
    },
    {
        name: 'Pokedle',
        img: pokedle,
        description: ['Daily Pokémon guessing game inspired by Wordle', 'A new Pokémon to identify every day'],
        stack: ['JavaScript', 'Node', 'MongoDB', 'Express.js'],
        url: 'https://pokedle.co'
    },
    {
        name: 'BlockLens',
        img: blocklens,
        description: [
            'Minecraft-inspired voxel modeling for designing unit-block structures as code',
            'Pairs a full web builder with documentation, a CLI, and MCP tools so people and agents can inspect and revise projects from any view'
        ],
        stack: ['TypeScript', 'React', 'Three.js', 'Node', 'MCP'],
        url: 'https://blocklens-khaki.vercel.app'
    },
    {
        name: 'Chrona',
        img: chrona,
        description: [
            'Free, local-first video analysis for trimming, splicing, compressing, and exporting lossless PNG frames at any frame rate',
            'Ships with shareable video and frame archives plus an agent-first npm CLI for visually verifying animation'
        ],
        stack: ['Next.js', 'TypeScript', 'WebCodecs', 'FFmpeg', 'MCP'],
        url: 'https://chrona.fyi'
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
    },
    {
        name: 'Solas',
        img: solas,
        description: [
            'Interactive generative-art experiment built from chords drawn across a circle',
            'Adjust line count, speed, color, and timing as it moves through geometric patterns'
        ],
        stack: ['React', 'TypeScript', 'Canvas', 'Vite'],
        url: 'https://anthony4834.github.io/solas/'
    }
];
