import React from 'react';
import { AddonsDetailScreen } from './AddonsDetailScreen';
import ControlsSVG from '../../../images/addon-catalog/controls.svg';
import ViewportSVG from '../../../images/addon-catalog/viewports.svg';

export default {
  title: 'Frontpage|screens/AddonsDetailScreen',
  component: AddonsDetailScreen,
};

const readMe = `<h1 id="-storybook-mobile">📱storybook-mobile</h1>
<p><a href="https://badge.fury.io/js/storybook-mobile"><img src="https://badge.fury.io/js/storybook-mobile.svg" alt="npm version"></a></p>
<p>This addon offers suggestions on how you can improve the HTML, CSS and UX of your components to be more mobile-friendly.</p>
<p><a href="https://storybook-mobile.netlify.app/?path=/story/signup-form--default" alt="screenshot of storybook-mobile addon">
<img src="https://github.com/aholachek/storybook-mobile/raw/master/screenshot.png" width="600px">
</a></p>
<p><a href="https://storybook-mobile.netlify.app/?path=/story/signup-form--default">To see all available suggestions, check out a live storybook demo here.</a></p>
<h2 id="quick-start">Quick Start</h2>
<p><code>yarn add -D storybook-mobile</code> or <code>npm install --save-dev storybook-mobile</code></p>
<p>Next, add <code>storybook-mobile</code> to your list of addons:</p>
<p><code>.storybook/main.js</code></p>
<pre><code class="lang-diff"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-comment">// other config goes here</span>
  addons: [
+    <span class="hljs-string">'storybook-mobile'</span>
  ],
}
</code></pre>
<p>This addon works best along with the <a href="https://github.com/storybookjs/storybook/tree/next/addons/viewport">@storybook/addon-viewport</a> addon, so please install that as well if you don&#39;t have it already.</p>
<h2 id="contributing">Contributing</h2>
<p>If you have any suggestions or find any bugs, please make an issue or a pr!</p>
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

const tags = [
  {
    link: '/notes',
    name: '🗒 Notes',
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
];

const supportedFrameworks = [
  {
    link: '/react',
    name: '⚛️ React',
  },
  {
    link: '/vue',
    name: ' 🔽 Vue',
  },
  {
    link: '/angular',
    name: '🔺 Angular',
  },
];

const Template = ({ addon, ...args }) => (
  <AddonsDetailScreen
    addon={{
      appearance: 'community',
      name: 'Mobile UX lint',
      description: 'Interact with component inputs dynamically in the Storybook UI',
      weeklyDownloads: 17143,
      updated: {
        date: '2020-11-05T05:00:00.000Z',
        url: 'https://npmjs.org/',
      },
      packageName: '@storybook/addon-controls',
      addonUrl: '/addons/controls',
      ...addon,
    }}
    authors={authors}
    supportedFrameworks={supportedFrameworks}
    tags={tags}
    readMe={{ content: readMe, url: 'https://github.com/' }}
    {...args}
  />
);

export const Default = Template.bind({});

export const Official = Template.bind({});
Official.args = {
  addon: {
    icon: ViewportSVG,
    name: 'Viewport',
    description:
      'The Viewport toolbar item allows you to adjust the dimensions of the iframe your story is rendered in. This makes it easy to develop responsive UIs.',
    weeklyDownloads: 428,
    appearance: 'official',
  },
};

export const Essential = Template.bind({});
Essential.args = {
  addon: {
    icon: ControlsSVG,
    name: 'Controls',
    description: 'Interact with component inputs dynamically in the Storybook UI',
    weeklyDownloads: 83474,
    status: 'essential',
    appearance: 'official',
  },
};

export const MissingInfo = Template.bind({});
MissingInfo.args = {
  addon: {
    icon: ViewportSVG,
    name: 'Viewport',
    description:
      'The Viewport toolbar item allows you to adjust the dimensions of the iframe your story is rendered in. This makes it easy to develop responsive UIs.',
    weeklyDownloads: 428,
    appearance: 'official',
  },
  supportedFrameworks: [],
  tags: [],
};
