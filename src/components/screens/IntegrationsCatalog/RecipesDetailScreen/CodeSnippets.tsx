import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { styled } from '@storybook/theming';
import { CodeSnippets as DesignSystemCodeSnippets, styles } from '@storybook/design-system';

import { CODE_SNIPPET_CLASSNAME } from '../../../../constants/code-snippets';

const { color, spacing } = styles;

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

export function TabLabel({ name }) {
  return <span>{name}</span>;
}

TabLabel.propTypes = {
  name: PropTypes.string.isRequired,
};

export function PureCodeSnippets(props) {
  return <StyledCodeSnippets className={CODE_SNIPPET_CLASSNAME} {...props} />;
}

export function CodeSnippets({ paths, ...rest }) {
  const [snippets, setSnippets] = React.useState([]);

  /**
   * For a path like `web-components/button-story-click-handler-args.js.mdx`,
   * capture the group `button-story-click-handler-args`
   */
  const id = `snippet-${paths[0].match(/^(?:\w+-*)+\/((?:\w+-*)+)/)[1]}`;

  useEffect(() => {
    async function fetchModuleComponents() {
      const fetchedSnippets = await Promise.all(
        paths.map(async (path, index) => {
          const [recipe, framework, fileName] = path.split('/');
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const [_, syntax] = fileName.split('.');
          // Important: this base path has to be present at the beginning of the import
          // (it cannot be a variable) because Webpack needs to know about it to make
          // sure that the MDX files are available to import.
          // See: https://github.com/webpack/webpack/issues/6680#issuecomment-370800037
          const { default: ModuleComponent } = await import(
            `../../../../content/recipes/snippets/${path}`
          );

          return {
            id: `${recipe}-${fileName}`,
            Snippet: ModuleComponent,
            renderTabLabel: ({ isActive }) => <TabLabel name={fileName} />,
          };
        })
      );
      setSnippets(fetchedSnippets);
    }

    fetchModuleComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!snippets.length) return null;

  return <PureCodeSnippets snippets={snippets} id={id} {...rest} />;
}

CodeSnippets.propTypes = {
  currentFramework: PropTypes.string.isRequired,
  currentPath: PropTypes.string.isRequired,
  paths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
