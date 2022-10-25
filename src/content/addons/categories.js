const categories = {
  essentials: {
    tocTitle: '🧩  Essentials',
    name: 'Essentials',
    id: 'essentials',
    description: 'Pre-installed addons that power the core Storybook experience',
    path: '/integrations/tag/essentials/',
  },
  code: {
    tocTitle: '🛠  Code',
    name: 'Code',
    id: 'code',
    path: '/integrations/tag/code/',
  },
  dataState: {
    tocTitle: '⚡️  Data & state',
    name: 'Data & state',
    id: 'data-state',
    path: '/integrations/tag/data-state/',
  },
  testing: {
    tocTitle: '✅  Test',
    name: 'Test',
    id: 'test',
    path: '/integrations/tag/test/',
  },
  style: {
    tocTitle: '💅  Style',
    name: 'Style',
    id: 'style',
    path: '/integrations/tag/style/',
  },
  design: {
    tocTitle: '🎨  Design',
    name: 'Design',
    id: 'design',
    path: '/integrations/tag/design/',
  },
  appearance: {
    tocTitle: '⚙️  Appearance',
    name: 'Appearance',
    id: 'appearance',
    path: '/integrations/tag/appearance/',
  },
  organize: {
    tocTitle: '🗄  Organize',
    name: 'Organize',
    id: 'organize',
    path: '/integrations/tag/organize/',
  },
};

module.exports = {
  categories,
  toc: [
    {
      title: '⭐️  Popular',
      path: '/integrations/',
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
