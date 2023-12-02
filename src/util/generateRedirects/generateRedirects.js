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
      const isLatestLocal = string === latestVersionString;
      const versionStringNormalized = string === 'next' ? nextVersionString : string;
      const versionStringOverride = isLatestLocal ? '' : string;
      const versionSlug = isLatestLocal ? '' : `/${string}`;
      const versionBranch = isLatestLocal ? '' : getReleaseBranchUrl(versionStringNormalized);
      const redirectCode = isLatestLocal ? 301 : 200;

      Object.entries(parsedRedirects).forEach(([redirectVersion, lines]) => {
        // Only add redirects that apply to this version
        if (Number(redirectVersion) <= version) {
          lines.forEach(([from, to, code]) => {
            // 7.6 removed the renderer from docs URLs
            if (version < 7.6) {
              renderers.forEach((r) => {
                acc.push(
                  // prettier-ignore
                  `${buildPathWithVersion(fromWithRenderer(from, r), versionStringOverride)} ${versionBranch}${buildPathWithVersion(to, versionStringOverride)} ${code}`
                );
              });
            } else if (Number(redirectVersion) >= 7.6) {
              acc.push(
                // prettier-ignore
                `${buildPathWithVersion(from, versionStringOverride)} ${versionBranch}${buildPathWithVersion(to, versionStringOverride)} ${code}`
              );
            }
          });
        }
      });

      acc.push(
        // prettier-ignore
        `/docs${versionSlug} ${versionBranch}${buildPathWithVersion(installDocsPageSlug, versionStringOverride)} ${redirectCode}`
      );

      renderers.forEach((r) => {
        acc.push(
          // prettier-ignore
          `/docs${versionSlug}/${r}/* ${versionBranch}/docs${versionSlug}/:splat ${redirectCode}`
        );
      });

      if (!isLatestLocal) {
        acc.push(`/docs/${string}/* ${versionBranch}/docs/${versionStringNormalized}/:splat 200`);
      } else {
        acc.push(`/docs/${string}/* /docs/:splat 301`);
      }

      return acc;
    }, [])
    .concat([`/releases /releases/${latestVersionString} 301`])
    .join('\n');
}

module.exports = {
  parseRawRedirects,
  generateRedirects,
};
