# Docs versioning

This site is configured to build its doc pages from a variable version of the content in the [Storybook monorepo](https://github.com/storybookjs/storybook). This is mostly automated.

> In this document, assume "latest" is `6.3` and "next" is `6.4`.
>
> "monorepo release branch" = `main`, `next`, and `release-x-x` (starting with `release-6-0`).
> "frontpage release branch" = `master` and `release-x-x` (starting with `release-6-0`).

## Publishing new versions

When a pre-release ("next") version graduates to stable (and a new "next" version is cut):

_**First**, in the monorepo:_

> **Important**: After each of these steps, cancel any [Netlify deploys](https://app.netlify.com/sites/storybook-frontpage/deploys) that are kicked off.
>
> This is to avoid publishing any confusing states in the version selector.

1. Create a release branch from `main`.
   - `release-6-3`, in this document.
1. Follow the normal monorepo release process for `main` and `next` branches
1. Delete the previous "next" release branch
   - `release-6-4`, in this document
1. Make sure all release branches, including `main` and `next`, have an appropriate version in their root `package.json`.

_**Second**, in this repo:_

1. Make sure each release branch in the monorepo has a corresponding [release note](../README.md#release-notes), and that their contents are correct.
1. Add the version that _was_ "latest" to the [Netlify branch deploy setting](https://app.netlify.com/sites/storybook-frontpage/settings/deploys).
   - `release-6-3`, in this document.
1. Remove the version that _was_ "next" from the [Netlify branch deploy setting](https://app.netlify.com/sites/storybook-frontpage/settings/deploys)
   - `release-6-4`, in this document.
1. Push any updates to `master`
   - This kicks off a production deploy and a [workflow to deploy all release branches](#keeping-everything-in-sync).

🚨 **IMPORTANT** — Make sure all of the [Netlify builds](https://app.netlify.com/sites/storybook-frontpage/deploys) are successful, especially production.

> **If you make monorepo changes that require rebuilding all release branch deploys**
>
> _e.g. updating "next" from `6.4.0-beta.30` -> `6.4.0-rc.0` would change the version label rendered in the VersionSelector, which is available on all deploys_
>
> You can kick off the [`push-all-release-branches` workflow](../actions/workflows/push-all-release-branches.yml) manually (against `master`). ([More info](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow))

## How it works

1. Pushing to a monorepo release branch triggers a [workflow](https://github.com/storybookjs/storybook/tree/next/.github/workflows/handle-release-branches.yml):
   - On push to `main`
     - Use webhook to kick off production frontpage deploy
   - On push to `next`
     - Creates & force-pushes `release-6-4` branch
     - Sends [dispatch event](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#repository_dispatch) to this repo which kicks off a [workflow](../.github/workflows/respond-to-monorepo.yml) to create and force-push `release-6-4` branch
   - On push to `release-x-x`
     - If pushing to `release-6-4`
       - Warns that changes will be lost on next push to `next`
     - Else
       - Sends dispatch event to this repo which kicks off a workflow to create and force-push `release-x-x` branch
1. Pushing those `release-x-x` in this repo will kick off a [Netlify branch deploy](https://docs.netlify.com/site-deploys/overview/#branches-and-deploys) for the appropriate version.
1. When the docs content is extracted from the monorepo, each of the other version's info is extracted as well (for generating the list of available versions)
1. Based on the latest and current version info, the site adjusts the URLs and other details appropriately. ([See the PR for details](https://github.com/storybookjs/frontpage/pull/310).)
1. Using [Netlify proxy rewrites](https://docs.netlify.com/routing/redirects/rewrites-proxies/#proxy-to-another-netlify-site), the production site and branch deploys are stitched together to appear as a single site.

## Keeping everything in sync

Pushing to `master` in this repo kicks off a [workflow](../.github/workflows/push-all-release-branches.yml) which will create new release branches from `master` and push them, kicking off branch deploys for each.

- This ensures all branch deploys stay in-sync with any updates to production
- If you're pushing a change to `master` that does **not** need to make corresponding changes to the release branch deploys, you can [skip the workflow](https://docs.github.com/en/actions/managing-workflow-runs/skipping-workflow-runs).
