import React, { createElement, Fragment, CSSProperties } from 'react';
import { SyntaxHighlighter } from '@storybook/components';

type HastNode = HastElementNode & HastRootNode & HastTextNode;
interface HastElementNode {
  type: 'element';
  tagName: string;
  properties: Record<string, any>;
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

function toCamelCase(string: string) {
  const intermediary = string
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, match => match.charAt(match.length - 1).toUpperCase());
  return intermediary.charAt(0).toLowerCase() + intermediary.substring(1);
}

const getLanguage = (code, languageClass) => {
  // detect jsx
  if (code.includes('react') || code.match(/<[A-Z][^>]*>/)) {
    return 'jsx';
  }

  return languageClass.replace('language-', '').replace('js', 'jsx');
};

const getProps = (
  properties: Record<string, any>
): { style?: CSSProperties; className?: string[] } & { [key: string]: string } => {
  if (!properties) {
    return {};
  }
  const { style: styleString, ...rest } = properties;

  if (styleString) {
    const after = convertStringToCssProperties(styleString);
    rest.style = after;
  }
  return rest;
};

const convertStringToCssProperties = (string: string): CSSProperties => {
  return string.split(';').reduce((acc, item) => {
    const [property, value] = item.split(':');
    if (property && value) {
      acc[toCamelCase(property.trim())] = value.trim();
    }
    return acc;
  }, {});
};

export const hastToJsx = (node: HastNode): JSX.Element | string | null => {
  if (!node) {
    return null;
  }
  const props = getProps(node.properties);

  switch (true) {
    case node.type === 'root': {
      return <Fragment key="root">{node.children.map(hastToJsx)}</Fragment>;
    }
    case node.type === 'text': {
      return node.value;
    }
    case node.type === 'element' && node.tagName === 'hr':
    case node.type === 'element' && node.tagName === 'link':
    case node.type === 'element' && node.tagName === 'br': {
      return createElement(node.tagName, props);
    }
    case node.type === 'element' && node.tagName === 'input': {
      return null;
    }
    case node.type === 'element' && node.tagName === 'img': {
      if (props.src && props.src.match(/^\..*\.gif$/)) {
        // gatsby doesn't support gifs yet, so this is a hack to map local gifs to the static dir
        const { length, ...rest } = props.src.split('/');
        props.src = `/gifs/${rest[length - 1]}`;
      }
      return createElement(node.tagName, props);
    }
    case node.type === 'element' && node.tagName === 'code': {
      if (node.properties && node.properties.className) {
        const {
          className: [languageClass],
          ...rest
        } = props;

        const code = node.children.map(hastToJsx).join('');
        const language = getLanguage(code, languageClass);

        return (
          <SyntaxHighlighter format={false} language={language} {...rest}>
            {code}
          </SyntaxHighlighter>
        );
      }
      return createElement(node.tagName, props, node.children.map(hastToJsx));
    }
    case node.type === 'element' && typeof node.tagName === 'string': {
      return createElement(node.tagName, props, node.children.map(hastToJsx));
    }
    default: {
      return null;
    }
  }
};
