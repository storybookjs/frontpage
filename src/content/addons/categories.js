const categories = {
  essentials: {
    tocTitle: '🧩  Essentials',
    name: 'Essentials',
    id: 'essentials',
    description: 'Pre-installed addons that power the core Storybook experience',
    path: '/addons/essentials',
  },
  code: {
    tocTitle: '🛠  Code',
    name: 'Code',
    id: 'code',
    path: '/addons/code',
  },
  dataState: {
    tocTitle: '⚡️  Data & state',
    name: 'Data & state',
    id: 'data-state',
    path: '/addons/data-state',
  },
  testing: {
    tocTitle: '✅  Test',
    name: 'Test',
    id: 'test',
    path: '/addons/test',
  },
  style: {
    tocTitle: '💅  Style',
    name: 'Style',
    id: 'style',
    path: '/addons/style',
  },
  design: {
    tocTitle: '🎨  Design',
    name: 'Design',
    id: 'design',
    path: '/addons/design',
  },
  appearance: {
    tocTitle: '⚙️  Appearance',
    name: 'Appearance',
    id: 'appearance',
    path: '/addons/appearance',
  },
  organize: {
    tocTitle: '🗄  Organize',
    name: 'Organize',
    id: 'organize',
    path: '/addons/organize',
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
