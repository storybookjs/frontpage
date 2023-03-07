import * as React from 'react';
import { navigate } from 'gatsby';
import { LS_SELECTED_FRAMEWORK_KEY } from '../constants/local-storage';
import { useLocalStorage } from '../hooks/use-local-storage';
import buildPathWithFramework from '../util/build-path-with-framework';

const siteMetadata = require('../../site-metadata');

const {
  coreFrameworks,
  communityFrameworks,
  defaultFramework,
  urls: { installDocsPageSlug },
} = siteMetadata;

const frameworks = [...coreFrameworks, ...communityFrameworks];

const DocsPage = () => {
  const [framework, setFramework] = useLocalStorage<typeof frameworks[number]>(
    LS_SELECTED_FRAMEWORK_KEY,
    defaultFramework
  );

  React.useLayoutEffect(() => {
    if (!framework || !frameworks.includes(framework)) {
      // Invalid framework in localStorage
      setFramework(defaultFramework);
    }
    const path = buildPathWithFramework(installDocsPageSlug, framework);
    navigate(path, { replace: true });
  }, [framework, setFramework]);

  // TODO: Render a "pure" DocsLayout to minimize flash between this route & redirect
  return null;
};

export default DocsPage;
