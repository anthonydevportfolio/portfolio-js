import { FC, useCallback, useEffect, useState } from 'react';
import { useLogger, useSelectorw } from '../../redux/hooks';
import { ArtifactFirst } from './designs/artifactFirst';
import { CareerNarrative } from './designs/careerNarrative';
import { ConstellationMap } from './designs/constellationMap';
import { HiringDossier } from './designs/hiringDossier';
import { ProofIndex } from './designs/proofIndex';
import { DesignPicker, PortfolioDesignId, portfolioDesigns } from './designPicker';
import './view.css';
import './designs/artifactFirst.css';
import './designs/careerNarrative.css';
import './designs/constellationMap.css';
import './designs/hiringDossier.css';
import './designs/proofIndex.css';

const designComponents: Record<PortfolioDesignId, FC> = {
    'proof-index': ProofIndex,
    'artifact-first': ArtifactFirst,
    'constellation-map': ConstellationMap,
    'hiring-dossier': HiringDossier,
    'career-narrative': CareerNarrative
};

export const View: FC = () => {
    useLogger('View');

    const isExited = useSelectorw(state => state.landing.isExited);
    const [activeDesignIndex, setActiveDesignIndex] = useState(0);
    const activeDesign = portfolioDesigns[activeDesignIndex];
    const ActiveDesign = designComponents[activeDesign.id];

    const selectDesign = useCallback((index: number) => {
        setActiveDesignIndex((index + portfolioDesigns.length) % portfolioDesigns.length);
        window.scrollTo({ behavior: 'auto', top: 0 });
    }, []);

    useEffect(() => {
        if (!isExited) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.matches('input, textarea, select') || target?.isContentEditable) return;

            if (event.key === 'ArrowLeft') selectDesign(activeDesignIndex - 1);
            if (event.key === 'ArrowRight') selectDesign(activeDesignIndex + 1);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeDesignIndex, isExited, selectDesign]);

    if (!isExited) return null;

    return (
        <main className='portfolio' data-design={activeDesign.id} id='main-content'>
            <a className='portfolio-skip-link' href='#portfolio-content'>
                Skip to content
            </a>
            <ActiveDesign />
            <DesignPicker activeIndex={activeDesignIndex} onSelect={selectDesign} />
        </main>
    );
};
