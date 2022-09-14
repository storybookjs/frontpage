import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { Cardinal } from '@storybook/design-system';

export const Stat = styled(Cardinal)`
  /* margin-left: -12px; */
  padding: 0;
`;
Stat.defaultProps = {
  size: 'small',
  status: 'inverse',
};

Stat.propTypes = {
  inverse: PropTypes.bool,
};
