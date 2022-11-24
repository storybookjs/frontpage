import React from 'react';
import { styled } from '@storybook/theming';
import PropTypes from 'prop-types';
import { styles } from '@storybook/design-system';

const { color, typography, spacing } = styles;

const Title = styled.h2`
  font-size: ${typography.size.l1}px;
  line-height: ${typography.size.l2}px;
  font-weight: ${typography.weight.bold};
  color: ${color.darkest};
`;

const Subtitle = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 28px;
  color: ${color.darkest};
  margin-top: 0.75rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const Header = styled.header`
  margin-bottom: 30px;
`;

export const AddonsPageHeader = ({ title, subtitle, ...props }) => (
  <Header {...props}>
    <TitleWrapper>
      <Title>{title}</Title>
    </TitleWrapper>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </Header>
);

/* eslint-disable react/require-default-props */
AddonsPageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
