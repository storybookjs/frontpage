import React from 'react';
import { AddonsTagScreen } from './AddonsTagScreen';
import { addonItemsData } from '../../layout/addons/AddonsGrid.stories';

export default {
  title: 'Frontpage|screens/AddonsTagScreen',
  component: AddonsTagScreen,
};

const relatedTags = [
  {
    link: '/notes',
    name: '🗒 Notes',
  },
  {
    link: '/storybook',
    name: '📕 Storybook',
  },
  {
    link: '/qa',
    name: '🕵️‍♀️ QA',
  },
  {
    link: '/prototype',
    name: '✨ Prototype',
  },
  {
    link: '/testing',
    name: '✅ Testing',
  },
  {
    link: '/deploy',
    name: '☁️ Deploy',
  },
];

export const Default = () => (
  <AddonsTagScreen tag="Notes" addons={addonItemsData} relatedTags={relatedTags} />
);
