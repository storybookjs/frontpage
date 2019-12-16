import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { hoistStatics, compose, withState } from 'recompose';

import { styles, animation } from '@storybook/design-system';

import LogoToggle from './LogoToggle';
import CanvasSVG from '../../../images/use-cases/canvas.svg';

const { color } = styles;
const { shake } = animation;

const Toggle = styled(LogoToggle)`
  > *:not(:first-child) {
    animation: ${shake} 10s ease-in-out infinite 5s;
  }

  ${props =>
    props.clicked &&
    css`
      > * {
        animation: none !important;
      }
    `};
`;

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

function ComponentCanvas({ imageUrl, selectedIndex, onSelectIndex, ...props }) {
  return (
    <Wrapper {...props}>
      <CanvasWrapper>
        <CanvasBackground>
          <FigureWrapper>
            {selectedIndex === 0 && <Figure src="/images/use-cases/airbnb/react-dates.gif" />}
            {selectedIndex === 1 && <Figure src="/images/use-cases/atlassian/react-dnd.gif" />}
            {selectedIndex === 2 && <Figure src="/images/use-cases/algolia/instantsearch.gif" />}
          </FigureWrapper>
          <Canvas src={CanvasSVG} />
        </CanvasBackground>
      </CanvasWrapper>
      <Toggle
        path="/images/logos/user"
        brands={['airbnb', 'atlassian', 'algolia']}
        selectedIndex={selectedIndex}
        onSelectIndex={onSelectIndex}
        clicked={selectedIndex !== 0}
      />
    </Wrapper>
  );
}

ComponentCanvas.propTypes = {
  imageUrl: PropTypes.string,
  onSelectIndex: PropTypes.func,
  selectedIndex: PropTypes.number,
};

ComponentCanvas.defaultProps = {
  imageUrl: null,
  onSelectIndex: () => 0,
  selectedIndex: undefined,
};

export default hoistStatics(compose(withState('selectedIndex', 'onSelectIndex', 0)))(
  ComponentCanvas
);
