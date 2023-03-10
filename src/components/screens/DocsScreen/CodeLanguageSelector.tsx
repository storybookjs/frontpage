import React from 'react';
import { Menu } from '@storybook/components-marketing';
import { styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { CODE_LANGUAGES, CODE_LANGUAGES_FULL } from '../../../constants/code-languages';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { useDocsContext } from './DocsContext';

const { breakpoint } = styles;

const MenuButton = styled.button`
  appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
`;

type LinkWrapperProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function CodeLanguageSelector() {
  const {
    codeLanguage: [language, setLanguage],
  } = useDocsContext();

  const [wide] = useMediaQuery(`(min-width: ${breakpoint * 1.5}px)`);
  const label = wide ? CODE_LANGUAGES_FULL[language] : CODE_LANGUAGES[language];

  const items = Object.entries(CODE_LANGUAGES_FULL).map(([key, itemLabel]) => ({
    label: itemLabel,
    link: {
      linkWrapper: React.forwardRef<HTMLButtonElement, LinkWrapperProps>(
        ({ onClick, ...props }, ref) => {
          return (
            <MenuButton
              onClick={(event) => {
                setLanguage(key as keyof typeof CODE_LANGUAGES); // Workaround for Object.entries() lack of types
                onClick?.(event);
              }}
              ref={ref}
              {...props}
            />
          );
        }
      ),
      url: 'UNUSED', // We render a `button` instead of an `a`, but the types of Menu require this
    },
  }));

  return <Menu label={label} items={items} primary />;
}
