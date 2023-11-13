import * as React from 'react';

import { CODE_LANGUAGES_FULL } from '../../../constants/code-languages';
import { LanguageSelector } from '../../basics/LanguageSelector';
import { useDocsContext } from './DocsContext';

type CodeLanguageSelectorProps = Omit<
  React.ComponentProps<typeof LanguageSelector>,
  'items' | 'onChange' | 'value'
>;

type LanguageId = keyof typeof CODE_LANGUAGES_FULL;

// Workaround TypeScript's lack of support for Object.keys() types
const allLanguages = Object.entries(CODE_LANGUAGES_FULL) as [
  LanguageId,
  typeof CODE_LANGUAGES_FULL[LanguageId]
][];

export const CodeLanguageSelector = (props: CodeLanguageSelectorProps) => {
  const {
    codeLanguage: [language, setLanguage],
    renderer: [renderer],
  } = useDocsContext();

  let languages = allLanguages;

  if (renderer === 'angular') {
    // Angular snippets are not available in JS, so we hide the option
    languages = languages.filter(([key]) => key !== 'js');
  }

  if (languages.length < 2) {
    return null;
  }

  const languageItems = languages.map(([key, label]) => ({
    id: key,
    label,
  }));

  return (
    <LanguageSelector
      items={languageItems}
      onChange={(l) => {
        setLanguage(l as LanguageId);
      }}
      value={CODE_LANGUAGES_FULL[language]}
      {...props}
    />
  );
};
