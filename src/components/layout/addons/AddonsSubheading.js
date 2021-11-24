import { styled } from '@storybook/theming';
import { styles, Subheading } from '@storybook/design-system';

const { typography, color } = styles;

export const AddonsSubheading = styled(Subheading)`
  font-weight: ${typography.weight.extrabold};
  line-height: ${typography.size.m1}px;
  letter-spacing: 5.57px;
  color: ${color.dark};
  margin-bottom: 12px;
  display: block;
`;
