import React from 'react';
import { storiesOf } from '@storybook/react';
import PageTitle from './PageTitle';

storiesOf('Frontpage|layout/PageTitle', module).add('all', () => (
  <div>
    <PageTitle
      heading="Addons"
      title="Supercharge Storybook"
      desc="Storybook addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
      color="gold"
    />
    <PageTitle
      heading="Addons"
      title="Supercharge Storybook"
      desc="Storybook addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
      color="purple"
    />
  </div>
));
