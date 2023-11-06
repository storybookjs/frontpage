<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you are using Next.js >= 12.x as well as Storybook >= 7.x

</Callout>

## Set up your project


### In a project without Storybook

Follow the prompts after running this command in your Next.js project's root directory:

```shell
npx storybook@latest init
```

### In a project with Storybook

This framework is designed to work with Storybook 7. If you’re not already using v7, upgrade with this command:

```shell
npx storybook@latest upgrade
```

#### Automatic migration

When running the upgrade command above, you should get a prompt asking you to migrate to `@storybook/nextjs`, which should handle everything for you. In case that auto-migration does not work for your project, refer to the manual migration below.

#### Manual migration

Install the framework:

```shell
yarn add -D @storybook/nextjs
```

Update your `main.js` to change the framework property:

```js
// .storybook/main.js
export default {
  // ...
  framework: {
    // name: '@storybook/react-webpack5', // Remove this
    name: '@storybook/nextjs', // Add this
    options: {},
  },
};
```

If you were using Storybook plugins to integrate with Next.js, those are no longer necessary when using this framework and can be removed:

```js
// .storybook/main.js
export default {
  // ...
  addons: [
    // ...
    // These can both be removed
    // 'storybook-addon-next',
    // 'storybook-addon-next-router',
  ],
};
```
## Framework Options

You can be pass an options object for additional configuration if needed.

For example:

```js
// .storybook/main.js
import * as path from 'path';

export default {
  // ...
  framework: {
    name: '@storybook/nextjs',
    options: {
      image: {
        loading: 'eager',
      },
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
};
```

- `image`: Props to pass to every instance of `next/image`
- `nextConfigPath`: The absolute path to the `next.config.js`

## Next.js's Image Component

[next/image](https://nextjs.org/docs/api-reference/next/image) is [notoriously difficult](https://github.com/vercel/next.js/issues/18393) to get working with Storybook. This framework allows you to use Next.js's `Image` component with no configuration!

### Local Images

[Local images](https://nextjs.org/docs/basic-features/image-optimization#local-images) work just fine! Keep in mind that this feature was [only added in Next.js v11](https://nextjs.org/blog/next-11#automatic-size-detection-local-images).

```js
import Image from 'next/image';
import profilePic from '../public/me.png';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="../public/me.png" set to equal the image itself (for this framework)
        // placeholder="blur" // Optional blur-up while loading
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

### Remote Images

[Remote images](https://nextjs.org/docs/basic-features/image-optimization#remote-images) also work just fine!

```js
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image src="/me.png" alt="Picture of the author" width={500} height={500} />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

## Next.js Font Optimization

[next/font](https://nextjs.org/docs/basic-features/font-optimization) is partially supported in Storybook. The packages `next/font/google` and `next/font/local` are supported.

### next/font/google

You don't have to do anything. `next/font/google` is supported out of the box.

### next/font/local

For local fonts you have to define the [src](https://nextjs.org/docs/api-reference/next/font#src) property.
The path is relative to the directory where the font loader function is called.

If the following component defines your localFont like this:

```js
// src/components/MyComponent.js
import localFont from 'next/font/local';

const localRubikStorm = localFont({ src: './fonts/RubikStorm-Regular.ttf' });
```

You have to tell Storybook where the `fonts` directory is located. The `from` value is relative to the `.storybook` directory. The `to` value is relative to the execution context of Storybook. Very likely it is the root of your project.

```js
// .storybook/main.js
export default {
  ...
  "staticDirs": [
    {
      from: '../src/components/fonts',
      to: 'src/components/fonts'
    }
  ],
}
```

### Not supported features of `next/font`

The following features are not supported (yet). Support for these features might be planned for the future:

- [Support font loaders configuration in next.config.js](https://nextjs.org/docs/basic-features/font-optimization#specifying-a-subset)
- [fallback](https://nextjs.org/docs/api-reference/next/font#fallback) option
- [adjustFontFallback](https://nextjs.org/docs/api-reference/next/font#adjustfontfallback) option
- [declarations](https://nextjs.org/docs/api-reference/next/font#declarations) option
- [preload](https://nextjs.org/docs/api-reference/next/font#preload) option gets ignored. Storybook handles Font loading its own way.
- [display](https://nextjs.org/docs/api-reference/next/font#display) option gets ignored. All fonts are loaded with display set to "block" to make Storybook load the font properly.

### Mocking fonts during testing

Occasionally fetching fonts from Google may fail as part of your Storybook build step. It is highly recommended to mock these requests, as those failures can cause your pipeline to fail as well. Next.js [supports mocking fonts](https://github.com/vercel/next.js/blob/725ddc7371f80cca273779d37f961c3e20356f95/packages/font/src/google/fetch-css-from-google-fonts.ts#L36) via a JavaScript module located where the env var `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` references.

For example, using [GitHub Actions](https://www.chromatic.com/docs/github-actions):

```shell
      - uses: chromaui/action@v1
        env:
          #👇 the location of mocked fonts to use
          NEXT_FONT_GOOGLE_MOCKED_RESPONSES: ${{ github.workspace }}/mocked-google-fonts.js
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

Your mocked fonts will look something like this:

```js
// mocked-google-fonts.js
//👇 Mocked responses of google fonts with the URL as the key
module.exports = {
  'https://fonts.googleapis.com/css?family=Inter:wght@400;500;600;800&display=block': `
    /* cyrillic-ext */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhiJ-Ek-_EeAmM.woff2) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* more font declarations go here */
    /* latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }`,
};
```

## Next.js Routing

[Next.js's router](https://nextjs.org/docs/routing/introduction) is automatically stubbed for you so that when the router is interacted with, all of its interactions are automatically logged to the Actions ctions panel if you have the [Storybook actions addon](https://storybook.js.org/docs/react/essentials/actions).

<Callout variant="warning" icon="⚠️">

When using Next.js 13+, you should only use `next/router` in the `pages` directory. In the `app` directory, it is necessary to use `next/navigation`.

</Callout>

### Overriding defaults

Per-story overrides can be done by adding a `nextjs.router` property onto the story [parameters](https://storybook.js.org/docs/react/writing-stories/parameters). The framework will shallowly merge whatever you put here into the router.

```js
// SomeComponentThatUsesTheRouter.stories.js
import SomeComponentThatUsesTheRouter from './SomeComponentThatUsesTheRouter';

export default {
  component: SomeComponentThatUsesTheRouter,
};

// If you have the actions addon,
// you can interact with the links and see the route change events there
export const Example = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/profile/[id]',
        asPath: '/profile/1',
        query: {
          id: '1',
        },
      },
    },
  },
};
```

### Global Defaults

Global defaults can be set in [preview.js](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering) and will be shallowly merged with the default router.

```js
// .storybook/preview.jsx

export const parameters = {
  nextjs: {
    router: {
      pathname: '/some-default-path',
      asPath: '/some-default-path',
      query: {},
    },
  },
};
```

### Default Router

The default values on the stubbed router are as follows (see [globals](https://storybook.js.org/docs/react/essentials/toolbars-and-globals#globals) for more details on how globals work)

```ts
const defaultRouter = {
  push(...args) {
    action('nextRouter.push')(...args);
    return Promise.resolve(true);
  },
  replace(...args) {
    action('nextRouter.replace')(...args);
    return Promise.resolve(true);
  },
  reload(...args) {
    action('nextRouter.reload')(...args);
  },
  back(...args) {
    action('nextRouter.back')(...args);
  },
  forward() {
    action('nextRouter.forward')();
  },
  prefetch(...args) {
    action('nextRouter.prefetch')(...args);
    return Promise.resolve();
  },
  beforePopState(...args) {
    action('nextRouter.beforePopState')(...args);
  },
  events: {
    on(...args) {
      action('nextRouter.events.on')(...args);
    },
    off(...args) {
      action('nextRouter.events.off')(...args);
    },
    emit(...args) {
      action('nextRouter.events.emit')(...args);
    },
  },
  // The locale should be configured [globally](https://storybook.js.org/docs/react/essentials/toolbars-and-globals#globals)
  locale: globals?.locale,
  asPath: '/',
  basePath: '/',
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  route: '/',
  pathname: '/',
  query: {},
};
```

### Actions Integration Caveats

If you override a function, you lose the automatic actions integration and have to build it out yourself.

```js
// .storybook/preview.jsx

export const parameters = {
  nextjs: {
    router: {
      push() {
        // The default implementation that logs the action into the Actions panel is lost
      },
    },
  },
};
```

Doing this yourself looks something like this (make sure you install the `@storybook/addon-actions` package):

```js
// .storybook/preview.jsx
import { action } from '@storybook/addon-actions';

export const parameters = {
  nextjs: {
    router: {
      push(...args) {
        // Custom logic can go here
        // This logs to the Actions panel
        action('nextRouter.push')(...args);
        // Return whatever you want here
        return Promise.resolve(true);
      },
    },
  },
};
```

## Next.js Navigation

<Callout variant="warning" icon="⚠️">

Please note that [next/navigation](https://beta.nextjs.org/docs/upgrade-guide#step-5-migrating-routing-hooks) can only be used in components/pages in the `app` directory of Next.js 13+.

</Callout>

### Set `nextjs.appDirectory` to `true`

If your story imports components that use `next/navigation`, you need to set the parameter `nextjs.appDirectory` to `true` in your Story:

```js
// SomeComponentThatUsesTheRouter.stories.js
import SomeComponentThatUsesTheNavigation from './SomeComponentThatUsesTheNavigation';

export default {
  component: SomeComponentThatUsesTheNavigation,
};

export const Example = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
},
```

If your Next.js project uses the `app` directory for every page (in other words, it does not have a `pages` directory), you can set the parameter `nextjs.appDirectory` to `true` in the [preview.js](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering) file to apply it to all stories.

```js
// .storybook/preview.jsx

export const parameters = {
  nextjs: {
    appDirectory: true,
  },
};
```

The parameter `nextjs.appDirectory` defaults to `false` if not set.

### Overriding defaults

Per-story overrides can be done by adding a `nextjs.navigation` property onto the story [parameters](https://storybook.js.org/docs/react/writing-stories/parameters). The framework will shallowly merge whatever you put here into the router.

```js
// SomeComponentThatUsesTheNavigation.stories.js
import SomeComponentThatUsesTheNavigation from './SomeComponentThatUsesTheNavigation';

export default {
  component: SomeComponentThatUsesTheNavigation,
};

// If you have the actions addon,
// you can interact with the links and see the route change events there
export const Example = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/profile',
        query: {
          user: '1',
        },
      },
    },
  },
};
```

### Global Defaults

Global defaults can be set in [preview.js](https://storybook.js.org/docs/react/configure/overview#configure-story-rendering) and will be shallowly merged with the default router.

```js
// .storybook/preview.jsx

export const parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      pathname: '/some-default-path',
    },
  },
};
```

### `useSelectedLayoutSegment` `useSelectedLayoutSegments` and `useParams` hook

The `useSelectedLayoutSegment` `useSelectedLayoutSegments` and `useParams` hooks are supported in Storybook. You have to set the `nextjs.navigation.segments` parameter to return the segments or the params you want to use.

```js
// SomeComponentThatUsesTheNavigation.stories.js
import SomeComponentThatUsesTheNavigation from './SomeComponentThatUsesTheNavigation';

export default {
  component: SomeComponentThatUsesTheNavigation,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['dashboard', 'analytics']
      },
    },
  },
};

export const Example = {};

// SomeComponentThatUsesTheNavigation.js
import { useSelectedLayoutSegment, useSelectedLayoutSegments, useParams } from 'next/navigation';

export default function SomeComponentThatUsesTheNavigation() {
  const segment = useSelectedLayoutSegment(); // dashboard
  const segments = useSelectedLayoutSegments(); // ["dashboard", "analytics"]
  const params = useParams(); // {}
  ...
}
```

To use `useParams`, you have to use a two string elements array for a segment, the first array element is the param key and the second array element is the param value.

```js
// SomeComponentThatUsesParams.stories.js
import SomeComponentThatUsesParams from './SomeComponentThatUsesParams';

export default {
  component: SomeComponentThatUsesParams,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: [
          ['slug', 'hello'],
          ['framework', 'nextjs'],
        ]
      },
    },
  },
};

export const Example = {};

// SomeComponentThatUsesParams.js
import { useSelectedLayoutSegment, useSelectedLayoutSegments, useParams } from 'next/navigation';

export default function SomeComponentThatUsesParams() {
  const segment = useSelectedLayoutSegment(); // hello
  const segments = useSelectedLayoutSegments(); // ["hello", "nextjs"]
  const params = useParams(); // { slug: "hello", framework: "nextjs" }
  ...
}
```

The default value of `nextjs.navigation.segments` is `[]` if not set.

### Default Navigation Context

The default values on the stubbed navigation context are as follows:

```ts
const defaultNavigationContext = {
  push(...args) {
    action('nextNavigation.push')(...args);
  },
  replace(...args) {
    action('nextNavigation.replace')(...args);
  },
  forward(...args) {
    action('nextNavigation.forward')(...args);
  },
  back(...args) {
    action('nextNavigation.back')(...args);
  },
  prefetch(...args) {
    action('nextNavigation.prefetch')(...args);
  },
  refresh: () => {
    action('nextNavigation.refresh')();
  },
  pathname: '/',
  query: {},
};
```

### Actions Integration Caveats

If you override a function, you lose the automatic action tab integration and have to build it out yourself.

```js
// .storybook/preview.jsx

export const parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      push() {
        // The default implementation that logs the action into the Actions panel is lost
      },
    },
  },
};
```

Doing this yourself looks something like this (make sure you install the `@storybook/addon-actions` package):

```js
// .storybook/preview.jsx
import { action } from '@storybook/addon-actions';

export const parameters = {
  nextjs: {
    appDirectory: true,
    navigation: {
      push(...args) {
        // Custom logic can go here
        // This logs to the Actions panel
        action('nextNavigation.push')(...args);
        // Return whatever you want here
        return Promise.resolve(true);
      },
    },
  },
};
```

## Next.js Head

[next/head](https://nextjs.org/docs/api-reference/next/head) is supported out of the box. You can use it in your stories like you would in your Next.js application. Please keep in mind, that the Head children are placed into the head element of the iframe that Storybook uses to render your stories.

## Get involved

Now you're ready to use Next.js with Storybook. 🎉 If you use Nextjs at work, we'd love your feedback on the Next + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
