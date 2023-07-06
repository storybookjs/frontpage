---
title: 'Highlight'
---

Storybook's [Highlight](https://storybook.js.org/addons/@storybook/addon-highlight/) addon allows you to highlight specific DOM nodes within your story. You can use it to call attention to particular parts of the story.

![](highlight.png)

This addon can be used to enhance other addons. For example, [Accessibility](https://storybook.js.org/addons/@storybook/addon-a11y/) addon uses it to highlight DOM nodes that are failing accessibility checks.

## Apply or clear highlights

Highlight DOM nodes by emitting the `HIGHLIGHT` event from within a story or an addon. The event payload must contain a list of selectors you want to highlight.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/component-story-highlight-addon.js.mdx',
    'angular/component-story-highlight-addon.ts.mdx',
    'vue/component-story-highlight-addon.js.mdx',
    'web-components/component-story-highlight-addon.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

Highlights are automatically cleared when the story changes. You can also manually clear them by emitting the `RESET_HIGHLIGHT` event.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/addon-highlight-reset.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Customize style

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/addon-highlight-customize.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->
