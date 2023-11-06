<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have an app using Sass and have just set up **Storybook >=7.0** using the [getting started guide](/docs/react/get-started/install). Don’t have this? Then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Add `@storybook/addon-styling-webpack`

<Callout variant="neutral" icon="ℹ️" title="Heads up!" style={{ marginBottom: '10px' }}>

Some Storybook configurations are pre-configured to support Sass. If your project meets any of the following criteria, you can skip to the [next step](#2-import-global-styles).

- Storybook >= 7.x with the `vite` builder.
- Storybook >= 7.x with the `@storybook/nextjs` framework.
- Storybook >= 7.x with the `@storybook/preset-create-react-app` and `react-scripts@2.x.x` or higher.
- Storybook >= 7.x with the `@storybook/angular` framework

</Callout>

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. When prompted, select `Sass` from the configuration options.

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this command runs <code>npx @storybook/auto-config styling</code>, which is responsible for reading your project and attempting to configure your Storybook Webpack for your desired tools. If running that command directly does not resolve your issue, please consider filing a bug report on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. For manual configuration instructions for Sass, you can refer to the documentation <a href="https://github.com/storybookjs/addon-styling-webpack" target="_blank">here</a>.</p>
</details>

## 2. Import global styles

If you have any global styles you would like to expose for your stories, you can now import them into your `preview.js` file:

```js
// .storybook/preview.js
import '../src/index.scss';
```

### 2.1. Angular

If you are using Angular, you will need to add your global scss file(s) to your `angular.json` file instead. This will make sure your styles are processed by Angular's Webpack and injected into the preview iframe where your stories are rendered.

```json
// angular.json
{
 "storybook": {
    "builder": "@storybook/angular:start-storybook",
    "options": {
      "browserTarget": "my-default-project:build",
      "styles": ["src/index.scss"]
    }
  } 
}
```

## Get involved

Now you're ready to use Sass with Storybook. 🎉 If you use Sass at work, we'd love your feedback on the Sass + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
