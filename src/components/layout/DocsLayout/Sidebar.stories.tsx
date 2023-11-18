import * as React from 'react';
import { Sidebar } from './Sidebar';

import { toc, tocV2 } from './mockDocsToc';

let level3Item = '';

const sectionWithLevel3Items = toc.find((section) =>
  section.children.some((item) => {
    if (item.type === 'menu') {
      level3Item = item.children[0].path;
      return true;
    }
    return false;
  })
);

export default {
  title: 'Layout/DocsLayout/Sidebar',
  component: Sidebar,
  args: {
    docsToc: toc,
    slug: '/docs/get-started/install',
  },
};

const Template = (args) => <Sidebar {...args} />;

export const Base = Template.bind({});

export const WithCurrentLevel3Page = Template.bind({});
WithCurrentLevel3Page.args = {
  docsToc: [sectionWithLevel3Items],
  slug: level3Item,
};

export const WithTocV2 = Template.bind({});
WithTocV2.args = {
  docsToc: tocV2,
};
