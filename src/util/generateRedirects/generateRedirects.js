const siteMetadata = require('../../../site-metadata');
const buildPathWithVersion = require('../build-path-with-version');
const getReleaseBranchUrl = require('../get-release-branch-url');
const { versions: versionsData } = require('../versions');
const versionData = require('../version-data');

const {
  urls: { installDocsPageSlug },
  allRenderers,
} = siteMetadata;

function parseRawRedirects(rawRedirects) {
  const lines = rawRedirects.split('\n');
  const redirects = {};

  let currentVersion = null;
  let currentLines = [];

  lines.forEach((line) => {
    if (line.match(/^# \d+\.\d+$/)) {
      // Found a version line
      if (currentVersion !== null) {
        // Save the previous version's lines as an array
        redirects[currentVersion] = currentLines;
      }

      // Start a new version
      currentVersion = line.replace('# ', '').trim();
      currentLines = [];
    } else if (line.trim() !== '') {
      // Add non-empty lines to the current version's lines array
      currentLines.push(line.split(/\s+/));
    }
  });

  // Save the lines for the last version as an array
  if (currentVersion !== null) {
    redirects[currentVersion] = currentLines;
  }

  return redirects;
}

function fromWithRenderer(from, renderer) {
  const parts = from.split('/');
  parts.splice(2, 0, renderer);
  return parts.join('/');
}

function generateRedirects({
  latestVersionString = versionData.latestVersionString,
  nextVersionString = versionsData.preRelease[0]?.string || latestVersionString,
  rawRedirects,
  renderers = allRenderers,
  versions = [...versionsData.stable, ...versionsData.preRelease, { string: 'next' }],
}) {
  const parsedRedirects = parseRawRedirects(rawRedirects);

  return versions
    .reduce((acc, { string, version }) => {
      const includeRenderers = version < 7.6 || string === 'next';
      const isLatestLocal = string === latestVersionString;
      const versionSlug = isLatestLocal ? '' : `/${string}`;
      const versionStringNormalized = string === 'next' ? nextVersionString : string;
      const versionStringOverride = isLatestLocal ? '' : versionStringNormalized;
      const versionSlugOverride = isLatestLocal ? '' : `/${versionStringNormalized}`;
      const versionBranch = isLatestLocal ? '' : getReleaseBranchUrl(versionStringNormalized);
      const redirectCode = isLatestLocal ? 301 : 200;

      /**
       * TODO: This portion could be optimized to only include redirects when the source exists in
       *       the current version being iterated over. e.g. Right now, this will include redirects
       *       like:
       *
       *       /docs/8.0/workflows/testing-with-storybook/ https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/writing-tests/ 301
       *
       *       But the source path, `/workflows/testing-with-storybook/`, was removed well before
       *       8.0, so that source URL doesn't exist. There's no harm in including it, but it
       *       results in a lot of unnecessary redirects being generated.
       *
       *       The redirects are currently organized by _destination_ version, which was used to
       *       prevent generation of erroneous redirects like:
       *
       *       /docs/7.0/writing-stories/introduction https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-stories 301
       *
       *       That destination path, `/writing-stories`, doesn't exist until 7.6, so that would 404.
       *
       *       Such an optimization would require somehow organizing and/or annotating the redirects
       *       by source version (i.e. when that path was first introduced) _and_ destination
       *       version (i.e. when that path was first introduced).
       */
      Object.entries(parsedRedirects).forEach(([redirectVersion, lines]) => {
        const redirectsApply = redirectVersion <= version;
        lines.forEach(([from, to, code]) => {
          if (isLatestLocal) {
            acc.push(`${from} ${to} ${code}`);
          }
          if (redirectsApply) {
            acc.push(
              // prettier-ignore
              `${buildPathWithVersion(from, string)} ${versionBranch}${buildPathWithVersion(to, versionStringOverride)} ${code}`
            );
          }
          renderers.forEach((r) => {
            if (isLatestLocal) {
              acc.push(`${fromWithRenderer(from, r)} ${to} ${code}`);
            }
            if (redirectsApply && includeRenderers) {
              acc.push(
                // prettier-ignore
                `${buildPathWithVersion(fromWithRenderer(from, r), string)} ${versionBranch}${buildPathWithVersion(to, versionStringOverride)} ${code}`
              );
            }
          });
        });
      });

      acc.push('\n');

      acc.push(
        // prettier-ignore
        `/docs${versionSlug} ${versionBranch}${buildPathWithVersion(installDocsPageSlug, versionStringOverride)} ${redirectCode}`
      );

      if (includeRenderers) {
        renderers.forEach((r) => {
          if (isLatestLocal) {
            acc.push(`/docs/${r}/* /docs/:splat ${redirectCode}`);
          }
          acc.push(
            // prettier-ignore
            `/docs/${string}/${r}/* ${versionBranch}/docs${versionSlugOverride}/:splat ${redirectCode}`
          );
        });
      }

      acc.push(
        `/docs/${string}/* ${versionBranch}/docs${versionSlugOverride}/:splat ${redirectCode}`
      );

      acc.push('\n');

      return acc;
    }, [])
    .concat([`/releases /releases/${latestVersionString} 301`])
    .join('\n');
}

module.exports = {
  parseRawRedirects,
  generateRedirects,
};
