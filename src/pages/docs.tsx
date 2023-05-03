import * as React from 'react';
import { navigate } from 'gatsby';
import { useLocalStorage } from 'usehooks-ts';
import { PureDocsLayout } from '../components/layout/DocsLayout';
import { LS_SELECTED_FRAMEWORK_KEY } from '../components/screens/DocsScreen/DocsContext';
import buildPathWithFramework from '../util/build-path-with-framework';

const siteMetadata = require('../../site-metadata');

const {
  defaultFramework,
  urls: { installDocsPageSlug },
} = siteMetadata;

const DocsPage = () => {
  const [framework] = useLocalStorage(LS_SELECTED_FRAMEWORK_KEY, defaultFramework);

  if (typeof window !== 'undefined') {
    // TODO: Make this work with all /docs pages that don't include a framework?
    const path = buildPathWithFramework(installDocsPageSlug, framework);
    navigate(path, { replace: true });
  }

  return <PureDocsLayout isLoading framework={framework} slug={installDocsPageSlug} />;
};

export default DocsPage;
