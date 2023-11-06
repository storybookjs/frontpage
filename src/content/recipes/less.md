<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you have an app using Less and have just set up **Storybook >=7.0** using the [getting started guide](/docs/react/get-started/install). Don’t have this? Then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>

## 1. Configure your Storybook builder

<Callout variant="info" icon="📣" title="Before you begin" style={{ marginBottom: '10px' }}>

If you are using Vite as your Storybook builder, you can skip to the [next step](#2-import-global-styles).

</Callout>

Firstly, install the [`@storybook/addon-styling-webpack`](https://storybook.js.org/addons/@storybook/addon-styling-webpack) addon.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. When prompted, select `Less` from the configuration options.

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this command runs <code>npx @storybook/auto-config styling</code>, which is responsible for reading your project and attempting to configure your Storybook Webpack for your desired tools. If running that command directly does not resolve your issue, please consider filing a bug report on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. For manual configuration instructions for Less, you can refer to the documentation <a href="https://github.com/storybookjs/addon-styling-webpack" target="_blank">here</a>.</p>
</details>

## 2. Import global styles

If you have any global styles you would like to expose for your stories, you can now import them into your `preview.js` file:

```js
// .storybook/preview.js
import '../src/index.less';
```

## Get involved

Now you're ready to use Less with Storybook. 🎉 If you use Less at work, we'd love your feedback on the Less + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
