---
title: 'Telemetry'
---

Storybook collects completely anonymous data to help us improve user experience. Participation in this anonymous program is optional, and you may opt-out if you'd not like to share any information.

## Why is telemetry collected?

Hundreds of thousands of developers use Storybook daily to build, test, and document components. Storybook is framework agnostic and integrates with the front-end ecosystem:

- **JavaScript frameworks** such as [React](https://reactjs.org/), [Vue](https://vuejs.org/), [Svelte](https://svelte.dev/) and [Solid](https://www.solidjs.com/)
- **Libraries** such as [Styled-Components](https://styled-components.com/), [Tailwind](https://tailwindcss.com/), [Redux](https://redux.js.org/)
- **Design tools** such as [Figma](https://figma.com/), [Sketch](https://www.sketch.com/), [Zeplin](https://zeplin.io/) and [InVision](https://www.invisionapp.com/)
- **Workflow tools** such as [Notion](https://www.notion.so/product), [Confluence](https://www.atlassian.com/software/confluence), and [Jira](https://www.atlassian.com/software/jira)

In the past, our improvement process relied on manually gathering feedback. But with a growing userbase and the need to support a wide variety of integrations, we need a more accurate method for gauging Storybook usage and pain points.

These telemetry data help us (the maintainers) to prioritize the highest impact projects. That allows us to keep up with trends in the front-end ecosystem and verify that our community's hard work achieves the intended result.

## What is being collected?

We collect general usage details, including command invocation, Storybook version, addons, and the view layer.

Specifically, we track the following information in our telemetry events:

- Timestamp of the occurrence.
- Command invoked (e.g., `init`, `upgrade`, `dev`, `build`).
- Storybook unique identifier: One-way hash generated during Storybook installation process.
- One way hash of the IP address where the event occurred for spam detection.
- Story count.
- Storybook version.
- Storybook metadata:
  - Language (e.g., TypeScript, JavaScript).
  - Supported view layers (e.g., React, Vue, Angular, Svelte).
  - Builder (e.g., Webpack4, Webpack5, Vite).
  - Meta framework (e.g., [Next](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/), [CRA](https://create-react-app.dev/)).
  - [Addons](https://storybook.js.org/addons/) (e.g., [Essentials](../essentials/introduction.md), [Accessibility](https://storybook.js.org/addons/@storybook/addon-a11y/)).
  - [Feature flags](./overview.md#feature-flags) (e.g., `buildStoriesJson`).
- Package manager information (e.g., `npm`, `yarn`).
- Monorepo information (e.g., [NX](https://nx.dev/), [Turborepo](https://turborepo.org/)).
- Whether the command was invoked on CI or not.

Access to the raw data is highly controlled, limited to select members of Storybook's core team who maintain the telemetry. We cannot identify individual users from the dataset: it is anonymized and untraceable back to the user.

## What about sensitive information?

We take your privacy and our security very seriously. We perform additional steps to ensure that secure data (e.g., environment variables or other forms of sensitive data) **do not** make their way into our analytics. You can view all the information we collect by setting the `STORYBOOK_TELEMETRY_DEBUG` to `1` to print out the information gathered. For example:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-telemetry-preview-event.yarn.js.mdx',
    'common/storybook-telemetry-preview-event.npm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

Will generate the following output:

```json
{
  "anonymousId": "8bcfdfd5f9616a1923dd92adf89714331b2d18693c722e05152a47f8093392bb",
  "eventType": "start",
  "payload": {
    "storyIndex": {
      "storyCount": 4,
      "version": 3
    }
  },
  "inCI": false,
  "metadata": {
    "generatedAt": 1648233198722,
    "builder": {
      "name": "webpack5"
    },
    "hasCustomBabel": false,
    "hasCustomWebpack": true,
    "hasStaticDirs": true,
    "hasStorybookEslint": false,
    "refCount": 0,
    "metaFramework": {
      "name": "CRA",
      "packageName": "react-scripts",
      "version": "4.0.3"
    },
    "packageManager": {
      "name": "yarn",
      "version": "3.1.1"
    },
    "monorepo": "Nx",
    "features": {
      "buildStoriesJson": true
    },
    "storybookVersion": "6.5.0",
    "language": "typescript",
    "storybookPackages": {
      "@storybook/addons": {
        "version": "6.5.0"
      },
      "@storybook/builder-webpack5": {
        "version": "6.5.0"
      },
      "@storybook/react": {
        "version": "6.5.0"
      }
    },
    "framework": {
      "name": "react"
    },
    "addons": {
      "@storybook/preset-create-react-app": {
        "version": "3.2.0"
      },
      "@storybook/addon-ie11": {
        "version": "0.0.7--canary.5e87b64.0"
      },
      "@storybook/addon-essentials": {
        "options": {
          "viewport": false
        },
        "version": "6.5.0"
      }
    }
  }
}
```

## Will this data be shared?

The data we collect is anonymous, not traceable to the source, and only meaningful in aggregate form. No data we collect is personally identifiable.
In the future, we plan to share relevant data with the community through public dashboards (or similar data representation formats).

## How to opt-out

You may opt-out of the telemetry by setting Storybook's configuration element `disableTelemetry` to `true`, using the `--disable-telemetry` flag, or setting the environment variable`STORYBOOK_DISABLE_TELEMETRY` to `1`. For example:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-main-disable-telemetry.main-js.js.mdx',
    'common/storybook-main-disable-telemetry.main-ts.ts.mdx',
    'common/storybook-disable-telemetry-flag.yarn.js.mdx',
    'common/storybook-disable-telemetry-flag.npm.js.mdx',
    'common/storybook-disable-telemetry-flag.pnpm.js.mdx',
    'common/storybook-disable-telemetry-env.env-var.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">
  💡 There is a <code>boot</code> event that contains no metadata at all (simply used to ensure the telemetry is working). It is sent prior to evaluating your <code>main.js</code>, so it is unaffected by the <code>disableTelemetry</code> option. If you want to ensure that event is not sent, be sure to use the <code>STORYBOOK_DISABLE_TELEMETRY</code> environment variable.
</div>

## Crash reports (disabled by default)

In addition to general usage telemetry, you may also choose to share crash reports. Storybook will then sanitize the error object (removing all user paths) and append it to the telemetry event. To enable crash reporting, you can set the `enableCrashReports` configuration element to `true`, using the `--enable-crash-reports` flag, or set the `STORYBOOK_ENABLE_CRASH_REPORTS` environment variable to `1`. For example:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-telemetry-main-enable-crash-reports.main-js.js.mdx',
    'common/storybook-telemetry-main-enable-crash-reports.main-ts.ts.mdx',
    'common/storybook-telemetry-storybook-enable-crash-reports.yarn.js.mdx',
    'common/storybook-telemetry-storybook-enable-crash-reports.npm.js.mdx',
    'common/storybook-telemetry-storybook-enable-crash-reports.pnpm.js.mdx',
    'common/storybook-telemetry-storybook-enable-crash-reports.env-var.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

Generates the following item in the telemetry event:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-telemetry-crash-report-event.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->
