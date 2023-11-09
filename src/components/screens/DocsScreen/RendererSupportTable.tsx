import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import stylizeRenderer from '../../../util/stylize-renderer';
import { communityAddons } from '../../../util/community-addons';

export function rendererSupportsFeature(renderer, { supported, unsupported }) {
  return (
    (supported && supported.includes(renderer)) || (unsupported && !unsupported.includes(renderer))
  );
}

const monorepoUrlBase = 'https://github.com/storybookjs/storybook/tree/next';

export const RendererSupportTable = ({ currentRenderer, renderers, featureGroups }) => {
  function pathForFeature({ name, path, repoPath }) {
    if (path) {
      return `/docs/${currentRenderer}/${path}`;
    }
    if (repoPath) {
      return `${monorepoUrlBase}/${repoPath}`;
    }
    // Default is it is an addon (moved into the community or actively maintained)
    return communityAddons[name] || `${monorepoUrlBase}/code/addons/${name}`;
  }

  return (
    <table>
      <thead>
        <tr>
          <th aria-label="renderers" />
          {renderers.map((renderer) => (
            <th key={`renderer_${renderer}`}>
              <GatsbyLink to={`/docs/${renderer}`}>{stylizeRenderer(renderer)}</GatsbyLink>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {featureGroups.map(({ name: groupName, features }) => (
          <React.Fragment key={`group_${groupName}`}>
            <tr>
              <th colSpan={renderers.length + 1}>{groupName}</th>
            </tr>
            {features.map((feature) => (
              <tr key={`${groupName}_${feature.name}`}>
                <th>
                  <GatsbyLink to={pathForFeature(feature)}>{feature.name}</GatsbyLink>
                </th>
                {renderers.map((renderer) => (
                  <td key={`${groupName}-${renderer}-${feature.name}`}>
                    {rendererSupportsFeature(renderer, feature) ? '✅' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
