import { useState } from 'react';
import MuiSVG from '../src/images/integrations/mui.svg';

let search = { query: '', isSearching: false, isSearchLoading: false, noResults: false };

export const useAddonsSearch = () => {
  const [seachData] = useState(search);
  return seachData;
};

export const UseAddonsSearchDecorator = (story, context) => {
  search = {
    query: context.parameters.isSearching ? 'layout' : '',
    setQuery: () => {},
    isSearching: context.parameters.isSearching || false,
    isSearchLoading: context.parameters.isSearchLoading || false,
    results: context.parameters.noResults
      ? { integrations: { addons: [], recipes: [] }, relatedTags: [] }
      : mockResults,
  };

  return story();
};

const mockResults = {
  integrations: {
    addons: [
      {
        id: 'storybook-addon-outline',
        name: 'storybook-addon-outline',
        displayName: 'Outline',
        description: 'Outline all elements with CSS to help with layout placement and alignment',
        icon: 'https://user-images.githubusercontent.com/263385/101991674-48355c80-3c7c-11eb-9686-f684e755fcdd.png',
        authors: [
          {
            id: 'winkervsbecks',
            avatarUrl: '//www.gravatar.com/avatar/dc3909557c0f933a066fe5faea796fdf?s=200',
            name: 'winkervsbecks',
          },
        ],
        weeklyDownloads: 65,
        repositoryUrl: 'https://github.com/chromaui/storybook-outline',
        appearance: 'official',
        verifiedCreator: null,
      },
    ],
    recipes: [
      {
        id: '0',
        displayName: 'Material UI',
        icon: MuiSVG,
        name: '@mui/material',
        description:
          "Material UI is component library styled based on Google's Material Design spec. This recipe shows you how to get the most out of Material UI in Storybook.",
        views: 12253,
      },
    ],
  },
  relatedTags: [
    {
      name: 'docz',
      link: '/addons/docz',
    },
    {
      name: 'md',
      link: '/addons/md',
    },
    {
      name: 'storybook',
      link: '/addons/jss',
    },
    {
      name: 'addon',
      link: '/addons/end-to-end',
    },
    {
      name: 'storybookjs',
      link: '/addons/hooks',
    },
  ],
};
