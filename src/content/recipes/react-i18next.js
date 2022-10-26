const remark = require('remark');
const remarkHTML = require('remark-html');

const markdown = require('./react-i18next.md');

const processor = remark().use(remarkHTML);

const readme = processor.processSync(markdown).toString();

module.exports = {
  icon: '',
  displayName: 'React i18next',
  name: 'react-i18next',
  description: 'Internationalization support for Storybook with toolbar locale toggle',
  authors: [
    {
      id: '0',
      name: 'Shaun Lloyd',
      avatarUrl: 'https://avatars.githubusercontent.com/u/18172605',
    },
  ],
  addons: [
    {
      id: '0',
      displayName: 'Storybook i18next Addon',
      icon: 'https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png',
      name: 'storybook-i18next',
      description: 'Add i18next support to Storybook',
      weeklyDownloads: 2200,
      authors: [
        {
          id: '0',
          name: 'stevensacks',
          avatarUrl: '//www.gravatar.com/avatar/197db09f30ae36cc201006eb1deeb4b5',
        },
      ],
    },
    {
      id: '1',
      displayName: 'Storybook react-i18next addon',
      icon: 'https://user-images.githubusercontent.com/321738/63501763-88dbf600-c4cc-11e9-96cd-94adadc2fd72.png',
      name: 'storybook-react-i18next',
      description: 'Add react-i18next support to Storybook',
      weeklyDownloads: 70700,
      authors: [
        {
          id: '0',
          name: 'stevensacks',
          avatarUrl: '//www.gravatar.com/avatar/197db09f30ae36cc201006eb1deeb4b5',
        },
      ],
    },
  ],
  readme,
};
