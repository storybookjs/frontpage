import * as React from 'react';

import { CODE_LANGUAGES_FULL } from '../../../../../constants/code-languages';
import stylizeRenderer from '../../../../../util/stylize-renderer';
import Link from '../../../GatsbyLink';
import { SnippetEyebrow } from './SnippetEybrows';

const CSF2_TO_3_UPGRADE_GUIDE_PATH = 'api/csf#upgrading-from-csf-2-to-csf-3';

export function MissingRenderer({ currentRenderer, defaultRenderer }) {
  return (
    <SnippetEyebrow variant="warning">
      This snippet doesn’t exist for {stylizeRenderer(currentRenderer)} yet.{' '}
      <Link
        href="https://storybook.js.org/docs/contribute/new-snippets"
        target="_blank"
        rel="noopener"
      >
        Contribute it in a PR now
      </Link>
      . In the meantime, here’s the {stylizeRenderer(defaultRenderer)} snippet.
    </SnippetEyebrow>
  );
}

export function MissingCodeLanguage({ currentCodeLanguage, fallbackLanguage = 'js' }) {
  return (
    <SnippetEyebrow variant="warning">
      This snippet doesn’t exist for {CODE_LANGUAGES_FULL[currentCodeLanguage]} yet.{' '}
      <Link
        href="https://storybook.js.org/docs/contribute/new-snippets"
        target="_blank"
        rel="noopener"
      >
        Contribute it in a PR now
      </Link>
      . In the meantime, here’s the {CODE_LANGUAGES_FULL[fallbackLanguage]} snippet.
    </SnippetEyebrow>
  );
}

export function CSF2Example({ csf2Path }) {
  return (
    <SnippetEyebrow variant="info">
      This example uses Component Story Format 3. Learn how to{' '}
      <Link href={`/docs/${CSF2_TO_3_UPGRADE_GUIDE_PATH}`} target="_blank" rel="noopener">
        upgrade now
      </Link>
      {csf2Path ? (
        <>
          {' '}
          or view the old CSF2{' '}
          <Link href={`/docs/6.5/${csf2Path}`} target="_blank" rel="noopener">
            example
          </Link>
        </>
      ) : null}
      .
    </SnippetEyebrow>
  );
}
