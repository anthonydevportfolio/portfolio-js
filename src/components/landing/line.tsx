import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import React, { FC } from 'react';

interface LineProps {
    y: string | number;
    styles?: React.CSSProperties;
    direction?: 'left' | 'right';
}

const growX = keyframes({
    from: {
        transform: 'scaleX(0)'
    },
    to: {
        transform: 'scaleX(1)'
    }
});

const LineBase = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '5px',
    background
    transformOrigin: 'left',
    transform: 'scaleX(0)',
    zIndex: 2
});

export const Line: FC<LineProps> = ({ y, styles = {}, direction = 'left' }) => {
    return (
        <LineBase
            style={{
                top: y,
                left: direction === 'left' ? '0px' : 'auto', // Set `left` to '0px' if direction is 'left'
                right: direction === 'right' ? '0px' : 'auto', // Set `right` to '0px' if direction is 'right'
                transformOrigin: direction === 'right' ? 'right' : 'left', // Set transform origin based on direction
                animation: `${growX} 1.5s cubic-bezier(0.7, 0, 0.4, 1) forwards`, // Adjusted cubic-bezier for more velocity and sharp stop
                ...styles
            }}
        />
    );
};
