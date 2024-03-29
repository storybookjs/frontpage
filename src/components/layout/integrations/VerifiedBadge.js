import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles, Icon, TooltipMessage, WithTooltip } from '@storybook/design-system';

const { color } = styles;

const VerifiedBadgeIcon = styled(Icon)`
  color: ${(props) => (props.appearance === 'official' ? color.secondary : color.green)};
  width: 14px;
  height: 14px;
  margin-bottom: 0.25em;
  z-index: 2;
  position: relative;
`;
VerifiedBadgeIcon.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrators']).isRequired,
};

const BadgeWrapper = styled(WithTooltip)`
  && {
    margin-left: 6px;
  }
`;

export const VerifiedBadge = ({ trigger, creator, appearance }) => (
  <BadgeWrapper
    placement="top"
    trigger={trigger}
    tooltip={
      <TooltipMessage
        desc={
          appearance === 'official'
            ? 'This integration is maintained and recommended by the Storybook team.'
            : `This integration is maintained by ${creator}.`
        }
      />
    }
  >
    <VerifiedBadgeIcon icon="verified" block appearance={appearance} />
  </BadgeWrapper>
);

VerifiedBadge.propTypes = {
  appearance: PropTypes.oneOf(['official', 'integrators']).isRequired,
  trigger: PropTypes.oneOf(['hover', 'click']),
  creator: PropTypes.string,
};

VerifiedBadge.defaultProps = {
  trigger: 'hover',
  creator: '',
};
