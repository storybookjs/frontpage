import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import stylizeFramework from '../../../util/stylize-framework';
import { communityAddons } from '../../../util/community-addons';

export function frameworkSupportsFeature(framework, { supported, unsupported }) {
  return (
    (supported && supported.includes(framework)) ||
    (unsupported && !unsupported.includes(framework))
  );
}

const monorepoUrlBase = 'https://github.com/storybookjs/storybook/tree/next';

export const FrameworkSupportTable = ({ currentFramework, frameworks, featureGroups }) => {
  function pathForFeature({ name, path, repoPath }) {
    if (path) {
      return `/docs/${currentFramework}/${path}`;
    }
    if (repoPath) {
      return `${monorepoUrlBase}/${repoPath}`;
    }
    // Default is it is an addon (moved into the community or actively maintained)
    return communityAddons[name] || `${monorepoUrlBase}/addons/${name}`;
  }

  return (
    <table>
      <thead>
        <tr>
          <th aria-label="frameworks" />
          {frameworks.map((framework) => (
            <th key={framework}>
              <GatsbyLink to={`/docs/${framework}`}>{stylizeFramework(framework)}</GatsbyLink>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {featureGroups.map(({ name: groupName, features }) => (
          <>
            <tr>
              <th colSpan={frameworks.length + 1}>{groupName}</th>
            </tr>
            {features.map((feature) => (
              <tr key={feature.name}>
                <th>
                  <GatsbyLink to={pathForFeature(feature)}>{feature.name}</GatsbyLink>
                </th>
                {frameworks.map((framework) => (
                  <td key={`${framework}-${feature.name}`}>
                    {frameworkSupportsFeature(framework, feature) ? '✅' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};
