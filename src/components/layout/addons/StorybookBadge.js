import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';
import { styles, Icon, TooltipMessage, WithTooltip } from '@storybook/design-system';

const { typography, color } = styles;

const StorybookLogo = () => (
  <svg width="14" height="14" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.9698 117.948L13.0046 12.2937C12.8737 8.80437 15.5492 5.8472 19.0342 5.62939L108.9 0.012751C112.448 -0.208956 115.503 2.48698 115.725 6.03429C115.733 6.16794 115.737 6.30181 115.737 6.43572V121.564C115.737 125.119 112.856 128 109.302 128C109.205 128 109.109 127.998 109.013 127.994L23.112 124.135C19.7665 123.985 17.0954 121.294 16.9698 117.948Z"
      fill="#FF4785"
    />
    <path
      d="M73.0803 49.4849C73.0803 51.9887 89.9455 50.7887 92.2095 49.0299C92.2095 31.9797 83.0608 23.0201 66.3079 23.0201C49.555 23.0201 40.1687 32.1191 40.1687 45.7677C40.1687 69.5388 72.2486 69.9938 72.2486 82.9599C72.2486 86.5995 70.4664 88.7605 66.5455 88.7605C61.4365 88.7605 59.4167 86.1513 59.6543 77.2797C59.6543 75.3552 40.1687 74.7552 39.5746 77.2797C38.0618 98.7786 51.4561 104.98 66.7832 104.98C81.635 104.98 93.2789 97.0634 93.2789 82.7324C93.2789 57.2552 60.7236 57.9376 60.7236 45.3127C60.7236 40.1945 64.5257 39.5121 66.7832 39.5121C69.1595 39.5121 73.4368 39.9309 73.0803 49.4849ZM89.4668 1.22728L101.835 0.454285L102.351 15.2251C102.369 15.755 101.955 16.1995 101.425 16.218C101.198 16.2259 100.975 16.1532 100.797 16.0127L96.0379 12.2636L90.4031 16.5379C89.9807 16.8583 89.3785 16.7756 89.058 16.3532C88.9232 16.1754 88.8545 15.9562 88.8637 15.7332L89.4668 1.22728Z"
      fill="white"
    />
  </svg>
);

const Label = styled.div`
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.m1}px;
  font-weight: ${typography.weight.extrabold};
  letter-spacing: -0.42px;
  color: ${color.lightest};
  margin-left: 6px;
`;

const Wrapper = styled.div`
  background-color: ${color.ultraviolet};
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  display: inline-flex;
  align-items: center;
  padding: 0 6px;
`;

export const StorybookBadge = (props) => (
  <Wrapper {...props}>
    <StorybookLogo />
    <Label>Made by Storybook</Label>
  </Wrapper>
);
