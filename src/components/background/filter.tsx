import styled from '@emotion/styled';
import { useSelectorw } from '../../redux/hooks';
import { useTheme } from '../../theme';

export const Filter = () => {
    const isHoveringButton = useSelectorw(state => state.landing.isHoveringButton);
    const { theme } = useTheme();
    return <FilterBase resolvedTheme={theme} shouldRender={isHoveringButton} />;
};

const FilterBase = styled('div')<{ resolvedTheme: 'dark' | 'light'; shouldRender: boolean }>(
    ({ resolvedTheme, shouldRender }) => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        background:
            resolvedTheme === 'light'
                ? 'linear-gradient(180deg, #eceef5 0%, #f6f7fb 100%)'
                : 'linear-gradient(180deg, #15171a 0%, #090b0f 100%)',
        opacity: shouldRender ? 0.82 : 0,
        zIndex: 2,
        pointerEvents: 'none',
        transition: 'opacity 0.5s'
    })
);
