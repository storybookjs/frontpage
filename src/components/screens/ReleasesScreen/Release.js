import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Highlight, styles } from '@storybook/design-system';

import { releaseForamtting } from '../../../styles/formatting';

const { color, typography } = styles;

const Wrapper = styled.div`
  ${releaseForamtting}
`;

const Title = styled.div`
  color: ${color.darkest};
  font-size: ${typography.size.l1}px;
  font-weight: ${typography.weight.black};
  letter-spacing: -0.33px;
  line-height: 40px;
  margin-bottom: 9px;
`;

function Release({ title, html }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Highlight>{html}</Highlight>
    </Wrapper>
  );
}

Release.propTypes = {
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Release;
