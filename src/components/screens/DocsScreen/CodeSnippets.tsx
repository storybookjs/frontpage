import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@storybook/theming';

import {
  Badge,
  CodeSnippets as DesignSystemCodeSnippets,
  Link,
  styles,
} from '@storybook/design-system';

import { CODE_SNIPPET_CLASSNAME } from '../../../constants/code-snippets';
import stylizeFramework from '../../../util/stylize-framework';

const { color, typography } = styles;

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

const syntaxNameMap = {
  'stories-of': 'StoriesOf()',
};

const prettifySyntax = (syntax) => {
  const mapItem = syntaxNameMap[syntax];
  if (mapItem) return mapItem;
  return syntax.toUpperCase();
};

const COMMON = 'common';
const DEFAULT_FRAMEWORK = 'react';

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
  return <DesignSystemCodeSnippets className={CODE_SNIPPET_CLASSNAME} {...props} />;
}

const MissingMessagingWrapper = styled.div`
  background-color: #fdf5d3;
  padding: 10px 16px;
  border-bottom: 1px solid ${color.border};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
`;

export function MissingMessage({ currentFramework }) {
  return (
    <MissingMessagingWrapper>
      This snippet doesnt exist for {stylizeFramework(currentFramework)} yet.{' '}
      <Link
        appearance="secondary"
        href="https://github.com/storybookjs/storybook/tree/next/docs"
        target="_blank"
        rel="noopener"
      >
        Contribute it in a PR now
      </Link>
      . In the meantime, here’s the {stylizeFramework(DEFAULT_FRAMEWORK)} snippet.
    </MissingMessagingWrapper>
  );
}

export function CodeSnippets({ paths, currentFramework, ...rest }) {
  const [snippets, setSnippets] = React.useState([]);
  const activeFrameworkPaths = paths.filter((path) => {
    const [framework] = path.split('/');
    return framework === currentFramework || framework === COMMON;
  });

  let defaultFrameworkPaths;
  if (!activeFrameworkPaths.length) {
    defaultFrameworkPaths = paths.filter((path) => path.split('/')[0] === 'react');
  }

  useEffect(() => {
    async function fetchModuleComponents() {
      const fetchedSnippets = await Promise.all(
        (defaultFrameworkPaths || activeFrameworkPaths).map(async (path, index) => {
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
            PreSnippet: defaultFrameworkPaths
              ? () => <MissingMessage currentFramework={currentFramework} />
              : undefined,
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
  }, [currentFramework]);

  if (!snippets.length) return null;

  return <PureCodeSnippets snippets={snippets} {...rest} />;
}

CodeSnippets.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentFramework: PropTypes.string.isRequired,
};
