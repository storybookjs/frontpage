import * as React from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

type IfProps = {
  children: React.ReactNode;
  renderer?: string | string[];
  notRenderer?: string | string[];
  /** @private */
  allRenderers: string[];
  /** @private */
  currentRenderer: string;
};

const IfContext = React.createContext<{ renderer: string[] }>({
  renderer: [],
});

const IfContextProvider = IfContext.Provider;

export function useIfContext() {
  return React.useContext(IfContext);
}

const normalizeValue = (value: string | string[]) => (Array.isArray(value) ? value : [value]);

const validateValue = (value: string[], allValues: string[], type = 'renderer') => {
  const invalidValues = [];
  value.forEach((v) => {
    if (!allValues.includes(v)) invalidValues.push(v);
  });

  if (invalidValues.length > 0) {
    // prettier-ignore
    throw new Error(`
Invalid ${invalidValues.length === 1 ? 'value' : 'values'}, '${value.join('\' , \'')}', passed to \`${type}\` prop.
      
Available values: '${allValues.join('\' , \'')}'
`);
  }
};

export const If = ({ currentRenderer, notRenderer, renderer, allRenderers, children }: IfProps) => {
  const [toRender, setToRender] = React.useState(allRenderers);

  useIsomorphicLayoutEffect(() => {
    let renderers = allRenderers;
    if (notRenderer) {
      const renderersToExclude = normalizeValue(notRenderer);
      validateValue(renderersToExclude, allRenderers, 'notRenderer');
      renderers = renderers.filter((r) => !renderersToExclude.includes(r));
    }
    if (renderer) {
      const renderersToInclude = normalizeValue(renderer);
      validateValue(renderersToInclude, allRenderers, 'renderer');
      renderers = renderers.filter((r) => renderersToInclude.includes(r));
    }

    setToRender(renderers);
  }, [allRenderers, notRenderer, renderer]);

  return toRender.includes(currentRenderer) ? (
    <IfContextProvider value={{ renderer: toRender }}>{children}</IfContextProvider>
  ) : null;
};
