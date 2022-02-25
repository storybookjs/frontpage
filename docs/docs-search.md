# Docs search

The searching of docs (and releases and marketing) pages is graciously powered by [Algolia's DocSearch program](https://docsearch.algolia.com/).

## Helpful links

_Credentials are in 1Password_

- **[Crawler](https://crawler.algolia.com/admin/crawlers/2ba095fc-df2f-48fa-868b-3b8840d1abcc/overview)**
  - [Editor](https://crawler.algolia.com/admin/crawlers/2ba095fc-df2f-48fa-868b-3b8840d1abcc/configuration/edit) is the most straightforward way to edit the config. You can easily test a given URL against your config changes.
  - [Monitoring](https://crawler.algolia.com/admin/crawlers/2ba095fc-df2f-48fa-868b-3b8840d1abcc/monitoring/summary) and [Data Analysis](https://crawler.algolia.com/admin/crawlers/2ba095fc-df2f-48fa-868b-3b8840d1abcc/data-analysis/index?name=storybook-js) are helpful tools for inspection.
- **[Index](https://www.algolia.com/apps/6L6UWBTLCK/explorer/browse/storybook-js)** - Inspect the index directly, in more detail
- **[API keys](https://www.algolia.com/account/api-keys/all?applicationId=6L6UWBTLCK)** - `Search API key` is set as `GATSBY_ALGOLIA_API_KEY` in the env

## How it works

- The crawler will only visits pages in sitemap defined in the config. Thus, at build time, we generate `sitemap-all.xml`, which includes all docs pages, for all versions and all frameworks. This is significantly more than `sitemap.xml` includes, which only includes the "latest" version and excludes all non-React pages, for SEO purposes. Because it needs to crawl pages that are no-indexed and non-canonical, it's important that those factors are ignored in the config.
- The search is "[faceted](https://docsearch.algolia.com/docs/DocSearch-v3#filtering-your-search)" on `version` and `framework`.
  - The current value of each is:
    1. Included in meta tags in the markup
    2. Passed to the DocsSearch component, to apply the filtering
  - The effect is that the search only works across the currently-viewed version and framework combination on the site
- The crawler is configured to run at 1am PST nightly.
- If the page layout markup changes, the crawler config will also need updated.
