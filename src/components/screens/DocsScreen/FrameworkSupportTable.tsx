import React from 'react';

export function frameworkSupportsFeature(framework, { supported, unsupported }) {
  return (
    (supported && supported.includes(framework)) ||
    (unsupported && !unsupported.includes(framework))
  );
}

const frameworkTitle = (framework) =>
  framework === 'html' ? 'HTML' : framework[0].toUpperCase() + framework.slice(1);

export const FrameworkSupportTable = ({ currentFramework, frameworks, features }) => {
  return (
    <table>
      <thead>
        <tr>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th />
          {frameworks.map((framework) => (
            <th>
              {/* TODO: this should be a link */}
              {frameworkTitle(framework)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {features.map(({ name, path, supported, unsupported }) => (
          <tr>
            <th>
              <a href={`/docs/${currentFramework}${path}`}>{name}</a>
            </th>
            {frameworks.map((framework) => (
              <td>{frameworkSupportsFeature(framework, { supported, unsupported }) ? '✅' : ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
