import * as React from 'react';

type IfRendererProps = {
  children: React.ReactNode;
  /** @private */
  currentRenderer: string;
  renderer: string | string[];
};

export const IfRenderer = ({ currentRenderer, renderer, children }: IfRendererProps) => {
  const renderers = Array.isArray(renderer) ? renderer : [renderer];
  return renderers.includes(currentRenderer) ? <>{children}</> : null;
};
