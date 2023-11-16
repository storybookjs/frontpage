import * as React from 'react';

import { userEvent, within } from '@storybook/testing-library';
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

export const Collapsed = Template.bind({});
Collapsed.args = {
  collapsed: true,
};

export const Open = Template.bind({});
Open.args = Collapsed.args;
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const summary = canvas.getByText('On this page');

  await userEvent.click(summary);
};
