module.exports = {
  toc: [
    {
      title: '🚀 Get Started',
      pathSegment: 'get-started',
      type: 'menu',
      children: [
        {
          pathSegment: 'introduction',
          title: 'Introduction',
          type: 'bullet-link',
        },
        {
          pathSegment: 'install',
          title: 'Install',
          type: 'bullet-link',
          description: 'Install the Storybook package in your project',
        },
        {
          pathSegment: 'whats-a-story',
          title: "What's a story?",
          type: 'bullet-link',
          description: 'Learn how to save component examples as stories',
        },
        {
          pathSegment: 'browse-stories',
          title: 'Browse stories',
          type: 'bullet-link',
          description: 'Learn how to explore your stories within Storybook',
        },
        {
          pathSegment: 'setup',
          title: 'Setup',
          type: 'bullet-link',
          description:
            'Write your first story & adjust Storybook configuration for your environment',
        },
        {
          pathSegment: 'conclusion',
          title: 'Conclusion',
          type: 'bullet-link',
          description: 'Take your Storybook skills to the next level',
        },
      ],
    },
    {
      title: '🖋 Writing Stories',
      pathSegment: 'writing-stories',
      type: 'menu',
      children: [
        {
          pathSegment: 'introduction',
          title: 'Introduction',
          type: 'link',
        },
        {
          pathSegment: 'args',
          title: 'Args',
          type: 'link',
        },
        {
          pathSegment: 'parameters',
          title: 'Parameters',
          type: 'link',
        },
        {
          pathSegment: 'decorators',
          title: 'Decorators',
          type: 'link',
        },
        {
          pathSegment: 'loaders',
          title: 'Loaders',
          type: 'link',
        },
        {
          pathSegment: 'naming-components-and-hierarchy',
          title: 'Naming components and hierarchy',
          type: 'link',
        },
      ],
    },
    {
      title: '📖 Writing Docs',
      pathSegment: 'writing-docs',
      type: 'menu',
      children: [
        {
          pathSegment: 'introduction',
          title: 'Introduction',
          type: 'link',
        },
        {
          pathSegment: 'docs-page',
          title: 'DocsPage',
          type: 'link',
        },
        {
          pathSegment: 'mdx',
          title: 'MDX',
          type: 'link',
        },
        {
          pathSegment: 'doc-blocks',
          title: 'Doc Blocks',
          type: 'link',
        },
        {
          pathSegment: 'build-documentation',
          title: 'Preview and build docs',
          type: 'link',
        },
      ],
    },
    {
      title: '🧩 Essential addons',
      pathSegment: 'essentials',
      type: 'menu',
      children: [
        {
          pathSegment: 'introduction',
          title: 'Introduction',
          type: 'link',
        },
        {
          pathSegment: 'controls',
          title: 'Controls',
          type: 'link',
        },
        {
          pathSegment: 'actions',
          title: 'Actions',
          type: 'link',
        },
        {
          pathSegment: 'viewport',
          title: 'Viewport',
          type: 'link',
        },
        {
          pathSegment: 'backgrounds',
          title: 'Backgrounds',
          type: 'link',
        },
        {
          pathSegment: 'toolbars-and-globals',
          title: 'Toolbars & globals',
          type: 'link',
        },
        {
          pathSegment: 'measure-and-outline',
          title: 'Measure & Outline',
          type: 'link',
        },
      ],
    },
    {
      title: '⚙️ Configure',
      pathSegment: 'configure',
      type: 'menu',
      children: [
        {
          pathSegment: 'overview',
          title: 'Overview',
          type: 'link',
        },
        {
          pathSegment: '',
          title: 'Integration',
          type: 'menu',
          children: [
            {
              pathSegment: 'webpack',
              title: 'Webpack',
              type: 'link',
            },
            {
              pathSegment: 'babel',
              title: 'Babel',
              type: 'link',
            },
            {
              pathSegment: 'typescript',
              title: 'TypeScript',
              type: 'link',
            },
            {
              pathSegment: 'styling-and-css',
              title: 'Styling and CSS',
              type: 'link',
            },
            {
              pathSegment: 'images-and-assets',
              title: 'Images and assets',
              type: 'link',
            },
          ],
        },
        {
          pathSegment: 'story-rendering',
          title: 'Story rendering',
          type: 'link',
        },
        {
          pathSegment: 'story-layout',
          title: 'Story Layout',
          type: 'link',
        },
        {
          pathSegment: '',
          title: 'User interface',
          type: 'menu',
          children: [
            {
              pathSegment: 'features-and-behavior',
              title: 'Features and behavior',
              type: 'link',
            },
            {
              pathSegment: 'theming',
              title: 'Theming',
              type: 'link',
            },
            {
              pathSegment: 'sidebar-and-urls',
              title: 'Sidebar & URLS',
              type: 'link',
            },
            {
              pathSegment: 'storybook-addons',
              title: 'Storybook Addons',
              type: 'link',
            },
          ],
        },
        {
          pathSegment: 'environment-variables',
          title: 'Environment variables',
          type: 'link',
        },
      ],
    },
    {
      title: '🔄 Workflows',
      pathSegment: 'workflows',
      type: 'menu',
      children: [
        {
          pathSegment: 'publish-storybook',
          title: 'Publish Storybook',
          type: 'link',
        },
        {
          pathSegment: 'build-pages-with-storybook',
          title: 'Building pages and screens',
          type: 'link',
        },
        {
          pathSegment: 'stories-for-multiple-components',
          title: 'Stories for multiple components',
          type: 'link',
        },
        {
          title: 'Testing with Storybook',
          // Despite having a child menu, this does not currently affect the path
          pathSegment: '',
          type: 'menu',
          children: [
            {
              pathSegment: 'testing-with-storybook',
              title: 'Introduction',
              type: 'link',
            },
            {
              pathSegment: 'unit-testing',
              title: 'Unit testing',
              type: 'link',
            },
            {
              pathSegment: 'visual-testing',
              title: 'Visual testing',
              type: 'link',
            },
            {
              pathSegment: 'interaction-testing',
              title: 'Interaction testing',
              type: 'link',
            },
            {
              pathSegment: 'snapshot-testing',
              title: 'Snapshot testing',
              type: 'link',
            },
          ],
        },
        {
          pathSegment: 'storybook-composition',
          title: 'Composition',
          type: 'link',
        },
        {
          pathSegment: 'package-composition',
          title: 'Package Composition',
          type: 'link',
        },
        {
          pathSegment: 'faq',
          title: 'Frequently Asked Questions',
          type: 'link',
        },
      ],
    },
    {
      title: '🔧 Addons',
      pathSegment: 'addons',
      type: 'menu',
      children: [
        {
          pathSegment: 'introduction',
          title: 'Introduction',
          type: 'link',
        },
        {
          pathSegment: 'install-addons',
          title: 'Install',
          type: 'link',
        },
        {
          pathSegment: 'writing-addons',
          title: 'Write',
          type: 'link',
        },
        {
          pathSegment: 'configure-addons',
          title: 'Configure addons',
          type: 'link',
        },
        {
          pathSegment: 'writing-presets',
          title: 'Write a preset',
          type: 'link',
        },
        {
          pathSegment: 'addon-catalog',
          title: 'Add to catalog',
          type: 'link',
        },
        {
          pathSegment: 'addon-types',
          title: 'Types of addons',
          type: 'link',
        },
        {
          pathSegment: 'addon-knowledge-base',
          title: 'Knowledge base',
          type: 'link',
        },
        {
          pathSegment: 'addons-api',
          title: 'Addon API',
          type: 'link',
        },
      ],
    },
    {
      title: '🔌 API',
      pathSegment: 'api',
      type: 'menu',
      children: [
        {
          title: 'Stories',
          pathSegment: '',
          type: 'menu',
          children: [
            {
              pathSegment: 'csf',
              title: 'Component Story Format',
              type: 'link',
            },
            {
              pathSegment: 'mdx',
              title: 'MDX syntax',
              type: 'link',
            },
            {
              pathSegment: 'argtypes',
              title: 'ArgTypes',
              type: 'link',
            },
          ],
        },
        {
          pathSegment: 'new-frameworks',
          title: 'Frameworks',
          type: 'link',
        },
        {
          pathSegment: 'cli-options',
          title: 'CLI options',
          type: 'link',
        },
        {
          pathSegment: 'frameworks-feature-support',
          title: 'Feature support for frameworks',
          type: 'link',
        },
      ],
    },
    {
      title: '🛠 Contribute',
      pathSegment: 'contribute',
      type: 'menu',
      children: [
        {
          pathSegment: 'how-to-contribute',
          title: 'How to',
          type: 'link',
        },
        {
          pathSegment: 'code',
          title: 'Code',
          type: 'link',
        },
        {
          pathSegment: '',
          title: 'Documentation',
          type: 'menu',
          children: [
            {
              pathSegment: 'documentation-updates',
              title: 'Content',
              type: 'link',
            },
            {
              pathSegment: 'new-snippets',
              title: 'Code snippets',
              type: 'link',
            },
          ],
        },
        {
          pathSegment: 'how-to-reproduce',
          title: 'Reproduce',
          type: 'link',
        },
      ],
    },
  ],
};
