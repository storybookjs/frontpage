<Callout variant="neutral" icon="ℹ️" title="Prerequisites">

This recipe assumes that you already have an app using Vanilla-extract and have just set up **Storybook >= 7.0** using the [getting started guide](/docs/react/get-started/install). Don't have this? Follow Vanilla-extract's [setup instructions](https://vanilla-extract.style/documentation/getting-started) then run:

```shell
# Add Storybook:
npx storybook@latest init
```

</Callout>


## Configure your Storybook builder

<Callout variant="info" icon="💡" style={{ marginBottom: '10px' }}>

If you're already using Vanilla Extract in your project, you may already have these dependencies installed.

</Callout>

First of all, install the required dependencies:

```shell
# For Vite users
yarn add -D @vanilla-extract/vite-plugin

# For Webpack users
yarn add -D @vanilla-extract/webpack-plugin mini-css-extract-plugin
```

### Vite

For Vite users, Storybook uses your project's `vite.config.js` for its build configuration. This means if your project uses Vanilla Extract, it's also already configured for your Storybook. 🎉

You can view a full example on [Stackblitz](https://stackblitz.com/edit/github-cytqag?file=.storybook/main.ts).

### Webpack

For Webpack users, [@storybook/addon-styling-webpack](https://storybook.js.org/addons/@storybook/addon-styling-webpack/) can get your Storybook up and running with Vanilla Extract in a few lines of code.

Run the following script to install and register the addon:

```shell
npx storybook@latest add @storybook/addon-styling-webpack
```

This will run a configuration script that will walk you through setting up the addon. If prompted, select `Vanilla Extract` as your CSS processor.

<details>
  <summary>Did the configuration script fail?</summary>
  <p>Under the hood, this command runs <code>npx @storybook/auto-config styling</code>, which is responsible for reading your project and attempting to configure your Storybook Webpack for your desired tools. If running that command directly does not resolve your issue, please consider filing a bug report on the <a href="https://github.com/storybookjs/auto-config/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=%5BBug%5D" target="_blank">@storybook/auto-config</a> repository so that we can further improve it. For manual configuration instructions for Less, you can refer to the <a href="https://github.com/storybookjs/addon-styling-webpack" target="_blank">documentation</a>.</p>
</details>

<Callout variant="info" icon="⚙️" title="Manually configure Webpack">

For an example of manual configuration, you can view a full example on [Stackblitz](https://stackblitz.com/edit/sb-vanilla-extract-webpack?file=.storybook/main.ts).

</Callout>

## Get involved

Now you're ready to use Vanilla Extract with Storybook. 🎉 If you use Vanilla Extract at work, we'd love your feedback on the Vanilla Extract + Storybook experience.

Join the maintainers and our thriving community in [Discord](https://discord.gg/storybook).
