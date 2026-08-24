import styled from '@emotion/styled';
import { useSelectorw } from '../../redux/hooks';

export const Filter = () => {
    const isHoveringButton = useSelectorw(state => state.landing.isHoveringButton);
    return <FilterBase shouldRender={isHoveringButton} />;
};

const FilterBase = styled('div')<{ shouldRender: boolean }>(({ shouldRender }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #15171a 0%, #000000 100%)',
    opacity: shouldRender ? 0.82 : 0,
    zIndex: 2,
    pointerEvents: 'none',
    transition: 'opacity 0.5s'
}));
