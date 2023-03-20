import * as React from 'react';
import { styles as marketingStyles } from '@storybook/components-marketing';
import { Button, styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { useDocsContext } from './DocsContext';

const { defaultFramework } = require('../../../../site-metadata');

const { breakpoint, color, hoverEffect, spacing } = styles;
const { marketing } = marketingStyles;

type Template = {
  name: string;
  script: string;
  expected: {
    framework: string;
    renderer: string;
    builder: string;
  };
  expectedFailures?: Array<{
    feature: string;
    issues: string[];
  }>;
  unsupportedFeatures?: Array<{
    feature: string;
    issues: string[];
  }>;
  skipTasks?: string[];
  inDevelopment?: boolean;
  modifications?: {
    mainConfig?: Partial<unknown>;
  };
  isInternal?: boolean;
};

// https://github.com/storybookjs/storybook/blob/next/code/lib/cli/src/sandbox-templates.ts
const sandboxesFromMonorepo: Record<string, Template> = {
  'cra/default-js': {
    name: 'Create React App (Javascript)',
    script: 'npx create-react-app .',
    expected: {
      // TODO: change this to @storybook/cra once that package is created
      framework: '@storybook/react-webpack5',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'cra/default-ts': {
    name: 'Create React App (Typescript)',
    script: 'npx create-react-app . --template typescript',
    // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
    skipTasks: ['smoke-test'],
    expected: {
      // TODO: change this to @storybook/cra once that package is created
      framework: '@storybook/react-webpack5',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'nextjs/12-js': {
    name: 'Next.js v12 (JavaScript)',
    script:
      'yarn create next-app {{beforeDir}} -e https://github.com/vercel/next.js/tree/next-12-3-2/examples/hello-world && cd {{beforeDir}} && npm pkg set "dependencies.next"="^12.2.0" && yarn && git add . && git commit --amend --no-edit && cd ..',
    expected: {
      framework: '@storybook/nextjs',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'nextjs/default-js': {
    name: 'Next.js (JavaScript)',
    script: 'yarn create next-app {{beforeDir}} --javascript --eslint',
    expected: {
      framework: '@storybook/nextjs',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'nextjs/default-ts': {
    name: 'Next.js (TypeScript)',
    script: 'yarn create next-app {{beforeDir}} --typescript --eslint',
    expected: {
      framework: '@storybook/nextjs',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'react-vite/default-js': {
    name: 'React Vite (JS)',
    script: 'yarn create vite . --template react',
    expected: {
      framework: '@storybook/react-vite',
      renderer: '@storybook/react',
      builder: '@storybook/builder-vite',
    },
  },
  'react-vite/default-ts': {
    name: 'React Vite (TS)',
    script: 'yarn create vite . --template react-ts',
    expected: {
      framework: '@storybook/react-vite',
      renderer: '@storybook/react',
      builder: '@storybook/builder-vite',
    },
  },
  'react-webpack/18-ts': {
    name: 'React 18 Webpack5 (TS)',
    script: 'yarn create webpack5-react .',
    expected: {
      framework: '@storybook/react-webpack5',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'react-webpack/17-ts': {
    name: 'React 17 Webpack5 (TS)',
    script: 'yarn create webpack5-react . --version-react="17" --version-react-dom="17"',
    expected: {
      framework: '@storybook/react-webpack5',
      renderer: '@storybook/react',
      builder: '@storybook/builder-webpack5',
    },
  },
  'solid-vite/default-js': {
    name: 'SolidJS Vite (JS)',
    script: 'npx degit solidjs/templates/js .',
    expected: {
      framework: 'storybook-solidjs-vite',
      renderer: 'storybook-solidjs',
      builder: '@storybook/builder-vite',
    },
    // TODO: remove this once solid-vite framework is released
    inDevelopment: true,
  },
  'solid-vite/default-ts': {
    name: 'SolidJS Vite (TS)',
    script: 'npx degit solidjs/templates/ts .',
    expected: {
      framework: 'storybook-solidjs-vite',
      renderer: 'storybook-solidjs',
      builder: '@storybook/builder-vite',
    },
    // TODO: remove this once solid-vite framework is released
    inDevelopment: true,
  },
  'vue3-vite/default-js': {
    name: 'Vue3 Vite (JS)',
    script: 'yarn create vite . --template vue',
    expected: {
      framework: '@storybook/vue3-vite',
      renderer: '@storybook/vue3',
      builder: '@storybook/builder-vite',
    },
  },
  'vue3-vite/default-ts': {
    name: 'Vue3 Vite (TS)',
    script: 'yarn create vite . --template vue-ts',
    expected: {
      framework: '@storybook/vue3-vite',
      renderer: '@storybook/vue3',
      builder: '@storybook/builder-vite',
    },
  },
  'vue2-vite/2.7-js': {
    name: 'Vue2 Vite (vue 2.7 JS)',
    script: 'npx create-vue@2 {{beforeDir}} --default',
    // TODO: reenable this once sandbox is available
    inDevelopment: true,
    // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
    skipTasks: ['smoke-test'],
    expected: {
      framework: '@storybook/vue-vite',
      renderer: '@storybook/vue',
      builder: '@storybook/builder-vite',
    },
  },
  'html-webpack/default': {
    name: 'HTML Webpack5',
    script: 'yarn create webpack5-html .',
    expected: {
      framework: '@storybook/html-webpack5',
      renderer: '@storybook/html',
      builder: '@storybook/builder-webpack5',
    },
  },
  'html-vite/default-js': {
    name: 'HTML Vite JS',
    script: 'yarn create vite . --template vanilla && echo "export default {}" > vite.config.js',
    expected: {
      framework: '@storybook/html-vite',
      renderer: '@storybook/html',
      builder: '@storybook/builder-vite',
    },
  },
  'html-vite/default-ts': {
    name: 'HTML Vite TS',
    script: 'yarn create vite . --template vanilla-ts && echo "export default {}" > vite.config.js',
    expected: {
      framework: '@storybook/html-vite',
      renderer: '@storybook/html',
      builder: '@storybook/builder-vite',
    },
  },
  'svelte-vite/default-js': {
    name: 'Svelte Vite (JS)',
    script: 'yarn create vite . --template svelte',
    expected: {
      framework: '@storybook/svelte-vite',
      renderer: '@storybook/svelte',
      builder: '@storybook/builder-vite',
    },
  },
  'svelte-vite/default-ts': {
    name: 'Svelte Vite (TS)',
    script: 'yarn create vite . --template svelte-ts',
    // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
    skipTasks: ['smoke-test'],
    expected: {
      framework: '@storybook/svelte-vite',
      renderer: '@storybook/svelte',
      builder: '@storybook/builder-vite',
    },
  },
  'angular-cli/default-ts': {
    name: 'Angular CLI (latest)',
    script:
      'npx -p @angular/cli ng new angular-latest --directory . --routing=true --minimal=true --style=scss --strict --skip-git --skip-install --package-manager=yarn',
    expected: {
      framework: '@storybook/angular',
      renderer: '@storybook/angular',
      builder: '@storybook/builder-webpack5',
    },
  },
  'angular-cli/14-ts': {
    name: 'Angular CLI (Version 14)',
    script:
      'npx -p @angular/cli@14 ng new angular-v14 --directory . --routing=true --minimal=true --style=scss --strict --skip-git --skip-install --package-manager=yarn',
    expected: {
      framework: '@storybook/angular',
      renderer: '@storybook/angular',
      builder: '@storybook/builder-webpack5',
    },
  },
  'svelte-kit/skeleton-js': {
    name: 'Svelte Kit (JS)',
    script:
      'yarn create svelte-with-args --name=svelte-kit/skeleton-js --directory=. --template=skeleton --types=null --no-prettier --no-eslint --no-playwright --no-vitest',
    expected: {
      framework: '@storybook/sveltekit',
      renderer: '@storybook/svelte',
      builder: '@storybook/builder-vite',
    },
  },
  'svelte-kit/skeleton-ts': {
    name: 'Svelte Kit (TS)',
    script:
      'yarn create svelte-with-args --name=svelte-kit/skeleton-ts --directory=. --template=skeleton --types=typescript --no-prettier --no-eslint --no-playwright --no-vitest',
    expected: {
      framework: '@storybook/sveltekit',
      renderer: '@storybook/svelte',
      builder: '@storybook/builder-vite',
    },
  },
  'lit-vite/default-js': {
    name: 'Lit Vite (JS)',
    script: 'yarn create vite . --template lit',
    // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
    skipTasks: ['smoke-test'],
    expected: {
      framework: '@storybook/web-components-vite',
      renderer: '@storybook/web-components',
      builder: '@storybook/builder-vite',
    },
  },
  'lit-vite/default-ts': {
    name: 'Lit Vite (TS)',
    script: 'yarn create vite . --template lit-ts',
    // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
    skipTasks: ['smoke-test'],
    expected: {
      framework: '@storybook/web-components-vite',
      renderer: '@storybook/web-components',
      builder: '@storybook/builder-vite',
    },
  },
  'vue-cli/default-js': {
    name: 'Vue-CLI (Default JS)',
    script: 'npx -p @vue/cli vue create . --default --packageManager=yarn --force --merge',
    skipTasks: [
      // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
      'smoke-test',
    ],
    expected: {
      framework: '@storybook/vue3-webpack5',
      renderer: '@storybook/vue3',
      builder: '@storybook/builder-webpack5',
    },
  },
  'vue-cli/vue2-default-js': {
    name: 'Vue-CLI (Vue2 JS)',
    script:
      'npx -p @vue/cli vue create . --default --packageManager=yarn --force --merge --preset="Default (Vue 2)"',
    skipTasks: [
      // Re-enable once https://github.com/storybookjs/storybook/issues/19351 is fixed.
      'smoke-test',
    ],
    expected: {
      framework: '@storybook/vue-webpack5',
      renderer: '@storybook/vue',
      builder: '@storybook/builder-webpack5',
    },
  },
  'preact-webpack5/default-js': {
    name: 'Preact CLI (Default JS)',
    script: 'npx preact-cli create default {{beforeDir}} --name preact-app --yarn --no-install',
    expected: {
      framework: '@storybook/preact-webpack5',
      renderer: '@storybook/preact',
      builder: '@storybook/builder-webpack5',
    },
  },
  'preact-webpack5/default-ts': {
    name: 'Preact CLI (Default TS)',
    script: 'npx preact-cli create typescript {{beforeDir}} --name preact-app --yarn --no-install',
    expected: {
      framework: '@storybook/preact-webpack5',
      renderer: '@storybook/preact',
      builder: '@storybook/builder-webpack5',
    },
  },
  'preact-vite/default-js': {
    name: 'Preact Vite (JS)',
    script: 'yarn create vite . --template preact',
    expected: {
      framework: '@storybook/preact-vite',
      renderer: '@storybook/preact',
      builder: '@storybook/builder-vite',
    },
  },
  'preact-vite/default-ts': {
    name: 'Preact Vite (TS)',
    script: 'yarn create vite . --template preact-ts',
    expected: {
      framework: '@storybook/preact-vite',
      renderer: '@storybook/preact',
      builder: '@storybook/builder-vite',
    },
  },
  'qwik-vite/default-ts': {
    name: 'Qwik CLI (Default TS)',
    script: 'yarn create qwik basic {{beforeDir}} --no-install',
    // TODO: The community template does not provide standard stories, which is required for e2e tests.
    inDevelopment: true,
    // TODO: Re-enable once problems are fixed.
    skipTasks: ['e2e-tests'],
    expected: {
      framework: 'storybook-framework-qwik',
      renderer: 'storybook-framework-qwik',
      builder: 'storybook-framework-qwik',
    },
  },
};

const frameworkToRenderer = {
  react: ['@storybook/react'],
  vue: ['@storybook/vue', '@storybook/vue3'],
  angular: ['@storybook/angular'],
  'web-components': ['@storybook/web-components'],
  html: ['@storybook/html'],
  svelte: ['@storybook/svelte'],
  preact: ['@storybook/preact'],
};

const metaFrameworks = {
  cra: 'react',
  nextjs: 'nextjs',
  'angular-cli': 'angular',
  'svelte-kit': 'svelte-kit',
  'vue-cli': 'vue',
};

const renderers = {
  vue3: 'vue',
};

const builders = {
  webpack5: 'webpack',
};

const friendlyNames = {
  react: 'React',
  vue: 'Vue 2',
  vue3: 'Vue 3',
  angular: 'Angular',
  'web-components': 'Web Components',
  html: 'HTML',
  svelte: 'Svelte',
  preact: 'Preact',
  cra: 'CRA',
  nextjs: 'Next.js',
  'angular-cli': 'Angular CLI',
  'svelte-kit': 'SvelteKit',
  'vue-cli': 'Vue CLI',
  webpack: 'Webpack',
  webpack5: 'Webpack',
  vite: 'Vite',
  js: 'JavaScript',
  ts: 'TypeScript',
};

const usableSandboxes = Object.entries(sandboxesFromMonorepo).filter(
  ([, { inDevelopment, isInternal }]) => !inDevelopment && !isInternal
);
usableSandboxes.sort((a, b) => a[0].localeCompare(b[0]));

const None = styled.p`
  font-size: 87.5%;
  line-height: 1.43;
  color: ${color.dark};
  background: #f8fafc;
  border-radius: ${styles.spacing.borderRadius.small}px;
  padding: 1em;
  margin: 1.5em 0;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.padding.medium}px;

  && {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Card = styled.div`
  color: inherit;
  display: block;
  text-decoration: none;
  border: 1px solid ${color.border};
  border-radius: ${spacing.borderRadius.small}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: ${spacing.padding.small}px;
  padding: ${spacing.padding.medium}px;
`;

const Title = styled.h3`
  flex: 1 0 100%;

  && {
    ${marketing.textLargeBold}
    margin: 0;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: ${spacing.padding.small}px;
  margin-right: auto;
`;

const IconImg = styled.img`
  width: ${spacing.padding.large}px;
`;

function getFrameworkSandboxes(framework) {
  return usableSandboxes
    .filter(
      ([
        ,
        {
          expected: { renderer },
        },
      ]) => frameworkToRenderer[framework]?.includes(renderer)
    )
    .map(([key, { name }]) => {
      const icons = [];

      const [metaFramework, version] = key.split('/');
      if (Object.keys(metaFrameworks).includes(metaFramework)) {
        icons.push(metaFrameworks[metaFramework]);
      } else {
        const [renderer, builder] = metaFramework.split('-');
        icons.push(renderers[renderer] || renderer);
        icons.push(builders[builder] || builder);
      }

      if (version.endsWith('ts')) {
        icons.push('ts');
      } else {
        icons.push('js');
      }

      return { name, icons };
    });
}

export const Sandboxes = () => {
  const {
    framework: [framework],
  } = useDocsContext();
  const frameworkSandboxes = React.useMemo(() => getFrameworkSandboxes(framework), [framework]);

  const [sandboxes, setSandboxes] = React.useState(frameworkSandboxes);

  React.useLayoutEffect(() => {
    if (sandboxes.length === 0) {
      setSandboxes(getFrameworkSandboxes(defaultFramework));
    }
  }, [sandboxes, setSandboxes]);

  return (
    <>
      {frameworkSandboxes.length === 0 ? (
        <None>
          There are no sandboxes available for {friendlyNames[framework] || framework}, so here are
          the {friendlyNames[defaultFramework] || defaultFramework} sandboxes:
        </None>
      ) : null}
      <Grid>
        {sandboxes.map(({ name, icons }) => {
          const url = `https://stackblitz.com/github/storybookjs/sandboxes/tree/next/${name}/after-storybook?preset=node`;

          return (
            <li key={name}>
              <Card>
                <Title>{name}</Title>
                <Icons>
                  {icons.map((icon) => (
                    <IconImg
                      key={icon}
                      src={`/images/logos/integrations/${icon}.svg`}
                      alt={friendlyNames[icon]}
                    />
                  ))}
                </Icons>
                <Button isLink href={url} appearance="outline" size="small">
                  Open sandbox
                </Button>
              </Card>
            </li>
          );
        })}
      </Grid>
    </>
  );
};
