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

3. `BRANCH=next yarn start` to run the site with docs associated with a specific branch
   - Also work with `yarn build`

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

#### Publishing docs for a new release

When a new major or minor version of the monorepo is published, follow these steps to build new versioned docs.

_If the "latest" was `6.3` and is now `6.4`, and "next" is now `6.5`_

1. Make sure there's an appropriate release branch (`release-6-3`) on the monorepo
1. Add that branch to [Netlify's branch deploy settings](https://app.netlify.com/sites/storybook-frontpage/settings/deploys#branches)

1. **On `master`**

   1. Update `latestVersion` to `6.4` in `/site-metadata.js`
   1. Create a `6.5.md` file in the `src/content/releases` directory
   1. Update `6.4.md` in that directory to remove `prerelease: true`
   1. Do not push yet
   1. Create a `release-6-3` branch

1. **On `next` and all other `release-*-*` branches**

   1. Rebase onto `master`

1. **Push updates**

   Do this last and in this order to help ensure mis-matched docs are short-lived on the published site

   1. `release-6-3`
   1. All other `release-*-*` branches
   1. `next`
   1. `master`

### Search

Search within the docs is powered by [DocSearch](https://docsearch.algolia.com/). In order for this to work, an environment variable is required:

`GATSBY_ALGOLIA_API_KEY`

In development and with local production builds, that environment variable can be configured with `.env` files as explaned [here](https://www.gatsbyjs.com/docs/environment-variables/#client-side-javascript). The `GATSBY_` prefix ensures that the variable is available in client-side code.

How to setup on your machine:

1. Create a .env.development file locally
2. Get the key here: https://app.netlify.com/sites/storybook-frontpage/settings/deploys#environment
3. Add `GATSBY_ALGOLIA_API_KEY=key` to the file from step 1

In deploy previews and production deploys, that variable is set with Netlify's build variables.

The site is crawled every 24 hours so any updates will be reflected in that amount of time.

## Tooling

This project uses these tools to make our job easier.

### 💫 Deploys by [Netlify](https://netlify.com)

Master and branches are automatically deployed by Netlify every commit.

### 🖼 Visual testing by [Chromatic](https://www.chromatic.com/library?appId=5be26744d2f6250024a9117d)

All stories in the Storybook are automatically visual tested on desktop and mobile each commit. Ensure all baselines are ✅ accepted before merging.

### 🚦 Continuous integration by [Circle CI](https://circleci.com/gh/storybookjs/frontpage)

Every build a test suite runs. Ensure there are no errors before merging.
