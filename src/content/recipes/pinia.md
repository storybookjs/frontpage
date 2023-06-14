<div class="aside aside__no-top">

This recipe assumes that you are using Vue 3 and Storybook >= 7.x. If you haven't upgraded yet, run the following command:

```shell
npx storybook@latest upgrade
```

</div>

<RecipeHeader>

How to setup Pinia and Storybook

</RecipeHeader>

Pinia is the recommended standard for state management in Vue. It gives you a lightweight and type-safe way to handle global state for your applications. This recipe will show you how to integrate Pinia into Storybook so that you can test your state connected components.

If you want to look at a full example, look at this [awesome repo](https://github.com/chakAs3/vue3-pinia-storybook/tree/main) built by [Chakir Qatab (ChakAs3)](https://github.com/chakAs3).

## Initialize pinia

Inside of `.storybook/preview.ts`, import and initialize pinia.

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

## Register pinia

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

## Get involved

Now you're ready to use Pinia with Storybook. 🎉 If you use Pinia at work, we'd love your feedback on the Pinia + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
