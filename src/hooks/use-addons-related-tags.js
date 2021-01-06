/* eslint-env browser */
import { useState, useEffect } from 'react';
import buildTagLinks from '../util/build-tag-links';

export function useAddonsRelatedTags(query = '') {
  const [relatedTags, setRelatedTags] = useState([]);

  useEffect(() => {
    fetch('https://boring-heisenberg-43a6ed.netlify.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query {
          relatedTags(query: "${query}") {
            name
            displayName
            icon
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => buildTagLinks(res.data.relatedTags))
      .then(setRelatedTags)
      .catch(() => {
        return [];
      });
  }, [query]);

  return relatedTags;
}
