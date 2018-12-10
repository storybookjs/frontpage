import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import LazyLoad from './LazyLoad';

import { ProgressDots, styles, animation } from './basics';

const { color, typography, paper } = styles;
const { glow, inlineGlow } = animation;

const Figure = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  object-fit: contain;
`;

const ImageOuter = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;
`;

const FigureWrapper = styled.span`
  ${paper};
  box-shadow: rgba(0, 0, 0, 0.05) 0 1px 3px 0, rgba(0, 0, 0, 0.05) 0 0 0 1px inset;
  border-radius: 4px;
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  display: block;
  overflow: hidden;
`;

const Item = styled.div`
  font-size: ${typography.size.s2}px;
  position: relative;
  text-align: center;
  width: 200px;
  text-decoration: none;
  display: block;
  color: ${color.darkest};

  ${props =>
    !props.loading &&
    css`
      ${FigureWrapper} {
        transform: translate3d(0, 0, 0);
        transition: all 150ms ease-out;
      }

      &:hover {
        ${FigureWrapper} {
          transform: translate3d(0, -3px, 0);
          box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
        }
      }
      &:active {
        ${FigureWrapper} {
          transform: translate3d(0, 0, 0);
        }
      }
    `} ${props =>
    props.loading &&
    css`
      ${FigureWrapper} {
        animation: ${glow} 1.5s ease-in-out infinite;
        background: ${color.mediumlight};
        box-shadow: none;
      }
    `};
`;

export default function ComponentItem({ loading, imageUrl, ...props }) {
  return (
    <Item loading={loading} {...props}>
      <FigureWrapper>
        <ImageOuter>
          {!loading && (
            <LazyLoad once placeholder={<ProgressDots loading />}>
              <Figure src={imageUrl} alt="component" />
            </LazyLoad>
          )}
        </ImageOuter>
      </FigureWrapper>
    </Item>
  );
}

ComponentItem.propTypes = {
  loading: PropTypes.bool,
  imageUrl: PropTypes.string,
};

ComponentItem.defaultProps = {
  loading: false,
  imageUrl: null,
};
