/* eslint-env browser */
import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';

export const SEARCH_INPUT_ID = 'algolia-search';
const SEARCH_LIBRARY_SCRIPT_ID = 'algolia-search-library';
const SEARCH_INIT_SCRIPT_ID = 'algolia-search-init';

export default ({ framework, homepageUrl, clearInput }) => {
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
          handleSelected: (input, event, suggestion, datasetNumber, context) => {
            // input.setVal resets the search for Algolia
            input.setVal('');
            // clearInput updates the state of the element for React
            clearInput();
            const inputElement = document.querySelector(`#${SEARCH_INPUT_ID}`);
            if (inputElement) inputElement.blur();
            // All search results have the full URL. In order to navigate within
            // the Gatsby app, we need to use a relative path.
            navigate(suggestion.url.replace(homepageUrl, ''));
          },
        });
      } catch (err) {
        setSearchVisible(false);
      }
    };

    const placedLibraryScript = document.querySelector(`#${SEARCH_LIBRARY_SCRIPT_ID}`);

    if (placedLibraryScript) {
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
