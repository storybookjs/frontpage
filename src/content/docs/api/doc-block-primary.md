---
title: 'Primary'
---

The `Primary` block displays the primary (first defined in the stories file) story, in a [`Story`](./doc-block-story.md) block. It is typically rendered immediately under the title in a docs entry.

![Screenshot of Primary block](./doc-block-primary.png)

<!-- prettier-ignore-start -->
```md
{/* ButtonDocs.mdx */}

import { Meta, Primary } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

<Primary />
```
<!-- prettier-ignore-end -->

## Primary

```js
import { Primary } from '@storybook/blocks';
```

`Primary` is configured with the following props:

### `name`

(⛔️ **Deprecated**)

Type: `string`

Primary block should only be used to render the primary story, which is automatically found.
