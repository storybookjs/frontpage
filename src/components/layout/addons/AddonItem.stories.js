import React from 'react';
import styled from 'styled-components';
import { AddonItem } from './AddonItem';
import ControlsSVG from '../../../images/addon-catalog/controls.svg';
import ViewportSVG from '../../../images/addon-catalog/viewports.svg';
import ContrastPNG from '../../../images/addon-catalog/contrast.png';

export default {
  title: 'Frontpage|layout/addons/AddonItem',
  component: AddonItem,
  chromatic: { viewports: [320, 900] },
};

const Wrapper = styled.div`
  padding: 16px;

  > h2 {
    font-size: 16px;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 16px;
  }

  > h2:last-of-type {
    margin-top: 64px;
  }
`;

const authors = [
  {
    id: '1',
    name: 'Dominic Nguyen',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/263385',
  },
  {
    id: '2',
    name: 'Tom Coleman',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/132554',
  },
  {
    id: '3',
    name: 'Zoltan Olah',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/81672',
  },
  {
    id: '4',
    name: 'Tim Hingston',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/1831709',
  },
];

const Template = (args) => (
  <Wrapper>
    <h2>Horizontal</h2>
    <AddonItem authors={authors} addonUrl="/addons/controls" {...args} />
    <h2>Vertical</h2>
    <AddonItem
      orientation="vertical"
      authors={authors}
      addonUrl="/addons/controls"
      style={{ width: 300 }}
      {...args}
    />
  </Wrapper>
);

export const OfficialStorybook = Template.bind({});
OfficialStorybook.args = {
  appearance: 'official',
  image: ControlsSVG,
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  downloads: 17143,
};

export const OfficialIntegrator = Template.bind({});
OfficialIntegrator.args = {
  appearance: 'integrator',
  image: ContrastPNG,
  title: 'Contrast',
  description: 'Embed Contrast handoff tool in a storybook panel',
  downloads: 17143,
  verifiedCreator: 'Contrast',
};

export const Community = Template.bind({});
Community.args = {
  image: ViewportSVG,
  appearance: 'community',
  title: 'Mobile UX Hints',
  description:
    'Suggestions on how to tweak the HTML and CSS of your components to be more mobile-friendly.',
  downloads: 12253,
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  downloads: 238,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

const StatsWrapper = styled.div`
  > * {
    margin-bottom: 16px;
  }
`;

export const StatVariations = (args) => (
  <StatsWrapper>
    <AddonItem {...args} downloads={104} />
    <AddonItem {...args} downloads={726} />
    <AddonItem {...args} downloads={5026} />
    <AddonItem {...args} downloads={17143} />
    <AddonItem {...args} downloads={171043} />
    <AddonItem {...args} downloads={3871043} />
  </StatsWrapper>
);
StatVariations.args = {
  orientation: 'horizontal',
  appearance: 'official',
  image: ControlsSVG,
  title: 'Controls',
  description: 'Interact with component inputs dynamically in the Storybook UI',
  authors,
  addonUrl: '/addons/controls',
};
