---
title: 'Parameters'
---

## Available parameters

Storybook only accepts a few parameters directly.

### `layout`

Type: `'centered' | 'fullscreen' | 'padded'`

Default: `'padded'`

Specifies how the canvas should layout the story.

- **centered**: Center the story within the canvas
- **padded**: (default) Add padding to the story
- **fullscreen**: Show the story as-is, without padding

### `options`

Type:

```ts
{
  storySort?: StorySortConfig | StorySortFn;
  // TK - necessary?
  theme?: {
    base: string;
    brandTitle?: string;
  };
  [key: string]: any;
}
```

TK

#### `options.storySort`

Type: `StorySortConfig | StorySortFn`

```ts
type StorySortConfig = {
  includeNames?: boolean;
  locales?: string;
  method?: 'alphabetical' | 'alphabetical-by-kind' | 'custom';
  order?: string[];
};

type Story = {
  id: string;
  importPath: string;
  name: string;
  title: string;
};

type StorySortFn = (a: Story, b: Story) => number;
```

TK

---

All other parameters are contributed by addons. The [essential addon's](../addons/essentials.md) parameters are documented on their individual pages:

- [Actions](../essentials/actions.md)
- [Backgrounds](../essentials/backgrounds.md)
- [Controls](../essentials/controls.md)
- [Highlight](../essentials/highlight.md)
- [Interactions](../essentials/interactions.md)
- [Measure & Outline](../essentials/measure-and-outline.md)
- [Toolbars & globals](../essentials/toolbars-and-globals.md)
- [Viewport](../essentials/viewport.md)

## Parameter inheritance

No matter where they're specified, parameters are ultimately applied to a single story. Parameters specified at the project (global) level are applied to every story in that project. Those specified at the meta (component) level are applied to every story associated with that meta. And parameters specified for a story only apply to that story.

When specifying parameters, they are merged together in order of increasing specificity:

1. Project (global) parameters
2. Meta (component) parameters
3. Story parameters

<div class="aside">

ℹ️ Parameters are **merged**, so individual keys are always overwritten, never dropped.

</div>

In other words, the following specifications of parameters:

```js
// .storybook/preview.js|ts

const preview = {
  // 👇 Project-level parameters
  parameters: {
    layout: 'centered',
    viewport: {
      viewports: defaultViewports,
    },
  },
  // ...
};
export default preview;
```

```js
// Dialog.stories.js|ts

const meta = {
  component: Dialog,
  // 👇 Meta-level parameters
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'medium',
      viewports: viewportsForDialog,
    },
  },
};
export default meta;

// (no additional parameters specified)
export const Basic = {};

export const LargeScreen = {
  // 👇 Story-level parameters
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'large',
    },
  },
};
```

Will result in the following parameter values applied to each story:

```js
// For the Basic story:
{
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'medium',
    viewports: viewportsForDialog,
  },
}

// For the LargeScreen story:
{
  layout: 'padded',
  viewport: {
    defaultViewport: 'large',
    viewports: viewportsForDialog,
  },
}
```
