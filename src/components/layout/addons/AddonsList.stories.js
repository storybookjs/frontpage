import React from 'react';
import { AddonsList } from './AddonsList';
import { addonItemsData } from './AddonsGrid.stories';

export default {
  title: 'Frontpage|layout/addons/AddonsList',
  component: AddonsList,
  excludeStories: /.*Data$/,
};

const Template = (args) => <AddonsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  addonItems: addonItemsData.slice(0, 5),
};

export const LoadMore = Template.bind({});
LoadMore.args = {
  addonItems: addonItemsData,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
