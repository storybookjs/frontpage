import * as React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { SubPageTabs } from './SubPageTabs';

type SubPageTabsProps = React.ComponentProps<typeof SubPageTabs>;

const meta: Meta<SubPageTabsProps> = {
  title: 'Screens/DocsScreen/SubPageTabs',
  component: SubPageTabs,
  args: {
    tabs: ['guide', 'api'],
    activeTab: 'guide',
  },
};
export default meta;

const Template: Story<SubPageTabsProps> = (args) => <SubPageTabs {...args} />;

export const Default = Template.bind({});

export const OtherTabSelected = Template.bind({});
OtherTabSelected.args = {
  activeTab: 'api',
};

export const Consistent = Template.bind({});
Consistent.storyName = 'Consistent order and ignore unsupported ids';
Consistent.args = {
  tabs: ['guide', 'api', 'foo'],
};