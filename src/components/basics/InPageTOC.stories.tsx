import * as React from 'react';

import { InPageTOC } from './InPageTOC';

const mockTOCItems = [
  {
    title: 'Level 2',
    url: '#level-2',
    items: [
      {
        title: 'Level 3',
        url: '#level-3',
      },
      {
        title: 'Level 3',
        url: '#level-3',
      },
    ],
  },
  {
    title: 'Level 2',
    url: '#level-2',
    items: [
      {
        title: 'Level 3',
        url: '#level-3',
        items: [
          {
            title: 'Level 4',
            url: '#level-4',
          },
          {
            title: 'Level 4',
            url: '#level-4',
          },
        ],
      },
      {
        title: 'Level 3',
        url: '#level-3',
      },
    ],
  },
  {
    title: 'Level 2',
    url: '#level-2',
  },
  {
    title: 'Level 2',
    url: '#level-2',
  },
];

const meta = {
  title: 'Basics/InPageTOC',
  component: InPageTOC,
  args: {
    items: mockTOCItems,
  },
  parameters: {
    layout: 'padded',
  },
};
export default meta;

const Template = (args) => <InPageTOC {...args} />;

export const Basic = Template.bind({});
