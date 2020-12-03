import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles, Icon, TooltipMessage, WithTooltip } from '@storybook/design-system';

const { spacing, color } = styles;

const VerifiedBadgeIcon = styled(Icon).attrs({ icon: 'verified', block: true })`
  color: ${(props) => (props.appearance === 'official' ? color.secondary : color.green)};
  width: 14px;
  height: 14px;
  margin-bottom: 2px;
  z-index: 2;
  position: relative;
`;
VerifiedBadgeIcon.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrator']).isRequired,
};

const BadgeWrapper = styled(WithTooltip)`
  margin-left: ${spacing.padding.small}px;
`;

export const VerifiedBadge = ({ trigger, creator, appearance }) => (
  <BadgeWrapper
    placement="top"
    trigger={trigger}
    tooltip={
      <TooltipMessage
        desc={
          appearance === 'official'
            ? 'This addon is maintained and recommended by the Storybook team.'
            : `This addon is maintained by ${creator}.`
        }
      />
    }
  >
    <VerifiedBadgeIcon appearance={appearance} />
  </BadgeWrapper>
);

VerifiedBadge.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrator']).isRequired,
  trigger: PropTypes.oneOf(['hover', 'click']),
  creator: PropTypes.string.isRequired,
};

VerifiedBadge.defaultProps = {
  trigger: 'hover',
};
