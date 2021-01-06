import { useState } from 'react';

const relatedTags = [
  {
    link: '/notes',
    name: '🗒 Notes',
  },
  {
    link: '/storybook',
    name: '📕 Storybook',
  },
  {
    link: '/qa',
    name: '🕵️‍♀️ QA',
  },
  {
    link: '/prototype',
    name: '✨ Prototype',
  },
  {
    link: '/testing',
    name: '✅ Testing',
  },
  {
    link: '/deploy',
    name: '☁️ Deploy',
  },
];

export const useAddonsRelatedTags = () => {
  return relatedTags;
};
