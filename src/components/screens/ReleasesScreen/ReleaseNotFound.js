import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, styles } from '@storybook/design-system';

const { color, typography } = styles;

const Centered = styled.div`
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  width: 100%;
  textalign: center;
`;

const Alert = styled(Icon).attrs({ icon: 'alert' })`
  color: ${color.mediumdark};
  width: 40px;
  height: 40px;
  margin: 0 auto;
  display: block;
`;

export const Message = styled.div`
  padding-top: 12px;
  color: ${color.mediumdark};
  max-width: 295px;
  margin: 0 auto;
  font-size: ${typography.size.s1}px;
  line-height: 16px;
  text-align: center;
`;

function ReleaseNotFound({ version }) {
  return (
    <Centered>
      <Alert />
      <Message>There are no release notes yet for version {version}.</Message>
    </Centered>
  );
}

ReleaseNotFound.propTypes = {
  version: PropTypes.string.isRequired,
};

export default ReleaseNotFound;
