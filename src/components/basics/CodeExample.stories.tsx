import React from 'react';
import { styled } from '@storybook/theming';
import { CodeExample as CodeExampleComponent } from './CodeExample';

export default {
  title: 'Basics/CodeExample',
  component: CodeExampleComponent,
};

const StyledCodeExample = styled(CodeExampleComponent)`
  width: 800px;
  height: 600px;
  margin: 20px;
`;

const codeSnippet = `import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { composeStories } from '@storybook/testing-react';
import * as stories from './UserCard.stories';

// Compile the "MissingProfileImage" story
const { MissingProfileImage } = composeStories(stories);

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders a fallback profile image', () => {
  // Render the story
  act(() => {
    render(<MissingProfileImage />, container);
  });

  // Verify the DOM structure
  expect(container.querySelector('img').getAttribute('src')).toEqual(
    '/images/user-fallback.png'
  );
});`;

export const CodeExample = () => (
  <StyledCodeExample language="jsx" fileName="UserCard.test.js">
    {codeSnippet}
  </StyledCodeExample>
);
CodeExample.storyName = 'CodeExample';
CodeExample.parameters = {
  backgrounds: { default: 'dark' },
};
