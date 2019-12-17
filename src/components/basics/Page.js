import styled from 'styled-components';

import { styles } from '@storybook/design-system';

const { pageMargins, spacing } = styles;

const DefaultMargin = styled.div`
  ${pageMargins};
`;
const SmallMargins = styled.div`
  padding: 0 ${spacing.padding.medium}px;
  max-width: 800px;
  margin: 0 auto;
`;

export const PageMargin = ({ size = 'default', children }) => {
  switch (size) {
    case 'small': {
      return <SmallMargins>{children}</SmallMargins>;
    }
    case 'default':
    default: {
      return <DefaultMargin>{children}</DefaultMargin>;
    }
  }
};
