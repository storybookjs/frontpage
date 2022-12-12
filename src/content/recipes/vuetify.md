<div class="aside">

This recipe assumes that you have a Vue 3 app using Vuetify v3 and have just set up Storybook 7.0 using the [getting started guide](https://storybook.js.org/docs/7.0/vue/get-started/install).

Don’t have this? Follow Vuetify’s [installation instructions](https://next.vuetifyjs.com/en/getting-started/installation/#installation) then run

```shell
# Add Storybook:
npx sb@next init --prerelease
```

</div>

Vuetify is a popular UI framework for Vue.js that provides a variety of pre-designed components, while Storybook is a tool for creating and testing UI components in isolation.
This post will show you how to integrate these two tools to create a powerful and flexible development environment for building user interfaces with Vuetify.

In this post, we will explain how to

- 🔌 Setup Vuetify with Storybook
- 🧱 Use Vuetify in your components
- 🎨 Switch Vuetify themes in a click

If you’d like to see the example code of this recipe, check out the [example repository](https://github.com/Integrayshaun/vue3-vuetify-storybook-recipe-example) on GitHub. Let's get started!

![Completed Vuetify example with theme switcher](https://user-images.githubusercontent.com/18172605/207120625-bedb53ec-eac4-4690-a06a-5d0579cb9809.gif)

## Register Vuetify in Storybook

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

## Using Vuetify Components

Let’s update some of our example components to use Vuetify instead. We’ll use the Button component in `./src/stories/button.vue`.

![Unchanged example button component from Storybook init](https://user-images.githubusercontent.com/18172605/207120859-0383d01a-6448-4327-94c9-dcb1ec86f868.png)

Currently, it’s not looking very Vuetiful so let’s make some changes. Replace the contents of `./src/stories/Button.vue` with the following code

```vue
<template>
  <v-btn type="button" color="primary" @click="onClick" :variant="variant" :size="size">{{
    label
  }}</v-btn>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      onClick() {
        emit('click');
      },
      variant: computed(() => (props.primary ? 'flat' : 'outlined')),
    };
  },
};
</script>
```

Now if we look back at our Storybook, our button is now the Vuetify button. It even changed in our page-level stories.

![Converting the example button into a Vuetify button](https://user-images.githubusercontent.com/18172605/207120996-cdd40459-97f7-4e40-9782-719c45c38d11.gif)

## Add a theme switcher tool using globalTypes

Vuetify comes out of the box with a light and dark theme but you can override them and add more. To get the most out of your stories, you should have a way to toggle between all of your themes.

![Switching to Vuetify's dark theme in Storybook](https://user-images.githubusercontent.com/18172605/207121142-dbc27018-02d1-438d-b3d1-1d45e265e16a.gif)

To add our switcher, we can declare a global variable named `theme` in `.storybook/preview.js` and give it a list of supported themes to choose from.

```js
// .storybook/preview.js

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
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

This code will create a new toolbar dropdown to select your desired theme for your stories.

## Add a `withVuetifyTheme` decorator

We need a way to tell Vuetify to use the theme that we’ve selected in the toolbar.
To do that, we’ll need to make a decorator.

Below I created a new file in `.storybook` called `withVuetifyTheme.decorator.js` that will take our global theme value and update Vuetify’s current theme.

```js
// .storybook/withVeutifyTheme.decorator.js

import { useTheme } from 'vuetify';

export const DEFAULT_THEME = 'light';

export const withVuetifyTheme = (story, context) => {
  const globalTheme = context.globals.theme || DEFAULT_THEME;

  return {
    components: { story },
    setup() {
      const theme = useTheme();

      theme.global.name.value = globalTheme;

      return {
        theme,
      };
    },
    template: `<story />`,
  };
};
```

Now all we have to do is give this decorator to Storybook to wrap our stories in.
Add the decorator to the decorator array in `.storybook/preview.js`:

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

## Get involved

Now you're ready to use Vuetify with Storybook. 🎉 Check out the [example repo](https://github.com/Integrayshaun/vue3-vuetify-storybook-recipe-example) for a quick start.

If you use Vuetify at work, we'd love your help making an addon that automatically applies the configuration above. Join the maintainers in Discord to get involved, or jump into addon docs.
