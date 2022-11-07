import React from 'react';
import PageTitleComponent from './PageTitle';

export default {
  title: 'Layout/PageTitle',
  component: PageTitleComponent,
};

export const PageTitle = () => (
  <div>
    <PageTitleComponent
      heading="Addons"
      title="Supercharge Storybook"
      desc="Storybook addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
      color="gold"
    />
    <PageTitleComponent
      heading="Addons"
      title="Supercharge Storybook"
      desc="Storybook addons enable advanced functionality and unlock new workflows. Contributed by core maintainers and the amazing developer community."
      color="purple"
    />
  </div>
);
