<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you already have a **SvelteKit >= 1.0** app and have just set up **Storybook >= 7.0** using the [getting started guide](/docs/svelte/get-started/install). Don't have this? Follow Sveltekit's [setup instructions](https://kit.svelte.dev/docs/creating-a-project) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## Feature support

With our package, Storybook automatically mirrors the project settings of SvelteKit. Here's what you'll get:

- 📚 Supports imports that use the special `$lib` alias
- 👓 Components can read current environment information from `$app/environment`
- 🖼️ `$app/paths` is supported so you can safely get paths for assets
- 🛒 Stores in `$app/stores` are supported out of the box

## In a project without Storybook

Run the following command in your SvelteKit project's root directory, and follow the prompts:

```shell
npx storybook@latest init
```

Storybook will automatically detect your SvelteKit project and install the necessary packages and configurations.

## In a project with Storybook

If you’re already using Storybook prior to version 7 in a project, upgrade Storybook with this command, and follow the prompts:

```shell
npx storybook@latest upgrade
```

If your existing project is configured with the Vite builder, it will prompt you to migrate your Storybook configuration and dependencies to the new `@storybook/sveltekit` package automatically.

![Storybook CLI automatically detecting a SvelteKit project](https://storybookblog.ghost.io/content/images/2023/02/Untitled--1-.png)

If your existing Storybook setup is using the Webpack builder, it can’t automatically migrate for you, because there’s no way to migrate your Webpack configuration to a Vite configuration. In that case, follow the [manual migration steps](https://github.com/storybookjs/storybook/tree/next/code/frameworks/sveltekit#manual-migration) instead.

## Get involved

Now you're ready to use SvelteKit with Storybook. 🎉 If you use SvelteKit at work, we'd love your feedback on the SvelteKit + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
