import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { LazyLoad, ProgressDots, styles, animation } from '../../basics';
import LogoToggle from './LogoToggle';

const { color, typography, paper } = styles;
const { glow, inlineGlow } = animation;

const Figure = styled.img`
  object-fit: contain;
  width: 100%;
`;

const Canvas = styled.img`
  display: block;
  width: 100%;
`;

const FigureWrapper = styled.div`
  top: 10.5%;
  position: absolute;
  left: 1px;
  right: 1px;
  bottom: 1px;
  display: flex;
  padding: 2%;
`;

const CanvasBackground = styled.div`
  display: inline-block;
  background: ${color.lightest};
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 35px;
  border-radius: 4px;
  position: relative;
`;

const CanvasWrapper = styled.div`
  display: block;
  margin-bottom: 1.5rem;
`;

const Wrapper = styled.div`
  width: 100%;
`;

export default function ComponentCanvas({ imageUrl, onSelectIndex, selectedIndex, ...props }) {
  return (
    <Wrapper {...props}>
      <CanvasWrapper>
        <CanvasBackground>
          <FigureWrapper>
            <Figure src="images/use-cases/airbnb/react-dates.gif" />
          </FigureWrapper>
          <Canvas src="images/use-cases/canvas.svg" />
        </CanvasBackground>
      </CanvasWrapper>
      <LogoToggle
        path="images/logos/user"
        brands={['airbnb', 'atlassian', 'algolia']}
        selectedIndex={0}
        onSelectIndex={onSelectIndex}
      />
    </Wrapper>
  );
}

ComponentCanvas.propTypes = {
  imageUrl: PropTypes.string,
  onSelectIndex: LogoToggle.propTypes.onSelectIndex,
  selectedIndex: LogoToggle.propTypes.selectedIndex,
};

ComponentCanvas.defaultProps = {
  imageUrl: null,
};
