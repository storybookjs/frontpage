import React from 'react';
import { Menu } from '@storybook/components-marketing';
import { styled } from '@storybook/theming';
import {
  DEFAULT_CODE_LANGUAGE,
  CODE_LANGUAGES,
  CODE_LANGUAGES_FULL,
} from '../../../constants/code-languages';
import { LS_SELECTED_CODE_LANGUAGE_KEY } from '../../../constants/local-storage';
import { useLocalStorage } from '../../../hooks/use-local-storage';

type Language = keyof typeof CODE_LANGUAGES;

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
  const [language, setLanguage] = useLocalStorage<Language>(
    LS_SELECTED_CODE_LANGUAGE_KEY,
    DEFAULT_CODE_LANGUAGE
  );

  React.useLayoutEffect(() => {
    if (!Object.keys(CODE_LANGUAGES).includes(language)) {
      // Invalid language in localStorage
      setLanguage(DEFAULT_CODE_LANGUAGE);
    }
  }, [language, setLanguage]);

  const items = Object.entries(CODE_LANGUAGES_FULL).map(([key, label]) => ({
    label,
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

  return <Menu label={CODE_LANGUAGES[language]} items={items} primary />;
}
