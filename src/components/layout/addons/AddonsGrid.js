import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles } from '@storybook/design-system';
import { AddonItem } from './AddonItem';

const { spacing, color, typography, breakpoint } = styles;

const Grid = styled.div`
  display: grid;
  grid-gap: ${spacing.padding.medium}px;
  grid-template-columns: repeat(auto-fit, 1fr);

  @media (min-width: ${breakpoint * 1}px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
`;

const Title = styled.h3`
  font-weight: ${typography.weight.black};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.m3}px;
  color: ${color.darkest};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.padding.medium}px;
`;

export const AddonsGrid = ({ title, actions, addonItems, ...props }) => (
  <section>
    <SectionHeader>
      <Title>{title}</Title>
      {actions}
    </SectionHeader>
    <Grid {...props}>
      {addonItems.map((addon) => (
        <AddonItem key={addon.id} orientation="vertical" {...addon} />
      ))}
    </Grid>
  </section>
);

AddonsGrid.propTypes = {
  addonItems: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired, ...AddonItem.propTypes })
  ),
};

AddonsGrid.defaultProps = {
  addonItems: [],
};
