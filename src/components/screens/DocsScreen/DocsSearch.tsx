/* eslint-disable react/require-default-props */
import React from 'react';
import { controlOrMetaKey, shortcutToHumanString } from '@storybook/api/shortcut';
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

const Wrapper = styled.div`
  position: relative;
`;

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

const keyStyles = css`
  align-items: center;
  background: rgba(0, 0, 0, 0.07);
  border-radius: 2px;
  box-shadow: none;
  color: ${styles.color.darker};
  display: inline-flex;
  font-family: inherit;
  font-size: 11px;
  height: 16px;
  justify-content: center;
  line-height: 17px;
  margin-right: 2px;
  min-width: 16px;
  padding: 0 2px;
  user-select: none;
  width: auto;
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
    padding: 10px 60px 10px 14px;
    width: 100%;

    &:focus,
    &:focus:hover {
      ${idleButtonStyles}
      box-shadow: ${styles.color.secondary} 0 0 0 1px inset;
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

  .DocSearch-Button-Keys {
    display: none;
  }

  .DocSearch-Commands-Key {
    ${keyStyles}
  }

  .DocSearch-Label {
    margin-left: 2px;
  }
`;
const DocSearchStyles = () => <Global styles={docSearchStyles} />;

const Keys = styled.div`
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-13px);
`;

const Key = styled.kbd`
  ${keyStyles}
`;

const Shortcut: React.FC<{ keys: string[] }> = ({ keys }) => (
  <Keys>
    {keys.map((key, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Key key={index}>{shortcutToHumanString([key])}</Key>
    ))}
  </Keys>
);

const label = 'Search docs';

export function DocsSearch({ framework, version, visible }: DocsSearchProps) {
  const { algoliaDocSearchConfig } = useSiteMetadata();

  return (
    <>
      <GlobalStyle />
      <DocSearchStyles />
      {ALGOLIA_API_KEY || visible ? (
        <Wrapper>
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
          <Shortcut keys={[controlOrMetaKey(), 'K']} />
        </Wrapper>
      ) : (
        <>
          {/* Placeholder to preserve styling given the input is missing. */}
          <div style={{ flex: 'none', marginRight: 0 }} />
        </>
      )}
    </>
  );
}
