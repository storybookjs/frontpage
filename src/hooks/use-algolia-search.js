/* eslint-env browser */
import { useEffect, useState } from 'react';

export const SEARCH_INPUT_ID = 'algolia-search';
const SEARCH_LIBRARY_SCRIPT_ID = 'algolia-search-library';
const SEARCH_INIT_SCRIPT_ID = 'algolia-search-init';

export default ({ framework }) => {
  const [isSearchVisible, setSearchVisible] = useState(!!process.env.GATSBY_ALGOLIA_API_KEY);

  useEffect(() => {
    if (!process.env.GATSBY_ALGOLIA_API_KEY) return;

    const initSearch = () => {
      if (!window.docsearch) {
        setSearchVisible(false);
        return;
      }

      try {
        window.docsearch({
          apiKey: process.env.GATSBY_ALGOLIA_API_KEY,
          indexName: 'storybook-js',
          inputSelector: `#${SEARCH_INPUT_ID}`,
          algoliaOptions: { facetFilters: ['tags:docs', `framework:${framework}`] },
        });
      } catch (err) {
        setSearchVisible(false);
      }
    };

    const placedLibaryScript = document.querySelector(`#${SEARCH_LIBRARY_SCRIPT_ID}`);

    if (placedLibaryScript) {
      initSearch();
    } else {
      const libraryScript = document.createElement('script');
      libraryScript.id = SEARCH_LIBRARY_SCRIPT_ID;
      libraryScript.onload = initSearch;
      libraryScript.onerror = () => setSearchVisible(false);
      libraryScript.src = 'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js';
      document.body.appendChild(libraryScript);
    }
  }, [framework]);

  return { isSearchVisible };
};
