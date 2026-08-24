import fmr from '../../assets/fmr.png';
import pokedle from '../../assets/pokedle.png';
import blocklens from '../../assets/blocklens.png';
import chrona from '../../assets/chrona.png';
import polai from '../../assets/polai.png';
import solas from '../../assets/solas.png';
import { portfolio } from '../../data/portfolio';

export interface ProjectData {
    name: string;
    img: string;
    description: string[];
    stack: string[];
    url?: string;
}

const projectImages: Record<string, string> = {
    'fmr.fyi': fmr,
    Pokedle: pokedle,
    BlockLens: blocklens,
    Chrona: chrona,
    'pol.ai': polai,
    Solas: solas
};

export const projectsData: ProjectData[] = portfolio.projects.map(project => ({
    ...project,
    img: projectImages[project.name]
}));
