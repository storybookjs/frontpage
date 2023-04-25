<div class="aside aside__no-top">

This recipe assumes that you are using SvelteKit >= 1.0 as well as Storybook >= 7.0

</div>

<RecipeHeader>

How to setup SvelteKit and Storybook

</RecipeHeader>

Svelte is quickly becoming a major framework in the front-end ecosystem, offering lots of fantastic features for web developers. With SvelteKit, it also provides a powerful meta-framework for applications. At Storybook, we're investing in the Svelte ecosystem to create a seamless and enjoyable experience for users of Svelte and Storybook.

Fortunately, there is now an easier way to develop isolated components with the new `@storybook/sveltekit` framework package. As an industry-standard for component development, Storybook is proud to offer SvelteKit 1.0 features in a seamless integration. With our package, Storybook automatically mirrors the project settings of both SvelteKit. Here's what you'll get:

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
