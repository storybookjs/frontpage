import React, { useEffect, useState } from 'react';
import { basename } from 'path';

const FALLBACK = 'fallback';
const INSTALL_PATH = 'get-started/installation-command-section';

function logInstall(framework) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'install_storybook', { framework });
  }
}

export function PureFeatureSnippets({ framework, snippetsByFramework, isInstallSnippet }) {
  let Snippet = snippetsByFramework[framework];
  if (!Snippet) {
    Snippet = snippetsByFramework[FALLBACK];
    if (!Snippet) {
      // TODO: we should add a "to help enable this feature for <Framework />, do Y"
      return null;
    }
  }

  return isInstallSnippet ? (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="aside" onClick={() => logInstall(framework)}>
      <Snippet />
    </div>
  ) : (
    <div className="aside">
      <Snippet />
    </div>
  );
}

export function FeatureSnippets({ currentFramework, paths }) {
  const isInstallSnippet = paths[0].includes(INSTALL_PATH);

  const [snippetsByFramework, setSnippetsByFramework] = useState({});
  useEffect(() => {
    const fetchSnippetsByFramework = async () => {
      const entries = await Promise.all(
        paths.map(async (path) => {
          // See comment in CodeSnippets
          const { default: ModuleComponent } = await import(`../../../content/docs/${path}`);

          const framework = basename(path, '.mdx');
          return [framework, ModuleComponent];
        })
      );

      setSnippetsByFramework(Object.fromEntries(entries));
    };
    fetchSnippetsByFramework();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PureFeatureSnippets
      framework={currentFramework}
      snippetsByFramework={snippetsByFramework}
      isInstallSnippet={isInstallSnippet}
    />
  );
}
