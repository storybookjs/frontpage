import React from 'react';
import { AddonsTagScreen } from './AddonsTagScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';

export default {
  title: 'Frontpage|screens/AddonsTagScreen',
  component: AddonsTagScreen,
};

export const Default = () => (
  <AddonsTagScreen
    pageContext={{
      tag: {
        name: 'notes',
        displayName: 'Notes',
        icon: '🗒️',
        addons: addonItemsData,
      },
    }}
  />
);
