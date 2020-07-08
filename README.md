# Storybook website

Storybook is the most popular UI component explorer! This is the website for https://storybook.js.org/.

**Note**: This is not the docs, those are located [here](https://github.com/storybooks/storybook/tree/next/docs).

## 🛠 Contributing

Contributions welcome! If it’s something small like grammar or punctuation, open up a pull request. If it’s a bigger change or new feature, add an issue for discussion.

**Workflow**

1. Feature idea or bugfix?
2. Build new UI or tweak existing UI in Storybook first
3. Integrate with Gatsby
4. Ensure tests pass in [Circle CI storybooks/frontpage](https://circleci.com/gh/storybooks/frontpage)
5. Ensure site works and is QAed via Netlify previews
6. Ensure no visual bugs in [Chromatic storybooks/frontpage](https://www.chromatic.com/builds?appId=5be26744d2f6250024a9117d)
7. Pull request

## Running the project locally

### 📕 Storybook instructions

The Storybook for Storybook contains every UI component. The UI is built following [Component-Driven Development](https://blog.hichroma.com/component-driven-development-ce1109d56c8e), a process that builds UIs from the “bottom up” starting with components and ending with screens. That means contributors should compose UIs in Storybook _before_ integration with the Gatsby app.

1. yarn install
2. yarn build
3. yarn run storybook

### Gatsby instructions

Gatsby is used for basic routing and static site generation.

1. yarn start

#### Docs content

You have two options for including docs content when developing the frontpage:

1. Pull the latest from the monorepo

Run `yarn extract-monorepo-docs $branch` which will copy the current docs content from `master` in the monorepo to `src/content`. `$branch` defaults to `master`.

Run this once before running `yarn start` (or any time you want to pull the latest).

2. Use an env var.

If you have the monorepo cloned, you can run `MONOREPO_PATH=path/to/monorepo yarn start` to use the files from there instead.

### Release notes

Release notes are stored in the src/content/releases directory as `.md` files. The name of the file corresponds with the version (major.minor) of the release and will be used to populate the link to the specific release from the releases page.

Within the release's `.md` file, frontmatter is used to create a page title, while the rest of the content is parsed using `gatsby-transformer-remark` and styled with selectors in `src/styles/formatting.js`.

## Tooling

This project uses these tools to make our job easier.

### 💫 Deploys by [Netlify](https://netlify.com)

Master and branches are automatically deployed by Netlify every commit.

### 🖼 Visual testing by [Chromatic](https://www.chromatic.com/library?appId=5be26744d2f6250024a9117d)

All stories in the Storybook are automatically visual tested on desktop and mobile each commit. Ensure all baselines are ✅ accepted before merging.

### 🚦 Continuous integration by [Circle CI](https://circleci.com/gh/storybookjs/frontpage)

Every build a test suite runs. Ensure there are no errors before merging.
