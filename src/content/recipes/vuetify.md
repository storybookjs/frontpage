<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have a Vue 3 app using Vuetify v3 and have just set up Storybook 7.0 using the [getting started guide](/docs/7.0/vue/get-started/install). Don’t have this? Follow Vuetify’s [installation instructions](https://next.vuetifyjs.com/en/getting-started/installation/#installation) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Register Vuetify in Storybook

To get started, you'll need to add Vuetify’s fontloader and plugin to your Storybook configuration.
To do this, add the following to your `.storybook/preview.js` file:

```js
// .storybook/preview.js

import { setup } from '@storybook/vue3';
import { registerPlugins } from '../src/plugins';

setup((app) => {
  // Registers your app's plugins into Storybook
  registerPlugins(app);
});
```

Here `registerPlugins` loads Vuetify’s fonts and registers all of its components with Storybook’s Vue app.

## 2. Create a story wrapper component

Next, you will need to wrap your stories in Vuetify's `v-app` component in order to use some of its larger layout components like `v-app-bar`.

To do this, create a component in `.storybook/` called `StoryWrapper.vue`

```vue
<!-- .storybook/StoryWrapper.vue -->
<template>
  <v-app>
    <v-main>
      <slot name="story"></slot>
    </v-main>
  </v-app>
</template>

<script></script>
```

## 3. Create a `withVuetifyTheme` decorator
Now create a storybook [decorator](/docs/vue/writing-stories/decorators) to wrap your stories in your StoryWrapper component.

Below I created a new file in `.storybook` called `withVuetifyTheme.decorator.js`.

```js
// .storybook/withVuetifyTheme.decorator.js
import { h } from 'vue';
import StoryWrapper from './StoryWrapper.vue';

export const withVuetifyTheme = (storyFn, context) => {
  const story = storyFn();

  return () => {
    return h(
      StoryWrapper,
      {}, // Props for StoryWrapper
      {
        // Puts your story into StoryWrapper's "story" slot with your story args
        story: () => h(story, { ...context.args }),
      }
    );
  };
};
```

Now, give this decorator to Storybook in your `preview.js` file.

```js
// .storybook/preview.js

import { setup } from '@storybook/vue3';
import { registerPlugins } from '../src/plugins';
import { withVuetifyTheme } from './withVuetifyTheme.decorator';

setup((app) => {
  registerPlugins(app);
});

/* snipped for brevity */

export const decorators = [withVuetifyTheme];
```


## 4. Add a theme switcher tool

Vuetify comes out of the box with a light and dark theme that you can override or add to. To get the most out of your stories, you should have a way to toggle between all of your themes.

To add our switcher, declare a [global type](/docs/vue/essentials/toolbars-and-globals) named `theme` in `.storybook/preview.js` and give it a list of supported themes to choose from.

```js
// .storybook/preview.js

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape
      items: [
        { value: 'light', title: 'Light', left: '🌞' },
        { value: 'dark', title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};
```

This code will create a new toolbar menu to select your desired theme for your stories.

## 5. Add a theme provider

There needs to be a way to tell Vuetify to use the theme selected in the toolbar.
This can be done by updating our `StoryWrapper` component and `withVuetifyTheme` decorator

Firstly, give `StoryWrapper` a `themeName` prop that it can give to `v-app`

```vue
<template>
  <v-app :theme="themeName">
    <v-main>
      <slot name="story"></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    themeName: String,
  },
};
</script>
```

Now pass our global `theme` variable to our `StoryWrapper` component as a prop with our decorator

```js
// .storybook/withVuetifyTheme.decorator.js
import { h } from 'vue';
import StoryWrapper from './StoryWrapper.vue';

export const DEFAULT_THEME = 'light';

export const withVuetifyTheme = (storyFn, context) => {
  // Pull our global theme variable, fallback to DEFAULT_THEME
  const themeName = context.globals.theme || DEFAULT_THEME;
  const story = storyFn();

  return () => {
    return h(
      StoryWrapper,
      // give themeName to StoryWrapper as a prop
      { themeName },
      {
        story: () => h(story, { ...context.args }),
      }
    );
  };
};
```

## Get involved

Now you're ready to use Vuetify with Storybook. 🎉 Check out the [example repo](https://github.com/Integrayshaun/vue3-vuetify-storybook-recipe-example) for a quick start.

If you use Vuetify at work, we'd love your help making an addon that automatically applies the configuration above. Join the maintainers in [Discord](https://discord.gg/storybook) to get involved, or jump into [addon docs](/docs/addons).
