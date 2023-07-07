---
title: 'Test runner'
---

Storybook test runner turns all of your stories into executable tests. It is powered by [Jest](https://jestjs.io/) and [Playwright](https://playwright.dev/).

- For those [without a play function](../writing-stories/introduction.md): it verifies whether the story renders without any errors.
- For those [with a play function](../writing-stories/play-function.md): it also checks for errors in the play function and that all assertions passed.

These tests run in a live browser and can be executed via the [command line](#cli-options) or your [CI server](#set-up-ci-to-run-tests).

## Setup

The test-runner is a standalone, framework-agnostic utility that runs parallel to your Storybook. You will need to take some additional steps to set it up properly. Detailed below is our recommendation to configure and execute it.

Run the following command to install it.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-install.yarn.js.mdx',
    'common/storybook-test-runner-install.npm.js.mdx',
    'common/storybook-test-runner-install.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

Update your `package.json` scripts and enable the test runner.

```json
{
  "scripts": {
    "test-storybook": "test-storybook"
  }
}
```

Start your Storybook with:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/storybook-run-dev.with-builder.js.mdx',
    'common/storybook-run-dev.yarn.js.mdx',
    'common/storybook-run-dev.npm.js.mdx',
    'common/storybook-run-dev.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">
💡 Storybook's test runner requires either a locally running Storybook instance or a published Storybook to run all the existing tests.
</div>

Finally, open a new terminal window and run the test-runner with:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-execute.yarn.js.mdx',
    'common/storybook-test-runner-execute.npm.js.mdx',
    'common/storybook-test-runner-execute.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Configure

Test runner offers zero-config support for Storybook. However, you can run `test-storybook --eject` for more fine-grained control. It generates a `test-runner-jest.config.js` file at the root of your project, which you can modify. Additionally, you can extend the generated configuration file and provide [testEnvironmentOptions](https://github.com/playwright-community/jest-playwright#configuration) as the test runner also uses [jest-playwright](https://github.com/playwright-community/jest-playwright) under the hood.

### CLI Options

The test-runner is powered by [Jest](https://jestjs.io/) and accepts a subset of its [CLI options](https://jestjs.io/docs/cli) (for example, `--watch`, `--maxWorkers`).
If you're already using any of those flags in your project, you should be able to migrate them into Storybook's test-runner without any issues. Listed below are all the available flags and examples of using them.

| Options                         | Description                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `--help`                        | Output usage information <br/>`test-storybook --help`                                                                            |
| `-s`, `--stories-json`          | Run in stories json mode. Automatically detected (requires a compatible Storybook) <br/>`test-storybook --stories-json`          |
| `--no-stories-json`             | Disables stories json mode <br/>`test-storybook --no-stories-json`                                                               |
| `-c`, `--config-dir [dir-name]` | Directory where to load Storybook configurations from <br/>`test-storybook -c .storybook`                                        |
| `--watch`                       | Run in watch mode <br/>`test-storybook --watch`                                                                                  |
| `--url`                         | Define the URL to run tests in. Useful for custom Storybook URLs <br/>`test-storybook --url http://the-storybook-url-here.com`   |
| `--browsers`                    | Define browsers to run tests in. One or multiple of: chromium, firefox, webkit <br/>`test-storybook --browsers firefox chromium` |
| `--maxWorkers [amount]`         | Specifies the maximum number of workers the worker-pool will spawn for running tests <br/>`test-storybook --maxWorkers=2`        |
| `--no-cache`                    | Disable the cache <br/>`test-storybook --no-cache`                                                                               |
| `--clearCache`                  | Deletes the Jest cache directory and then exits without running tests <br/>`test-storybook --clearCache`                         |
| `--verbose`                     | Display individual test results with the test suite hierarchy <br/>`test-storybook --verbose`                                    |
| `-u`, `--updateSnapshot`        | Use this flag to re-record every snapshot that fails during this test run <br/>`test-storybook -u`                               |
| `--eject`                       | Creates a local configuration file to override defaults of the test-runner <br/>`test-storybook --eject`                         |
| `--coverage`                    | Runs [coverage tests](./test-coverage.md) on your stories and components <br/> `test-storybook --coverage`                       |
| `--shard [index/count]`         | Requires CI. Splits the test suite execution into multiple machines <br/> `test-storybook --shard=1/8`                           |

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-execute-with-flags.yarn.js.mdx',
    'common/storybook-test-runner-execute-with-flags.npm.js.mdx',
    'common/storybook-test-runner-execute-with-flags.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

### Run tests against a deployed Storybook

By default, the test-runner assumes that you're running it against a locally served Storybook on port `6006`. If you want to define a target URL to run against deployed Storybooks, you can use the `--url` flag or set the `TARGET_URL` environment variable. For example:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-execute-with-url.yarn.js.mdx',
    'common/storybook-test-runner-execute-with-url.npm.js.mdx',
    'common/storybook-test-runner-execute-with-url.pnpm.js.mdx',
    'common/storybook-test-runner-execute-with-url.env-var.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

## Set up CI to run tests

You can also configure the test-runner to run tests on a CI environment. Documented below are some recipes to help you get started.

### Run against deployed Storybooks via Github Actions deployment

If you're publishing your Storybook with services such as [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/), they emit a `deployment_status` event in GitHub Actions. You can use it and set the `deployment_status.target_url` as the `TARGET_URL` environment variable. Here's how:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-with-deploy-event-workflow.yml.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

💡 The published Storybook must be publicly available for this example to work. We recommend running the test server using the recipe [below](#run-against-non-deployed-storybooks) if it requires authentication.

</div>

### Run against non-deployed Storybooks

You can use your CI provider (for example, [GitHub Actions](https://github.com/features/actions), [GitLab Pipelines](https://docs.gitlab.com/ee/ci/pipelines/), [CircleCI](https://circleci.com/)) to build and run the test runner against your built Storybook. Here's a recipe that relies on third-party libraries, that is to say, [concurrently](https://www.npmjs.com/package/concurrently), [http-server](https://www.npmjs.com/package/http-server), and [wait-on](https://www.npmjs.com/package/wait-on) to build Storybook and run tests with the test-runner.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-local-build-workflow.yml.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

💡 By default Storybook outputs the [build](../sharing/publish-storybook.md#build-storybook-as-a-static-web-application) to the `storybook-static` directory. If you're using a different build directory, you'll need to adjust the recipe accordingly.

</div>

### What's the difference between Chromatic and Test runner?

The test-runner is a generic testing tool that can run locally or on CI and be configured or extended to run all kinds of tests.

[Chromatic](https://www.chromatic.com/?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook) is a cloud-based service that runs [visual](./visual-testing.md) and [interaction tests](./interaction-testing.md) (and soon accessibility tests) without setting up the test runner. It also syncs with your git provider and manages access control for private projects.

However, you might want to pair the test runner and Chromatic in some cases.

- Use it locally and Chromatic on your CI.
- Use Chromatic for visual and interaction tests and run other custom tests using the test runner.

## Advanced configuration

### Test hook API (experimental)

The test-runner renders a story and executes its [play function](../writing-stories/play-function.md) if one exists. However, certain behaviors are impossible to achieve via the play function, which executes in the browser. For example, if you want the test-runner to take visual snapshots for you, this is possible via Playwright/Jest but must be executed in Node.

The test-runner exports test hooks that can be overridden globally to enable use cases like visual or DOM snapshots. These hooks give you access to the test lifecycle _before_ and _after_ the story is rendered.
Listed below are the available hooks and an overview of how to use them.

| Hook         | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `setup`      | Executes once before all the tests run<br/>`setup() {}`                       |
| `preRender`  | Executes before a story is rendered<br/>`async preRender(page, context) {}`   |
| `postRender` | Executes after the story is rendered<br/>`async postRender(page, context) {}` |

<div class="aside">

💡 These test hooks are experimental and may be subject to breaking changes. We encourage you to test as much as possible within the story's [play function](../writing-stories/play-function.md).

</div>

To enable the hooks API, you'll need to add a new configuration file inside your Storybook directory and set them up as follows:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-hooks-example.js.mdx',
    'common/storybook-test-runner-hooks-example.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

💡 Except for the `setup` function, all other functions run asynchronously. Both `preRender` and `postRender` functions include two additional arguments, a [Playwright page](https://playwright.dev/docs/pages) and a context object which contains the `id`, `title`, and the `name` of the story.

</div>

When the test-runner executes, your existing tests will go through the following lifecycle:

- The `setup` function is executed before all the tests run.
- The context object is generated containing the required information.
- Playwright navigates to the story's page.
- The `preRender` function is executed.
- The story is rendered, and any existing `play` functions are executed.
- The `postRender` function is executed.

### Helpers

The test-runner exports a few helpers that can be used to make your tests more readable and maintainable by accessing Storybook's internals (e.g., `args`, `parameters`). Listed below are the available helpers and an overview of how to use them.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-helper-function.js.mdx',
    'common/storybook-test-runner-helper-function.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

### Stories.json mode

The test-runner transforms your story files into tests when testing a local Storybook. For a remote Storybook, it uses the Storybook's [stories.json](../configure/overview.md#feature-flags) file (a static index of all the stories) to run the tests.

#### Why?

Suppose you run into a situation where the local and remote Storybooks appear out of sync, or you might not even have access to the code. In that case, the `stories.json` file is guaranteed to be the most accurate representation of the deployed Storybook you are testing. To test a local Storybook using this feature, use the `--stories-json` flag as follows:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-with-stories-json.yarn.js.mdx',
    'common/storybook-test-runner-with-stories-json.npm.js.mdx',
    'common/storybook-test-runner-with-stories-json.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<div class="aside">

💡 The `stories.json` mode is not compatible with watch mode.

</div>

If you need to disable it, use the `--no-stories-json` flag:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-test-runner-disable-stories-json.yarn.js.mdx',
    'common/storybook-test-runner-disable-stories-json.npm.js.mdx',
    'common/storybook-test-runner-disable-stories-json.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

#### How do I check if my Storybook has a `stories.json` file?

Stories.json mode requires a `stories.json` file. Open a browser window and navigate to your deployed Storybook instance (for example, `https://your-storybook-url-here.com/stories.json`). You should see a JSON file that starts with a `"v": 3` key, immediately followed by another key called "stories", which contains a map of story IDs to JSON objects. If that is the case, your Storybook supports [stories.json mode](../configure/overview.md#feature-flags).

---

## Troubleshooting

### The test runner seems flaky and keeps timing out

If your tests time out with the following message:

```shell
Timeout - Async callback was not invoked within the 15000 ms timeout specified by jest.setTimeout
```

It might be that Playwright couldn't handle testing the number of stories you have in your project. Perhaps you have a large number of stories, or your CI environment has a really low RAM configuration. In such cases, you should limit the number of workers that run in parallel by adjusting your command as follows:

```json
{
  "scripts": {
    "test-storybook:ci": "yarn test-storybook --maxWorkers=2"
  }
}
```

### The error output in the CLI is too short

By default, the test runner truncates error outputs at 1000 characters, and you can check the full output directly in Storybook in the browser. However, if you want to change that limit, you can do so by setting the `DEBUG_PRINT_LIMIT` environment variable to a number of your choosing, for example, `DEBUG_PRINT_LIMIT=5000 yarn test-storybook`.

### Run the test runner in other CI environments

As the test runner is based on Playwright, you might need to use specific docker images or other configurations depending on your CI setup. In that case, you can refer to the [Playwright CI docs](https://playwright.dev/docs/ci) for more information.

#### Learn about other UI tests

- Test runner to automate test execution
- [Visual tests](./visual-testing.md) for appearance
- [Accessibility tests](./accessibility-testing.md) for accessibility
- [Interaction tests](./interaction-testing.md) for user behavior simulation
- [Coverage tests](./test-coverage.md) for measuring code coverage
- [Snapshot tests](./snapshot-testing.md) for rendering errors and warnings
- [Import stories in other tests](./importing-stories-in-tests.md) for other tools
