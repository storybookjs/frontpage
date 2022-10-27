import { styled } from '@storybook/theming';
import { styles, Subheading } from '@storybook/design-system';

const { typography, color, spacing } = styles;

export const ListHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.padding.medium}px;
`;

export const ListHeading = styled.h3`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.m2}px;
  line-height: ${typography.size.m3}px;
  color: ${color.darkest};
`;

export const ListSubheading = styled(Subheading)`
  font-weight: ${typography.weight.bold};
  line-height: ${typography.size.m1}px;
  letter-spacing: 5.57px;
  color: ${color.dark};
  margin-bottom: 12px;
  display: block;
`;
