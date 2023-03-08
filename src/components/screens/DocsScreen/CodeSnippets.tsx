import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { basename } from 'path';
import { styled } from '@storybook/theming';
import {
  Badge,
  CodeSnippets as DesignSystemCodeSnippets,
  Link,
  styles,
} from '@storybook/design-system';

import { CODE_SNIPPET_CLASSNAME } from '../../../constants/code-snippets';
import stylizeFramework from '../../../util/stylize-framework';
import { logSnippetInteraction } from '../../../util/custom-events';

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
  'ts-4-9': 'TS 4.9',
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
  background-color: ${(props) => (props.type === 'missing' ? '#fdf5d3' : color.bluelight)};
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

export const getResolvedPaths = (paths, currentFramework) => {
  const activeFrameworkPaths = paths.filter((path) => {
    const [framework] = path.split('/');
    return framework === currentFramework || framework === COMMON;
  });

  let defaultFrameworkPaths;
  if (!activeFrameworkPaths.length) {
    defaultFrameworkPaths = paths.filter((path) => path.split('/')[0] === 'react');
  }

  const resolvedPaths = (defaultFrameworkPaths || activeFrameworkPaths).flatMap((path) =>
    // add TS 4.9 snippets
    path.includes('.ts') ? [path, path.replace('.ts', '.ts-4-9')] : [path]
  );

  return [resolvedPaths, defaultFrameworkPaths];
};

export function CodeSnippets({ csf2Path, currentFramework, paths, usesCsf3, ...rest }) {
  const [snippets, setSnippets] = React.useState([]);

  const [resolvedPaths, defaultFrameworkPaths] = getResolvedPaths(paths, currentFramework);
  /**
   * For a path like `web-components/button-story-click-handler-args.js.mdx`,
   * capture the group `button-story-click-handler-args`
   */
  const id = `snippet-${paths[0].match(/^(?:\w+-*)+\/((?:\w+-*)+)/)[1]}`;

  useEffect(() => {
    async function fetchModuleComponents() {
      const fetchedSnippets = await Promise.all(
        resolvedPaths.map(async (path) => {
          const [framework, fileName] = path.split('/');
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const [_, syntax] = fileName.split('.');
          // Important: this base path has to be present at the beginning of the import
          // (it cannot be a variable) because Webpack needs to know about it to make
          // sure that the MDX files are available to import.
          // See: https://github.com/webpack/webpack/issues/6680#issuecomment-370800037

          let ModuleComponent;
          try {
            ModuleComponent = (await import(`../../../content/docs/snippets/${path}`)).default;
          } catch {
            // If path doesn't exist, don't show the snippet
            return null;
          }

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
      setSnippets(fetchedSnippets.filter((snippet) => snippet != null));
    }

    fetchModuleComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFramework]);

  if (!snippets.length) return null;

  const snippetType = basename(paths[0], '.mdx');

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => logSnippetInteraction(currentFramework, snippetType)}>
      <PureCodeSnippets snippets={snippets} id={id} {...rest} />
    </div>
  );
}

CodeSnippets.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  csf2Path: PropTypes.string,
  paths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  usesCsf3: PropTypes.bool,
};
