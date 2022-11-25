import React from 'react';
import { AddonsLearn as AddonsLearnComponent } from './AddonsLearn';

export default {
  title: 'Integrations Catalog/Layout/Addons/AddonsLearn',
  component: AddonsLearnComponent,
};

const Template = (args) => <AddonsLearnComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
