<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have a Next >= 12 app. Don’t have this? Follow Next's [setup instructions](https://nextjs.org/docs/getting-started/installation) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

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

## Get involved

Now you're ready to use Next.js with Storybook. 🎉 If you use Nextjs at work, we'd love your feedback on the Next + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
