import { keyframes } from '@emotion/css';
import styled from '@emotion/styled';
import { FC, useState } from 'react';

export interface FancyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export const FancyButton: FC<FancyButtonProps> = ({ children, ...rest }) => {
    const [active, setActive] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // Temporarily disable and enable the active state to restart animation
        setActive(false);
        setTimeout(() => setActive(true), 0);

        if (rest.onClick) rest.onClick(e);
    };

    return (
        <FancyButtonBase {...rest} onClick={handleClick} active={active}>
            <FancyButtonPulse active={active} />
            <FancyButtonPulse active={active} />
            <Rectangle active={active} direction='left' />
            <Rectangle active={active} direction='right' />
            {children}
        </FancyButtonBase>
    );
};

const pulseAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05, 1.3);
  },
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1, 1.4);
  }
`;

const backgroundAnimation = keyframes`
  0% {
    border-color: transparent;
    background: rgba(255, 255, 255, 1);
  }
  100% {
    border-color: white;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    `;

const FancyButtonBase = styled('button')<{ active: boolean }>(({ active }) => ({
    overflow: 'visible',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.3)',
    border: '1px solid',
    borderColor: 'white',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
    opacity: 0,
    animation: `${active ? backgroundAnimation : null} 2s forwards, ${fadeIn} 1s cubic-bezier(.15,.63,0,.99) forwards .75s`,
    transition: 'all 0.3s ease',

    '&:hover': {
        background: 'rgba(255, 255, 255, 0.4)'
    }
}));

const FancyButtonPulse = styled('div')<{ active: boolean }>(({ active }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '2px solid white',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    animation: `${active ? pulseAnimation : null} 1s ease-out forwards`,
    opacity: 0,
    zIndex: 1
}));

const growLeft = keyframes`
  0% {
      opacity: 1;
    width: 0;
    left: 50%;
  }
  50% {
    opacity: 1;
    width: 50%;
    left: 0;
  }
  100% {
      opacity: 0;
    width: 0;
    left: 0;
  }
`;

const growRight = keyframes`
  0% {
    opacity: 1;
    width: 0;
    right: 50%;
  }
  50% {
      opacity: 1;
    width: 50%;
    right: 0;
  }
  100% {
    opacity: 0;
    width: 0;
    right: 0;
  }
`;

const Rectangle = styled.div<{ direction: 'left' | 'right'; active: boolean }>`
    opacity: 0;
    position: absolute;
    height: 3.05rem;
    background-color: white;
    z-index: 2;
    transform: translateY(-31.7%);
    pointer-events: none;
    animation: ${({ active, direction }) =>
        active
            ? direction === 'left'
                ? `${growLeft} 0.75s cubic-bezier(.15,.63,0,.99) forwards 100ms`
                : `${growRight} 0.75s cubic-bezier(.15,.63,0,.99) forwards 100ms`
            : 'none'};
`;
