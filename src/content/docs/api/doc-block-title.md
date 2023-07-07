---
title: 'Title'
---

The `Title` block serves as the primary heading for your docs entry. It is typically used to provide the component or page name.

![Screenshot of Title block](./doc-block-title-subtitle-description.png)

<!-- prettier-ignore-start -->
```md
{/* ButtonDocs.mdx */}

import { Title } from '@storybook/blocks';

<Title>This is the title</Title>
```
<!-- prettier-ignore-end -->

## Title

```js
import { Title } from '@storybook/blocks';
```

`Title` is configured with the following props:

### `children`

Type: `JSX.Element | string`

Provides the content. Falls back to value of `title` in an [attached](./doc-block-meta.md#attached-vs-unattached) CSF file (or value derived from [autotitle](../configure/sidebar-and-urls.md#csf-30-auto-titles)), trimmed to the last segment. For example, if the title value is `'path/to/components/Button'`, the default content is `'Button'`.
