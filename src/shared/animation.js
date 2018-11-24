import { css, keyframes } from 'styled-components';
import { color } from './styles';

export const easing = {
  rubber: 'cubic-bezier(0.175, 0.885, 0.335, 1.05)',
};

export const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`;

export const jiggle = keyframes`
  0%, 100% { transform:translate3d(0,0,0); }
  12.5%, 62.5% { transform:translate3d(-4px,0,0); }
  37.5%, 87.5% {  transform: translate3d(4px,0,0);  }
`;
