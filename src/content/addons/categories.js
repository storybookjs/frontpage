const categories = {
  essentials: {
    tocTitle: '🧩  Essentials',
    name: 'Essentials',
    id: 'essentials',
    description: 'Pre-installed addons that power the core Storybook experience',
    path: '/addons/tag/essentials/',
  },
  code: {
    tocTitle: '🛠  Code',
    name: 'Code',
    id: 'code',
    path: '/addons/tag/code/',
  },
  dataState: {
    tocTitle: '⚡️  Data & state',
    name: 'Data & state',
    id: 'data-state',
    path: '/addons/tag/data-state/',
  },
  testing: {
    tocTitle: '✅  Test',
    name: 'Test',
    id: 'test',
    path: '/addons/tag/test/',
  },
  style: {
    tocTitle: '💅  Style',
    name: 'Style',
    id: 'style',
    path: '/addons/tag/style/',
  },
  design: {
    tocTitle: '🎨  Design',
    name: 'Design',
    id: 'design',
    path: '/addons/tag/design/',
  },
  appearance: {
    tocTitle: '⚙️  Appearance',
    name: 'Appearance',
    id: 'appearance',
    path: '/addons/tag/appearance/',
  },
  organize: {
    tocTitle: '🗄  Organize',
    name: 'Organize',
    id: 'organize',
    path: '/addons/tag/organize/',
  },
};

module.exports = {
  categories,
  toc: [
    {
      title: '⭐️  Popular',
      path: '/addons/',
      type: 'link',
    },
  ].concat(
    Object.values(categories).map((category) => ({
      title: category.tocTitle,
      path: category.path,
      type: 'link',
      description: category.description,
    }))
  ),
};
