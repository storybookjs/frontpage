const remark = require('remark');
const remarkHTML = require('remark-html');

const markdown = require('./material-ui.md');

const processor = remark().use(remarkHTML);

const readme = processor.processSync(markdown).toString();

module.exports = {
  icon: 'https://raw.githubusercontent.com/react-theming/storybook-addon-material-ui/master/docs/logos/material-ui.png',
  displayName: 'Material UI',
  name: '@mui/material',
  description:
    "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
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
      displayName: 'Material-UI',
      icon: 'https://raw.githubusercontent.com/react-theming/storybook-addon-material-ui/master/docs/logos/material-ui.png',
      name: 'storybook-addon-material-ui',
      description: 'Storybook Addon for Material UI Library',
      weeklyDownloads: 35200,
      authors: [
        {
          id: '0',
          name: 'usulpro',
          avatarUrl: 'https://www.gravatar.com/avatar/f9b12bc1aa320b434dff7ae42be6c561',
        },
        {
          id: '1',
          name: 'smartlight',
          avatarUrl: 'https://www.gravatar.com/avatar/9ab7fcd1cc9c2d0af6c5648c4af33fc3',
        },
      ],
    },
    {
      id: '1',
      displayName: 'React Theming',
      name: '@react-theming/storybook-addon',
      description:
        'Develop themes and themable components with Emotion, Styled Components, Material-UI and your custom solution',
      weeklyDownloads: 36500,
      authors: [
        {
          id: '0',
          name: 'usulpro',
          avatarUrl: 'https://www.gravatar.com/avatar/f9b12bc1aa320b434dff7ae42be6c561',
        },
        {
          id: '1',
          name: 'smartlight',
          avatarUrl: 'https://www.gravatar.com/avatar/9ab7fcd1cc9c2d0af6c5648c4af33fc3',
        },
      ],
    },
  ],
  readme: `<h2 id="recipe-section">How to use Material UI with Storybook recipe</h2>
  ${readme}`,
};
