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
    backgroundColor: `rgba(20, 0, 20, ${shouldRender ? 0.8 : 0})`,
    zIndex: 2,
    transition: 'background-color 0.5s'
}));
