import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Badge, CodeSnippets as DesignSystemCodeSnippets, styles } from '@storybook/design-system';

const { color } = styles;

const CodeSnippetFramework = styled.span`
  text-transform: capitalize;
`;

const StyledBadge = styled(Badge)`
  margin-left: 5px;
  padding: 4px 7px;
  ${(props) =>
    props.isActive &&
    `
    color: ${color.secondary};
    background: #E3F3FF;
  `}
`;

const StyledDesignSystemCodeSnippets = styled(DesignSystemCodeSnippets)`
  padding-bottom: 1em;
`;

const syntaxNameMap = {
  'stories-of': 'StoriesOf()',
};

const prettifySyntax = (syntax) => {
  const mapItem = syntaxNameMap[syntax];
  if (mapItem) return mapItem;
  return syntax.toUpperCase();
};

const COMMON = 'common';

export function TabLabel({ isActive, framework, syntax }) {
  const isFrameworkSpecific = framework !== COMMON;
  const prettifiedSyntax = prettifySyntax(syntax);

  return isFrameworkSpecific ? (
    <>
      <CodeSnippetFramework>{framework}</CodeSnippetFramework>
      <StyledBadge isActive={isActive}>{prettifiedSyntax}</StyledBadge>
    </>
  ) : (
    <span>{prettifiedSyntax}</span>
  );
}

TabLabel.propTypes = {
  isActive: PropTypes.bool.isRequired,
  framework: PropTypes.string.isRequired,
  syntax: PropTypes.string.isRequired,
};

export function PureCodeSnippets(props) {
  return <StyledDesignSystemCodeSnippets {...props} />;
}

export function CodeSnippets({ paths, ...rest }) {
  const [snippets, setSnippets] = React.useState([]);
  const activeFrameworkPaths = paths.filter((path) => {
    const [framework] = path.split('/');
    // TODO: Get the currently active framework rather than hardcoding 'react'
    return framework === 'react' || framework === COMMON;
  });

  useEffect(() => {
    async function fetchModuleComponents() {
      const fetchedSnippets = await Promise.all(
        activeFrameworkPaths.map(async (path, index) => {
          const [framework, fileName] = path.split('/');
          const [_, syntax] = fileName.split('.');
          // Important: this base path has to be present at the beginning of the import
          // (it cannot be a variable) because Webpack needs to know about it to make
          // sure that the MDX files are available to import.
          // See: https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
          const { default: ModuleComponent } = await import(
            `../../../content/docs/snippets/${path}`
          );

          return {
            id: `${framework}-${syntax}`,
            Snippet: ModuleComponent,
            framework,
            syntax,
            renderTabLabel: ({ isActive }) => (
              <TabLabel framework={framework} isActive={isActive} syntax={syntax} />
            ),
          };
        })
      );
      setSnippets(fetchedSnippets);
    }

    fetchModuleComponents();
  }, []);

  if (!snippets.length) return null;

  return <PureCodeSnippets snippets={snippets} {...rest} />;
}

CodeSnippets.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
