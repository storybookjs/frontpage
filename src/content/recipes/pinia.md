<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you are using Vue 3 and Storybook >= 7.x. If you haven't upgraded yet, run the following command:

```shell
npx storybook@latest upgrade
```

</Callout>

## 1. Initialize Pinia

Inside of `.storybook/preview.ts`, import and initialize Pinia.

```ts
// .storybook/preview.ts
import  { type Preview }  from '@storybook/vue3';

import { createPinia } from 'pinia';

const pinia = createPinia();


const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
```

## 2. Register Pinia

Import Storybook's setup function that lets you register tools with Storybook's Vue app instance.

```ts
// .storybook/preview.ts
import { type Preview, setup }  from '@storybook/vue3';
import { type App } from 'vue';

import { createPinia } from 'pinia';

const pinia = createPinia();

setup((app: App) => {
    app.use(pinia);
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
```

<Callout variant="info" icon="💡" title="Need an example?">

If you want to look at a full example, look at this [awesome repo](https://github.com/chakAs3/vue3-pinia-storybook/tree/main) built by [Chakir Qatab (ChakAs3)](https://github.com/chakAs3).

</Callout>

## Get involved

Now you're ready to use Pinia with Storybook. 🎉 If you use Pinia at work, we'd love your feedback on the Pinia + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
