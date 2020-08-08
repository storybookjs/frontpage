import React from 'react';

export function frameworkSupportsFeature(framework, { supported, unsupported }) {
  return (
    (supported && supported.includes(framework)) ||
    (unsupported && !unsupported.includes(framework))
  );
}

const frameworkTitle = (framework) =>
  framework === 'html' ? 'HTML' : framework[0].toUpperCase() + framework.slice(1);

const monorepoUrlBase = 'https://github.com/storybookjs/storybook/tree/next';

export const FrameworkSupportTable = ({ currentFramework, frameworks, featureGroups }) => {
  function pathForFeature({ name, path, repoPath }) {
    if (path) {
      return `/docs/${currentFramework}/${path}`;
    }
    if (repoPath) {
      return `${monorepoUrlBase}/${repoPath}`;
    }
    // Default is it is an addon
    return `${monorepoUrlBase}/addons/${name}`;
  }

  return (
    <table>
      <thead>
        <tr>
          <th aria-label="frameworks" />
          {frameworks.map((framework) => (
            <th>
              <a href={`${monorepoUrlBase}/app/${framework}`}>{frameworkTitle(framework)}</a>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {featureGroups.map(({ name: groupName, features }) => (
          <>
            <tr>
              <th colSpan={features.length + 1}>{groupName}</th>
            </tr>
            {features.map((feature) => (
              <tr>
                <th>
                  <a href={pathForFeature(feature)}>{feature.name}</a>
                </th>
                {frameworks.map((framework) => (
                  <td>{frameworkSupportsFeature(framework, feature) ? '✅' : ''}</td>
                ))}
              </tr>
            ))}
          </>
        ))}
      </tbody>
    </table>
  );
};
