import React, { useEffect, useState } from 'react';
import { basename, parse } from 'path';
import { logSnippetInteraction } from '../../../util/custom-events';

const FALLBACK = 'fallback';

export function PureFeatureSnippets({ framework, snippetsByFramework }) {
  let Snippet = snippetsByFramework[framework];
  if (!Snippet) {
    Snippet = snippetsByFramework[FALLBACK];
    if (!Snippet) {
      // TODO: we should add a "to help enable this feature for <Framework />, do Y"
      return null;
    }
  }

  return <Snippet />;
}

export function FeatureSnippets({ currentFramework, paths }) {
  const snippetType = parse(paths[0]).dir;

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="aside" onClick={() => logSnippetInteraction(currentFramework, snippetType)}>
      <PureFeatureSnippets framework={currentFramework} snippetsByFramework={snippetsByFramework} />
    </div>
  );
}
