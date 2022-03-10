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

1. `yarn start` to run the entire site

2. `yarn start:skip-addons` to skip building the addon catalog

#### Docs content

The content for the documentation section is in the `docs/` subdirectory of the Storybook monorepo: https://github.com/storybookjs/storybook/tree/next/docs.

To run this app while editing those files, checkout both this repository and the monorepo, and link them from this app:

```
yarn link-monorepo-docs path/to/monorepo
```

Alternatively, if you just want to serve the current content, run:

```
yarn extract-monorepo-docs $branch
```

### Release notes

Release notes are stored in the src/content/releases directory as `.md` files. The name of the file corresponds with the version (major.minor) of the release and will be used to populate the link to the specific release from the releases page.

Within the release's `.md` file, frontmatter is used to create a page title, while the rest of the content is parsed using `gatsby-transformer-remark` and styled with selectors in `src/styles/formatting.js`.

### Publishing new versions

[See detailed docs](docs/versioning.md)

### Environment variables

In development and with local production builds, environment variables can be configured with `.env` files as [explained here](https://www.gatsbyjs.com/docs/environment-variables/#client-side-javascript). Variables are prefixed with `GATSBY_` when that variable needs to be available in client-side code.

In deploy previews and production deploys, these variables are set with Netlify's build variables.

#### Search

Search within the docs is powered by [DocSearch](https://docsearch.algolia.com/). In order for this to work, an environment variable is required:

`GATSBY_ALGOLIA_API_KEY`

How to setup on your machine:

1. Create a .env.development file locally
2. Get the key here: https://app.netlify.com/sites/storybook-frontpage/settings/deploys#environment
3. Add `GATSBY_ALGOLIA_API_KEY=key` to the file from step 1

The site is crawled every 24 hours so any updates will be reflected in that amount of time.

#### Blog posts

The latest blog post is fetched from [Ghost](https://ghost.org). You will need to add In order for this to work, an environment variable is required:

`GHOST_STORYBOOK_API_KEY`

How to setup on your machine:

1. Create a .env.development file locally
2. Get the key here: https://storybookblog.ghost.io/ghost
3. Add `GHOST_STORYBOOK_API_KEY=key` to the file from step 1

## Tooling

This project uses these tools to make our job easier.

### 💫 Deploys by [Netlify](https://netlify.com)

Master and branches are automatically deployed by Netlify every commit.

### 🖼 Visual testing by [Chromatic](https://www.chromatic.com/library?appId=5be26744d2f6250024a9117d)

All stories in the Storybook are automatically visual tested on desktop and mobile each commit. Ensure all baselines are ✅ accepted before merging.

### 🚦 Continuous integration by [Circle CI](https://circleci.com/gh/storybookjs/frontpage)

Every build a test suite runs. Ensure there are no errors before merging.
