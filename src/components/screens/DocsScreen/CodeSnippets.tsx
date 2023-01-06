import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import {
  Badge,
  CodeSnippets as DesignSystemCodeSnippets,
  Link,
  styles,
} from '@storybook/design-system';

import { CODE_SNIPPET_CLASSNAME } from '../../../constants/code-snippets';
import stylizeFramework from '../../../util/stylize-framework';

const { color, spacing, typography } = styles;

const CSF2_TO_3_UPGRADE_GUIDE_PATH = 'api/csf#upgrading-from-csf-2-to-csf-3';

const StyledCodeSnippets = styled(DesignSystemCodeSnippets)`
  &:target {
    background: linear-gradient(
      90deg,
      ${rgba(color.secondary, 0.1)} 0%,
      ${rgba(color.secondary, 0.0)} 70%
    );
    margin: -${spacing.padding.small}px;
    padding: ${spacing.padding.small}px;
  }
`;

const CodeSnippetFramework = styled.span`
  text-transform: capitalize;
`;

const StyledBadge = styled(Badge)`
  margin-left: 5px;
  padding: 4px 7px;
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
      <StyledBadge status={isActive ? 'selected' : 'neutral'}>{prettifiedSyntax}</StyledBadge>
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
  return <StyledCodeSnippets className={CODE_SNIPPET_CLASSNAME} {...props} />;
}

const MessagingWrapper = styled.div<{ type?: 'missing' }>`
  background-color: ${(props) => (props.type === 'missing' ? '#fdf5d3' : color.blueLight)};
  padding: 10px 16px;
  border-bottom: 1px solid ${color.border};
  font-size: ${typography.size.s2}px;
  line-height: 20px;
`;

export function MissingMessage({ currentFramework }) {
  return (
    <MessagingWrapper type="missing">
      This snippet doesnt exist for {stylizeFramework(currentFramework)} yet.{' '}
      <Link
        href="https://github.com/storybookjs/storybook/tree/next/docs"
        target="_blank"
        rel="noopener"
      >
        Contribute it in a PR now
      </Link>
      . In the meantime, here’s the {stylizeFramework(DEFAULT_FRAMEWORK)} snippet.
    </MessagingWrapper>
  );
}

export function CsfMessage({
  csf2Path,
  currentFramework,
}: {
  csf2Path?: string;
  currentFramework: string;
}) {
  return (
    <MessagingWrapper>
      This example uses Component Story Format 3. Learn how to{' '}
      <Link
        href={`/docs/${currentFramework}/${CSF2_TO_3_UPGRADE_GUIDE_PATH}`}
        target="_blank"
        rel="noopener"
      >
        upgrade now
      </Link>
      {csf2Path ? (
        <>
          {' '}
          or view the old CSF2{' '}
          <Link href={`/docs/6.5/${currentFramework}/${csf2Path}`} target="_blank" rel="noopener">
            example
          </Link>
        </>
      ) : null}
      .
    </MessagingWrapper>
  );
}

function filterPathsByFramework(paths: string[], framework: string) {
  return paths.filter((path) => {
    const [pathFramework] = path.split('/');
    return pathFramework === framework;
  });
}

export function CodeSnippets({ csf2Path, currentFramework, paths: pathsProp, usesCsf3, ...rest }) {
  const [snippets, setSnippets] = React.useState([]);
  const pathsByLanguage = pathsProp.reduce((acc, path) => {
    const language = path.match(/\.((?:\w|-)+)\.mdx$/)?.[1];
    if (!language) {
      throw new Error(
        `Malformed CodeSnippets path, \`${path}\`. Paths must end with \`*.<language>.mdx\`, where \`<language>\` is \`js\`, \`ts\`, etc.`
      );
    }
    acc[language] = acc[language] || { paths: [] };
    acc[language].paths.push(path);
    return acc;
  }, {});

  Object.keys(pathsByLanguage).forEach((language) => {
    const { paths } = pathsByLanguage[language];

    let activeFrameworkPaths = filterPathsByFramework(paths, currentFramework);

    if (!activeFrameworkPaths.length) {
      activeFrameworkPaths = filterPathsByFramework(paths, COMMON);
    }

    let defaultFrameworkPaths;
    if (!activeFrameworkPaths.length) {
      defaultFrameworkPaths = filterPathsByFramework(paths, 'react');
    }

    pathsByLanguage[language].activeFrameworkPaths = activeFrameworkPaths;
    pathsByLanguage[language].defaultFrameworkPaths = defaultFrameworkPaths;
  });

  /**
   * For a path like `web-components/button-story-click-handler-args.js.mdx`,
   * capture the group `button-story-click-handler-args`
   */
  const id = `snippet-${pathsProp[0].match(/^(?:\w+-*)+\/((?:\w+-*)+)/)[1]}`;

  useEffect(() => {
    async function fetchModuleComponents() {
      let fetchedSnippets = [];
      Object.values(pathsByLanguage).forEach(
        async ({ activeFrameworkPaths, defaultFrameworkPaths }) => {
          const newFetchedSnippets = await Promise.all(
            (defaultFrameworkPaths || activeFrameworkPaths).map(async (path, index) => {
              const [framework, fileName] = path.split('/');
              // eslint-disable-next-line @typescript-eslint/naming-convention
              const [_, syntax] = fileName.split('.');
              // Important: this base path has to be present at the beginning of the import
              // (it cannot be a variable) because Webpack needs to know about it to make
              // sure that the MDX files are available to import.
              // See: https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
              const { default: ModuleComponent } = await import(
                `../../../content/docs/snippets/${path}`
              );

              let PreSnippet;
              if (defaultFrameworkPaths) {
                PreSnippet = () => <MissingMessage currentFramework={currentFramework} />;
              } else if (usesCsf3) {
                PreSnippet = () => (
                  <CsfMessage csf2Path={csf2Path} currentFramework={currentFramework} />
                );
              }

              return {
                id: `${framework}-${syntax}`,
                PreSnippet,
                Snippet: ModuleComponent,
                framework,
                syntax,
                renderTabLabel: ({ isActive }) => (
                  <TabLabel framework={framework} isActive={isActive} syntax={syntax} />
                ),
              };
            })
          );

          fetchedSnippets = [...fetchedSnippets, ...newFetchedSnippets];
          setSnippets(fetchedSnippets);
        }
      );
    }

    fetchModuleComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFramework]);

  if (!snippets.length) return null;

  return <PureCodeSnippets snippets={snippets} id={id} {...rest} />;
}

CodeSnippets.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  csf2Path: PropTypes.string,
  paths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  usesCsf3: PropTypes.bool,
};
