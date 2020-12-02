import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { styles } from '@storybook/design-system';

const { color, typography, spacing } = styles;

const Title = styled.h2`
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.l2}px;
  font-weight: ${typography.weight.black};
  color: ${color.darkest};
`;

const Subtitle = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: ${typography.size.m1}px;
  color: ${color.darkest};
`;

const Kicker = styled.div`
  font-size: ${typography.size.s3}px;
  line-height: 1;
  font-weight: ${typography.weight.regular};
  color: ${color.dark};
  margin-left: ${spacing.padding.medium}px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const Header = styled.header`
  margin-bottom: ${spacing.padding.medium}px;
`;

export const AddonsPageHeader = ({ title, subtitle, kicker, ...props }) => (
  <Header {...props}>
    <TitleWrapper>
      <Title>{title}</Title>
      {kicker && <Kicker>{kicker}</Kicker>}
    </TitleWrapper>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </Header>
);

/* eslint-disable react/require-default-props */
AddonsPageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  kicker: PropTypes.string,
};
