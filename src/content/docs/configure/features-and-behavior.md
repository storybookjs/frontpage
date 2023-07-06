---
title: 'Features and behavior'
---

To control the layout of Storybook’s UI you can use `addons.setConfig` in your [`.storybook/manager.js`](./overview.md#configure-story-rendering):

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-config-layout.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

The following table details how to use the API values:

| Name                |     Type      |                    Description                     |             Example Value             |
| ------------------- | :-----------: | :------------------------------------------------: | :-----------------------------------: |
| **isFullscreen**    |    Boolean    |        Show story component as full screen         |                `false`                |
| **showNav**         |    Boolean    |     Display panel that shows a list of stories     |                `true`                 |
| **showPanel**       |    Boolean    |   Display panel that shows addon configurations    |                `true`                 |
| **panelPosition**   | String/Object |           Where to show the addon panel            |          `bottom` or `right`          |
| **enableShortcuts** |    Boolean    |              Enable/disable shortcuts              |                `true`                 |
| **showToolbar**     |    Boolean    |                 Show/hide tool bar                 |                `true`                 |
| **theme**           |    Object     |         Storybook Theme, see next section          |              `undefined`              |
| **selectedPanel**   |    String     |            Id to select an addon panel             |       `storybook/actions/panel`       |
| **initialActive**   |    String     |      Select the default active tab on Mobile       |   `sidebar` or `canvas` or `addons`   |
| **sidebar**         |    Object     |             Sidebar options, see below             |        `{ showRoots: false }`         |
| **toolbar**         |    Object     | Modify the tools in the toolbar using the addon id | `{ fullscreen: { hidden: false } } }` |

The following options are configurable under the `sidebar` namespace:

| Name               |   Type   |                          Description                          |                  Example Value                   |
| ------------------ | :------: | :-----------------------------------------------------------: | :----------------------------------------------: |
| **showRoots**      | Boolean  |    Display the top-level nodes as a "root" in the sidebar     |                     `false`                      |
| **collapsedRoots** |  Array   |     Set of root node IDs to visually collapse by default      |               `['misc', 'other']`                |
| **renderLabel**    | Function | Create a custom label for tree nodes; must return a ReactNode | `(item) => <abbr title="...">{item.name}</abbr>` |

The following options are configurable under the `toolbar` namespace:

| Name   |  Type  |            Description             |    Example Value    |
| ------ | :----: | :--------------------------------: | :-----------------: |
| **id** | String | Toggle visibility for toolbar item | `{ hidden: false }` |

## Configuring through URL parameters

You can use URL parameters to configure some of the available features:

| Config option       | Query param  |      Supported values      |
| ------------------- | :----------: | :------------------------: |
| **enableShortcuts** | `shortcuts`  |          `false`           |
| **isFullscreen**    |    `full`    |           `true`           |
| **showNav**         |    `nav`     |          `false`           |
| **showPanel**       |   `panel`    | `false`, `right`, `bottom` |
| **selectedPanel**   | `addonPanel` |        Any panel ID        |
| **showTabs**        |    `tabs`    |           `true`           |
|       ---           | `instrument` |      `false`, `true`       |
