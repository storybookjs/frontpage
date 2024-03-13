import { parseRawRedirects, generateRedirects } from './generateRedirects';

const versions = [
  { version: 7.6, string: '7.6', label: 'latest' },
  { version: 7.5, string: '7.5' },
  { version: 7.4, string: '7.4' },
  { version: 7.3, string: '7.3' },
  { version: 7.2, string: '7.2' },
  { version: 7.1, string: '7.1' },
  { version: 7, string: '7.0' },
  { version: 6.5, string: '6.5' },
  { version: 6.4, string: '6.4' },
  { version: 6.3, string: '6.3' },
  { version: 6.2, string: '6.2' },
  { version: 6.1, string: '6.1' },
  { version: 6, string: '6.0' },
  { version: 8, string: '8.0', label: 'alpha' },
  { string: 'next' },
];

const latestVersionString = '7.6';

const nextVersionString = '8.0';

const renderers = [
  'react',
  'vue',
  'angular',
  'web-components',
  'ember',
  'html',
  'svelte',
  'preact',
  'qwik',
  'solid',
];

// TODO: It's not about when the destination was updated, it's about when the source was first published
const inputString = `
# Multi-line preamble
# Should not be included

# 6.0
/docs/workflows/testing-with-storybook/          /docs/writing-tests/                                   301
/docs/workflows/unit-testing/                    /docs/writing-tests/stories-in-unit-tests/             301

# 7.1
/docs/writing-tests/importing-stories-in-tests/  /docs/writing-tests/stories-in-unit-tests/             301

# 7.6
/docs/writing-stories/introduction               /docs/writing-stories                                  301
/docs/writing-docs/introduction                  /docs/writing-docs                                     301
`;

function statefulGenerateRedirects(rawRedirects: string) {
  return generateRedirects({
    rawRedirects,
    latestVersionString,
    nextVersionString,
    renderers,
    versions,
  });
}

describe('parseRawRedirects', () => {
  it('parses', () => {
    const result = parseRawRedirects(inputString);
    expect(result).toMatchInlineSnapshot(`
      {
        "6.0": [
          [
            "/docs/workflows/testing-with-storybook/",
            "/docs/writing-tests/",
            "301",
          ],
          [
            "/docs/workflows/unit-testing/",
            "/docs/writing-tests/stories-in-unit-tests/",
            "301",
          ],
        ],
        "7.1": [
          [
            "/docs/writing-tests/importing-stories-in-tests/",
            "/docs/writing-tests/stories-in-unit-tests/",
            "301",
          ],
        ],
        "7.6": [
          [
            "/docs/writing-stories/introduction",
            "/docs/writing-stories",
            "301",
          ],
          [
            "/docs/writing-docs/introduction",
            "/docs/writing-docs",
            "301",
          ],
        ],
      }
    `);
  });
});

describe('generateRedirects', () => {
  it('generates', () => {
    const result = statefulGenerateRedirects(inputString);
    expect(result).toMatchInlineSnapshot(`
      "/docs/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/7.6/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/react/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/vue/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/angular/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/web-components/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/ember/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/html/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/svelte/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/preact/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/qwik/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/solid/workflows/testing-with-storybook/ /docs/writing-tests/ 301
      /docs/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/7.6/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/react/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/vue/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/angular/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/web-components/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/ember/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/html/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/svelte/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/preact/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/qwik/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/solid/workflows/unit-testing/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/7.6/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/react/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/vue/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/angular/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/web-components/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/ember/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/html/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/svelte/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/preact/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/qwik/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/solid/writing-tests/importing-stories-in-tests/ /docs/writing-tests/stories-in-unit-tests/ 301
      /docs/writing-stories/introduction /docs/writing-stories 301
      /docs/7.6/writing-stories/introduction /docs/writing-stories 301
      /docs/react/writing-stories/introduction /docs/writing-stories 301
      /docs/vue/writing-stories/introduction /docs/writing-stories 301
      /docs/angular/writing-stories/introduction /docs/writing-stories 301
      /docs/web-components/writing-stories/introduction /docs/writing-stories 301
      /docs/ember/writing-stories/introduction /docs/writing-stories 301
      /docs/html/writing-stories/introduction /docs/writing-stories 301
      /docs/svelte/writing-stories/introduction /docs/writing-stories 301
      /docs/preact/writing-stories/introduction /docs/writing-stories 301
      /docs/qwik/writing-stories/introduction /docs/writing-stories 301
      /docs/solid/writing-stories/introduction /docs/writing-stories 301
      /docs/writing-docs/introduction /docs/writing-docs 301
      /docs/7.6/writing-docs/introduction /docs/writing-docs 301
      /docs/react/writing-docs/introduction /docs/writing-docs 301
      /docs/vue/writing-docs/introduction /docs/writing-docs 301
      /docs/angular/writing-docs/introduction /docs/writing-docs 301
      /docs/web-components/writing-docs/introduction /docs/writing-docs 301
      /docs/ember/writing-docs/introduction /docs/writing-docs 301
      /docs/html/writing-docs/introduction /docs/writing-docs 301
      /docs/svelte/writing-docs/introduction /docs/writing-docs 301
      /docs/preact/writing-docs/introduction /docs/writing-docs 301
      /docs/qwik/writing-docs/introduction /docs/writing-docs 301
      /docs/solid/writing-docs/introduction /docs/writing-docs 301


      /docs /docs/get-started/ 301
      /docs/react/* /docs/:splat 301
      /docs/vue/* /docs/:splat 301
      /docs/angular/* /docs/:splat 301
      /docs/web-components/* /docs/:splat 301
      /docs/ember/* /docs/:splat 301
      /docs/html/* /docs/:splat 301
      /docs/svelte/* /docs/:splat 301
      /docs/preact/* /docs/:splat 301
      /docs/qwik/* /docs/:splat 301
      /docs/solid/* /docs/:splat 301
      /docs/7.6/* /docs/:splat 301


      /docs/7.5/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/react/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/vue/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/angular/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/web-components/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/ember/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/html/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/svelte/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/preact/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/qwik/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/solid/workflows/testing-with-storybook/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/ 301
      /docs/7.5/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/react/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/vue/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/angular/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/web-components/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/ember/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/html/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/svelte/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/preact/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/qwik/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/solid/workflows/unit-testing/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/react/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/vue/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/angular/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/web-components/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/ember/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/html/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/svelte/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/preact/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/qwik/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301
      /docs/7.5/solid/writing-tests/importing-stories-in-tests/ https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/writing-tests/stories-in-unit-tests/ 301


      /docs/7.5 https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/get-started/ 200
      /docs/7.5/react/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/vue/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/angular/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/web-components/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/ember/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/html/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/svelte/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/preact/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/qwik/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/solid/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200
      /docs/7.5/* https://release-7-5--storybook-frontpage.netlify.app/docs/7.5/:splat 200


      /docs/7.4/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/react/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/vue/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/angular/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/web-components/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/ember/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/html/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/svelte/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/preact/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/qwik/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/solid/workflows/testing-with-storybook/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/ 301
      /docs/7.4/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/react/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/vue/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/angular/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/web-components/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/ember/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/html/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/svelte/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/preact/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/qwik/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/solid/workflows/unit-testing/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/react/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/vue/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/angular/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/web-components/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/ember/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/html/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/svelte/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/preact/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/qwik/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301
      /docs/7.4/solid/writing-tests/importing-stories-in-tests/ https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/writing-tests/stories-in-unit-tests/ 301


      /docs/7.4 https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/get-started/ 200
      /docs/7.4/react/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/vue/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/angular/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/web-components/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/ember/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/html/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/svelte/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/preact/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/qwik/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/solid/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200
      /docs/7.4/* https://release-7-4--storybook-frontpage.netlify.app/docs/7.4/:splat 200


      /docs/7.3/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/react/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/vue/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/angular/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/web-components/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/ember/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/html/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/svelte/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/preact/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/qwik/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/solid/workflows/testing-with-storybook/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/ 301
      /docs/7.3/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/react/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/vue/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/angular/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/web-components/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/ember/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/html/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/svelte/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/preact/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/qwik/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/solid/workflows/unit-testing/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/react/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/vue/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/angular/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/web-components/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/ember/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/html/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/svelte/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/preact/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/qwik/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301
      /docs/7.3/solid/writing-tests/importing-stories-in-tests/ https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/writing-tests/stories-in-unit-tests/ 301


      /docs/7.3 https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/get-started/ 200
      /docs/7.3/react/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/vue/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/angular/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/web-components/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/ember/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/html/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/svelte/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/preact/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/qwik/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/solid/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200
      /docs/7.3/* https://release-7-3--storybook-frontpage.netlify.app/docs/7.3/:splat 200


      /docs/7.2/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/react/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/vue/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/angular/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/web-components/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/ember/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/html/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/svelte/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/preact/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/qwik/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/solid/workflows/testing-with-storybook/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/ 301
      /docs/7.2/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/react/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/vue/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/angular/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/web-components/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/ember/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/html/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/svelte/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/preact/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/qwik/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/solid/workflows/unit-testing/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/react/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/vue/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/angular/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/web-components/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/ember/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/html/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/svelte/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/preact/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/qwik/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301
      /docs/7.2/solid/writing-tests/importing-stories-in-tests/ https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/writing-tests/stories-in-unit-tests/ 301


      /docs/7.2 https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/get-started/ 200
      /docs/7.2/react/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/vue/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/angular/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/web-components/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/ember/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/html/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/svelte/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/preact/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/qwik/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/solid/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200
      /docs/7.2/* https://release-7-2--storybook-frontpage.netlify.app/docs/7.2/:splat 200


      /docs/7.1/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/react/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/vue/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/angular/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/web-components/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/ember/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/html/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/svelte/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/preact/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/qwik/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/solid/workflows/testing-with-storybook/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/ 301
      /docs/7.1/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/react/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/vue/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/angular/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/web-components/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/ember/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/html/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/svelte/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/preact/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/qwik/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/solid/workflows/unit-testing/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/react/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/vue/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/angular/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/web-components/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/ember/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/html/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/svelte/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/preact/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/qwik/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301
      /docs/7.1/solid/writing-tests/importing-stories-in-tests/ https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/writing-tests/stories-in-unit-tests/ 301


      /docs/7.1 https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/get-started/ 200
      /docs/7.1/react/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/vue/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/angular/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/web-components/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/ember/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/html/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/svelte/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/preact/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/qwik/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/solid/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200
      /docs/7.1/* https://release-7-1--storybook-frontpage.netlify.app/docs/7.1/:splat 200


      /docs/7.0/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/react/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/vue/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/angular/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/web-components/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/ember/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/html/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/svelte/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/preact/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/qwik/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/solid/workflows/testing-with-storybook/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/ 301
      /docs/7.0/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/react/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/vue/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/angular/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/web-components/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/ember/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/html/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/svelte/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/preact/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/qwik/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301
      /docs/7.0/solid/workflows/unit-testing/ https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/writing-tests/stories-in-unit-tests/ 301


      /docs/7.0 https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/get-started/ 200
      /docs/7.0/react/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/vue/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/angular/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/web-components/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/ember/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/html/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/svelte/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/preact/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/qwik/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/solid/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200
      /docs/7.0/* https://release-7-0--storybook-frontpage.netlify.app/docs/7.0/:splat 200


      /docs/6.5/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/react/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/vue/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/angular/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/web-components/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/ember/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/html/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/svelte/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/preact/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/qwik/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/solid/workflows/testing-with-storybook/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/ 301
      /docs/6.5/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/react/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/vue/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/angular/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/web-components/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/ember/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/html/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/svelte/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/preact/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/qwik/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301
      /docs/6.5/solid/workflows/unit-testing/ https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/writing-tests/stories-in-unit-tests/ 301


      /docs/6.5 https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/get-started/ 200
      /docs/6.5/react/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/vue/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/angular/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/web-components/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/ember/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/html/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/svelte/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/preact/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/qwik/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/solid/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200
      /docs/6.5/* https://release-6-5--storybook-frontpage.netlify.app/docs/6.5/:splat 200


      /docs/6.4/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/react/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/vue/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/angular/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/web-components/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/ember/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/html/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/svelte/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/preact/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/qwik/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/solid/workflows/testing-with-storybook/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/ 301
      /docs/6.4/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/react/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/vue/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/angular/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/web-components/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/ember/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/html/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/svelte/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/preact/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/qwik/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301
      /docs/6.4/solid/workflows/unit-testing/ https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/writing-tests/stories-in-unit-tests/ 301


      /docs/6.4 https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/get-started/ 200
      /docs/6.4/react/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/vue/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/angular/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/web-components/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/ember/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/html/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/svelte/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/preact/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/qwik/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/solid/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200
      /docs/6.4/* https://release-6-4--storybook-frontpage.netlify.app/docs/6.4/:splat 200


      /docs/6.3/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/react/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/vue/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/angular/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/web-components/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/ember/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/html/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/svelte/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/preact/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/qwik/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/solid/workflows/testing-with-storybook/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/ 301
      /docs/6.3/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/react/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/vue/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/angular/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/web-components/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/ember/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/html/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/svelte/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/preact/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/qwik/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301
      /docs/6.3/solid/workflows/unit-testing/ https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/writing-tests/stories-in-unit-tests/ 301


      /docs/6.3 https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/get-started/ 200
      /docs/6.3/react/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/vue/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/angular/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/web-components/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/ember/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/html/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/svelte/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/preact/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/qwik/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/solid/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200
      /docs/6.3/* https://release-6-3--storybook-frontpage.netlify.app/docs/6.3/:splat 200


      /docs/6.2/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/react/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/vue/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/angular/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/web-components/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/ember/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/html/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/svelte/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/preact/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/qwik/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/solid/workflows/testing-with-storybook/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/ 301
      /docs/6.2/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/react/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/vue/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/angular/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/web-components/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/ember/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/html/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/svelte/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/preact/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/qwik/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301
      /docs/6.2/solid/workflows/unit-testing/ https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/writing-tests/stories-in-unit-tests/ 301


      /docs/6.2 https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/get-started/ 200
      /docs/6.2/react/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/vue/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/angular/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/web-components/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/ember/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/html/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/svelte/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/preact/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/qwik/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/solid/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200
      /docs/6.2/* https://release-6-2--storybook-frontpage.netlify.app/docs/6.2/:splat 200


      /docs/6.1/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/react/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/vue/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/angular/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/web-components/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/ember/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/html/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/svelte/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/preact/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/qwik/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/solid/workflows/testing-with-storybook/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/ 301
      /docs/6.1/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/react/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/vue/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/angular/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/web-components/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/ember/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/html/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/svelte/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/preact/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/qwik/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301
      /docs/6.1/solid/workflows/unit-testing/ https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/writing-tests/stories-in-unit-tests/ 301


      /docs/6.1 https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/get-started/ 200
      /docs/6.1/react/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/vue/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/angular/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/web-components/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/ember/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/html/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/svelte/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/preact/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/qwik/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/solid/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200
      /docs/6.1/* https://release-6-1--storybook-frontpage.netlify.app/docs/6.1/:splat 200


      /docs/6.0/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/react/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/vue/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/angular/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/web-components/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/ember/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/html/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/svelte/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/preact/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/qwik/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/solid/workflows/testing-with-storybook/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/ 301
      /docs/6.0/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/react/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/vue/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/angular/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/web-components/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/ember/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/html/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/svelte/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/preact/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/qwik/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301
      /docs/6.0/solid/workflows/unit-testing/ https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/writing-tests/stories-in-unit-tests/ 301


      /docs/6.0 https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/get-started/ 200
      /docs/6.0/react/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/vue/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/angular/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/web-components/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/ember/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/html/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/svelte/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/preact/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/qwik/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/solid/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200
      /docs/6.0/* https://release-6-0--storybook-frontpage.netlify.app/docs/6.0/:splat 200


      /docs/8.0/workflows/testing-with-storybook/ https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/writing-tests/ 301
      /docs/8.0/workflows/unit-testing/ https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/writing-tests/stories-in-unit-tests/ 301
      /docs/8.0/writing-tests/importing-stories-in-tests/ https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/writing-tests/stories-in-unit-tests/ 301
      /docs/8.0/writing-stories/introduction https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/writing-stories 301
      /docs/8.0/writing-docs/introduction https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/writing-docs 301


      /docs/8.0 https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/get-started/ 200
      /docs/8.0/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200




      /docs/next https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/get-started/ 200
      /docs/next/react/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/vue/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/angular/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/web-components/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/ember/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/html/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/svelte/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/preact/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/qwik/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/solid/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200
      /docs/next/* https://release-8-0--storybook-frontpage.netlify.app/docs/8.0/:splat 200


      /releases /releases/7.6 301"
    `);
  });
});
