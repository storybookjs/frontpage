import React, { createElement, Fragment } from 'react';
import { SyntaxHighlighter } from '@storybook/components';

type HastNode = HastElementNode & HastRootNode & HastTextNode;
interface HastElementNode {
  type: 'element';
  tagName: string;
  properties: Record<string, string>;
  children?: HastNode[];
}
interface HastTextNode {
  type: 'text';
  value: string;
}
interface HastRootNode {
  type: 'root';
  children: HastNode[];
}

const getLanguage = (code, languageClass) => {
  // detect jsx
  if (code.includes('react') || code.match(/<[A-Z][^>]*>/)) {
    return 'jsx';
  }

  return languageClass.replace('language-', '').replace('js', 'jsx');
};

export const hastToJsx = (node: HastNode): JSX.Element | string | null => {
  if (!node) {
    return null;
  }

  switch (true) {
    case node.type === 'root': {
      return <Fragment key="root">{node.children.map(hastToJsx)}</Fragment>;
    }
    case node.type === 'text': {
      return node.value;
    }
    case node.type === 'element' && node.tagName === 'hr':
    case node.type === 'element' && node.tagName === 'img':
    case node.type === 'element' && node.tagName === 'link':
    case node.type === 'element' && node.tagName === 'br': {
      return createElement(node.tagName, node.properties);
    }
    case node.type === 'element' && node.tagName === 'code': {
      if (node.properties && node.properties.className) {
        const {
          className: [languageClass],
          ...props
        } = node.properties;

        const code = node.children.map(hastToJsx).join('');
        const language = getLanguage(code, languageClass);

        return (
          <SyntaxHighlighter format={false} language={language} {...props}>
            {code}
          </SyntaxHighlighter>
        );
      }
      return createElement(node.tagName, node.properties, node.children.map(hastToJsx));
    }
    case node.type === 'element' && typeof node.tagName === 'string': {
      return createElement(node.tagName, node.properties, node.children.map(hastToJsx));
    }
    default: {
      return null;
    }
  }
};
