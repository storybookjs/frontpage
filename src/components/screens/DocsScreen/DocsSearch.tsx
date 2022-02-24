/* eslint-disable react/require-default-props */
import React from 'react';
import { css, Global, styled } from '@storybook/theming';
import { global, styles } from '@storybook/design-system';
import { DocSearch } from '@docsearch/react';
import useSiteMetadata from '../../lib/useSiteMetadata';
import '@docsearch/css';

const { GlobalStyle } = global;

const ALGOLIA_API_KEY = process.env.GATSBY_ALGOLIA_API_KEY;

interface DocsSearchProps {
  framework: string;
  version: number;
  /** Only used for Storybook */
  visible?: boolean;
}

export const classNames = {
  BUTTON: '.DocSearch-Button',
  ICON: '.DocSearch-Button .DocSearch-Search-Icon',
  PLACEHOLDER: '.DocSearch-Button-Placeholder',
};

const idleButtonStyles = css`
  background: ${styles.color.lightest};
  box-shadow: ${styles.color.border} 0 0 0 1px inset;
  color: ${styles.color.mediumdark};
`;

// Designed to match Input from @storybook/design-system
const docSearchStyles = css`
  :root {
    --docsearch-primary-color: ${styles.color.secondary};
    --docsearch-muted-color: ${styles.color.dark};
  }
  
  ${classNames.BUTTON} {
    ${idleButtonStyles}
    font-size: ${styles.typography.size.s2}px;
    line-height: 16px;
    margin: 0;
    padding: 10px 0 10px 14px;

    &:focus,
    &:focus:hover {
      ${idleButtonStyles}
    }

    &:hover {
      ${idleButtonStyles}
    }
  }

  ${classNames.ICON} {
    color: currentColor;
    height: 1em;
    margin-right: 8px;
    width: 1em;
  }

  ${classNames.PLACEHOLDER} {
    font-size: 1em;
    padding: 0;
  }

  .DocSearch-Button-Key,
  .DocSearch-Commands-Key {
    background: rgba(0,0,0,0.07);
    border-radius: 2px;
    box-shadow: none;
    color: ${styles.color.darker};
    font-size: 11px;
    height: 16px;
    line-height: 17px;
    margin-right: 2px;
    min-width: 16px;
    padding: 0 2px;
    user-select: none;
    width: auto;
  }

  .DocSearch-Label {
    margin-left: 2px;
  }
`;
const DocSearchStyles = () => <Global styles={docSearchStyles} />;

const label = 'Search docs';

export function DocsSearch({ framework, version, visible }: DocsSearchProps) {
  const { algoliaDocSearchConfig } = useSiteMetadata();

  return (
    <>
      <GlobalStyle />
      <DocSearchStyles />
      {ALGOLIA_API_KEY || visible ? (
        <DocSearch
          apiKey={ALGOLIA_API_KEY}
          {...algoliaDocSearchConfig}
          placeholder={label}
          searchParameters={{
            // prettier-ignore
            facetFilters: [
              'tags:docs',
              `framework:${framework}`,
              `version:${version}`
            ]
          }}
          translations={{
            button: {
              buttonAriaLabel: label,
              buttonText: label,
            },
          }}
        />
      ) : (
        <>
          {/* Placeholder to preserve styling given the input is missing. */}
          <div style={{ flex: 'none', marginRight: 0 }} />
        </>
      )}
    </>
  );
}
