export const jest = `import React from 'react';
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
    render(&lt;MissingProfileImage /&gt;, container);
  });

  // Verify the DOM structure
  expect(container.querySelector('img').getAttribute('src'))
    .toEqual(
      '/images/user-fallback.png'
    );
});`;

export const testingLibrary = `import { screen, render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import { drag } from './test-utils';
import * as stories from './RangePicker.stories';

// Compile the "DefaultTimeFrame" story
const { DefaultTimeFrame } = composeStories(stories);

it('can adjust time range using sliders', async () => {
  // Render the story
  render(&lt;DefaultTimeFrame /&gt;);

  // Execute the drag action
  const [
    leftThumb,
    rightThumb,
  ] = await screen.findAllByRole('slider');

  await drag(leftThumb, { delta: { x: -40, y: 0 } });
  await drag(rightThumb, { delta: { x: 60, y: 0 } });

  // Verify the time range is updated
  expect(leftThumb.ariaValueNow).toBe(15);
  expect(rightThumb.ariaValueNow).toBe(90);
});
`;

export const cypress = `import * as React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './SearchInput.stories';

// Compile the "Primary" story
const { Primary } = composeStories(stories);

it('Should empty the search field', () => {
  // Render the story
  mount(&lt;Primary /&gt;);

  // Run the test
  cy.get('.clear').click();
  cy.get('input').then((input) => {
    expect(input.val()).to.be.empty;
  });
});
`;

export const jasmine = `import {
  render,
  screen,
  fireEvent,
} from '@testing-library/angular';
import {
  composeStory,
  createMountableStoryComponent,
} from '@storybook/testing-angular';

import Meta, {
  Default as DefaultStory,
} from './delete-customer.stories';

// Compile the "Default" story
const Default = composeStory(DefaultStory, Meta);

describe('Delete Customer Dialog', () => {
  it('should open a dialog', async () => {
    const { component, ngModule } = createMountableStoryComponent(
      Default({}, {} as any)
    );

    // Render the story
    await render(component, { imports: [ngModule] });

    // Run the test
    await fireEvent.click(
      screen.getByRole('button', { name: 'Delete Customer' })
    );
    expect(
      await screen.findByText('Are you sure?')
    ).toBeInTheDocument();
  });
});
`;
