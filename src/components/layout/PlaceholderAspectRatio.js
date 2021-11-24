import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
`;

export default function PlaceholderAspectRatio({ ratio, ...props }) {
  // This is an empty div that is a placeholder for lazyloaded content
  // It is for fluid layouts
  // It prevents incoming content from reflowing due to height adjustments
  // The ratio prop is width/height

  return <Wrapper style={{ paddingBottom: `calc(100% * ${ratio})` }} {...props} />;
}

PlaceholderAspectRatio.propTypes = {
  ratio: PropTypes.number.isRequired,
};
