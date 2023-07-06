---
title: 'Actions'
---

The actions addon is used to display data received by event handler (callback) arguments in your stories.

<video autoPlay muted playsInline loop>
  <source
    src="addon-actions-demo-optimized.mp4"
    type="video/mp4"
  />
</video>

## Action args

Actions work via supplying special Storybook-generated “action” arguments (referred to as "args" for short) to your stories. There are two ways to get an action arg:

### Action argType annotation

You can use [argTypes](../api/argtypes.md) to tell Storybook that an arg to your story should be an action. Usually, it makes sense to do this at the component level (although you can apply it per individual story):

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/button-story-onclick-action-argtype.ts.mdx',
    'web-components/button-story-onclick-action-argtype.js.mdx',
    'web-components/button-story-onclick-action-argtype.ts.mdx',
    'common/button-story-onclick-action-argtype.js.mdx',
    'common/button-story-onclick-action-argtype.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

When Storybook sees this argType, it will create an arg set to a special “action” callback. If your component calls this arg (based on the user's interaction or through the `play` function), the event will show up in the action panel:

![Essential Actions addon usage](./addon-actions-screenshot.png)

### Automatically matching args

Another option is to use a global parameter to match all [argTypes](../api/argtypes.md) that match a certain pattern. The following configuration automatically creates actions for each `on` argType (which you can either specify manually or can be [inferred automatically](../api/argtypes.md#automatic-argtype-inference)).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-preview-matching-argtypes.js.mdx',
    'common/storybook-preview-matching-argtypes.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

If you need more granular control over which `argTypes` are matched, you can adjust your stories and include the `argTypes` parameter. For example:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/button-story-matching-argtypes.ts.mdx',
    'web-components/button-story-matching-argtypes.js.mdx',
    'web-components/button-story-matching-argtypes.ts.mdx',
    'common/button-story-matching-argtypes.js.mdx',
    'common/button-story-matching-argtypes.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

💡 If you're generating argTypes with another addon (like [docs](../writing-docs/introduction.md), which is the common behavior), ensure the actions addon <strong>AFTER</strong> the other addon. You can do this by listing it later in the addons registration code in [`.storybook/main.js`](../configure/overview.md#configure-story-rendering). This is default in [essentials](./introduction.md).

</div>

## Action event handlers

It is also possible to detect if your component is emitting the correct HTML events using the `parameters.actions.handles` [parameter](../writing-stories/parameters.md).

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/button-story-action-event-handle.ts.mdx',
    'web-components/button-story-action-event-handle.js.mdx',
    'web-components/button-story-action-event-handle.ts.mdx',
    'common/button-story-action-event-handle.js.mdx',
    'common/button-story-action-event-handle.ts.mdx',
  ]}
/>


<!-- prettier-ignore-end -->

This will bind a standard HTML event handler to the outermost HTML element rendered by your component and trigger an action when the event is called for a given selector. The format is `<eventname> <selector>`. The selector is optional; it defaults to all elements.

## Advanced / legacy usage

There are also some older ways to use actions as documented in the [advanced README](../../addons/actions/ADVANCED.md).
