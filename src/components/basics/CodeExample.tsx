import React, { FC } from 'react';
import { styled } from '@storybook/theming';
import { Highlight } from '@storybook/design-system';
import { styles } from '@storybook/components-marketing';

const { typography, color, breakpoints } = styles;

const StyledHighlight = styled(Highlight)`
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  min-height: 0;

  && {
    code[class*='language-'],
    pre[class*='language-'] {
      color: #ccc;
      font-family: ${typography.type.code};
      background: none;
      font-size: 1em;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;

      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;

      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
    }

    /* Code blocks */
    pre[class*='language-'] {
      padding: 8px;
      margin: 0;
      overflow: auto;
      width: 100%;
      height: 100%;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    @media (min-width: ${breakpoints[1]}px) {
      pre[class*='language-'] {
        padding: 15px;
      }
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: #232a35;
    }

    /* Inline code */
    :not(pre) > code[class*='language-'] {
      padding: 0.1em;
      border-radius: 0.3em;
      white-space: normal;
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #999;
    }

    .token.punctuation {
      color: #ccc;
    }

    .token.tag,
    .token.attr-name,
    .token.namespace,
    .token.deleted {
      color: #e2777a;
    }

    .token.function-name {
      color: #6196cc;
    }

    .token.boolean,
    .token.number,
    .token.function {
      color: #f08d49;
    }

    .token.property,
    .token.class-name,
    .token.constant,
    .token.symbol {
      color: #f8c555;
    }

    .token.selector,
    .token.important,
    .token.atrule,
    .token.keyword,
    .token.builtin {
      color: #cc99cd;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable {
      color: #7ec699;
    }

    .token.operator,
    .token.entity,
    .token.url {
      color: #67cdcc;
    }

    .token.operator {
      background: transparent;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.inserted {
      color: green;
    }
  }
`;

const CodePane = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.1), 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
`;
const ToolBar = styled.div`
  flex: none;
  position: relative;
  background: #1d1f24;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 11px 12px;
  display: flex;
  gap: 8px;
`;
const FileName = styled.div`
  color: ${color.mediumdark};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  font-family: ${typography.type.code};
  font-size: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${breakpoints[1]}px) {
    font-size: ${typography.size.s1}px;
  }
`;

const controlColors = {
  close: '#fc521f',
  minimize: '#ffae00',
  maximize: '#66bf3c',
};
const Control = styled.div<{ type: 'close' | 'minimize' | 'maximize' }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => controlColors[props.type]};
`;

interface CodeExampleProps {
  fileName?: string;
  language:
    | 'mdx'
    | 'bash'
    | 'javascript'
    | 'typescript'
    | 'json'
    | 'css'
    | 'yaml'
    | 'markdown'
    | 'md'
    | 'jsx'
    | 'tsx';
}

export const CodeExample: FC<CodeExampleProps> = ({ language, fileName, children, ...props }) => (
  <CodePane {...props}>
    <ToolBar>
      <Control type="close" />
      <Control type="minimize" />
      <Control type="maximize" />
      {fileName && <FileName>{fileName}</FileName>}
    </ToolBar>
    <StyledHighlight key={fileName} language={language}>
      {children}
    </StyledHighlight>
  </CodePane>
);
