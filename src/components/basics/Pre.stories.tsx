import React from 'react';
import { styled } from '@storybook/theming';

import { Pre } from './Pre';
import { CODE_SNIPPET_CLASSNAME } from '../../constants/code-snippets';

const Wrapper = styled.div`
  padding: 10px;
`;

export default {
  title: 'Frontpage|basics/Pre',
  component: Pre,
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>],
};

const jsCode = `// Highlight JavaScript:
import React from 'react'

const MyComponent = () => (
  &#x3C;div>My component renders all the things&#x3C;/div>
)

export default MyComponent
`;

export const Base = () => (
  <Pre>
    <code className="language-js">{jsCode}</code>
  </Pre>
);

export const Nested = () => (
  <div className={CODE_SNIPPET_CLASSNAME}>
    <Pre>
      <code className="language-js">{jsCode}</code>
    </Pre>
  </div>
);
