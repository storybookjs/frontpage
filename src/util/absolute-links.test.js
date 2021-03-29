// eslint-disable-next-line
const remark = require('remark');
const remarkHTML = require('remark-html');
const dedent = require('dedent');
const absoluteLinks = require('./absolute-links');

const repositoryUrl = 'https://github.com/maraisr/storybook-addon-grid';

const opts = {
  base: `${repositoryUrl}/`,
};

const processor = remark().use(absoluteLinks, opts).use(remarkHTML);

describe('absoluteLinks', () => {
  it('markdown images', () => {
    const README = dedent`
      ![example that shows how the columns look when enabled](./shots/example.png)
      ![example that shows how the columns look when enabled](shots/example.png)
    `;

    expect(processor.processSync(README).toString().trim()).toBe(dedent`
      <p><img src="https://raw.githubusercontent.com/maraisr/storybook-addon-grid/HEAD/shots/example.png" alt="example that shows how the columns look when enabled">
      <img src="https://raw.githubusercontent.com/maraisr/storybook-addon-grid/HEAD/shots/example.png" alt="example that shows how the columns look when enabled"></p>
    `);
  });

  it('markdown links', () => {
    const README = dedent`
      [example that shows how the columns look when enabled](./shots/example/foo)
      [another example](shots/example/bar)
    `;

    expect(processor.processSync(README).toString().trim()).toBe(dedent`
      <p><a href="https://github.com/maraisr/storybook-addon-grid/shots/example/foo">example that shows how the columns look when enabled</a>
      <a href="https://github.com/maraisr/storybook-addon-grid/shots/example/bar">another example</a></p>
    `);
  });

  it('html images', () => {
    const README = dedent`
      <div align="center">
        <h1><img src="./shots/logo.svg" alt="storybook-addon-grid"/></h1>
        <p align="center"><code>yarn add storybook-addon-grid</code> makes column grids simple</p>
        <hr />
      </div>
    `;

    expect(processor.processSync(README).toString().trim()).toBe(dedent`
      <div align="center">
        <h1><img src="https://raw.githubusercontent.com/maraisr/storybook-addon-grid/HEAD/shots/logo.svg" alt="storybook-addon-grid" /></h1>
        <p align="center"><code>yarn add storybook-addon-grid</code> makes column grids simple</p>
        <hr />
      </div>
    `);
  });

  it('html links', () => {
    const README = dedent`
      <span>
        <a href="https://github.com/maraisr/storybook-addon-grid/actions?query=workflow:CI+branch:main">
        <img src="https://github.com/maraisr/storybook-addon-grid/workflows/CI/badge.svg?query=branch:main"/>
        </a>
        <a href="/charts.html?package=storybook-addon-grid">
        <img src="https://badgen.net/npm/dm/storybook-addon-grid" alt="downloads"/>
        </a>
      </span>
    `;

    expect(processor.processSync(README).toString().trim()).toBe(dedent`
      <span>
        <a href="https://github.com/maraisr/storybook-addon-grid/actions?query=workflow:CI+branch:main">
        <img src="https://github.com/maraisr/storybook-addon-grid/workflows/CI/badge.svg?query=branch:main" />
        </a>
        <a href="https://github.com/charts.html?package=storybook-addon-grid">
        <img src="https://badgen.net/npm/dm/storybook-addon-grid" alt="downloads" />
        </a>
      </span>
    `);
  });

  it('complete example', () => {
    const README = dedent`
      <div align="center">
  <h1><img src="./shots/logo.svg" alt="storybook-addon-grid"/></h1>
  <p align="center"><code>yarn add storybook-addon-grid</code> makes column grids simple</p>
  <hr />
  <span>
    <a href="https://github.com/maraisr/storybook-addon-grid/actions?query=workflow:CI+branch:main">
    <img src="https://github.com/maraisr/storybook-addon-grid/workflows/CI/badge.svg?query=branch:main"/>
    </a>
    <a href="https://npm-stat.com/charts.html?package=storybook-addon-grid">
    <img src="https://badgen.net/npm/dm/storybook-addon-grid" alt="downloads"/>
    </a>
    </span>
</div>

<br />

![example that shows how the columns look when enabled](./shots/example.png)
![example that shows how the columns look when enabled](shots/example.png)`;

    expect(processor.processSync(README).toString().trim()).toBe(dedent`<div align="center">
    <h1><img src="https://raw.githubusercontent.com/maraisr/storybook-addon-grid/HEAD/shots/logo.svg" alt="storybook-addon-grid" /></h1>
    <p align="center"><code>yarn add storybook-addon-grid</code> makes column grids simple</p>
    <hr />
    <span>
      <a href="https://github.com/maraisr/storybook-addon-grid/actions?query=workflow:CI+branch:main">
      <img src="https://github.com/maraisr/storybook-addon-grid/workflows/CI/badge.svg?query=branch:main" />
      </a>
      <a href="https://npm-stat.com/charts.html?package=storybook-addon-grid">
      <img src="https://badgen.net/npm/dm/storybook-addon-grid" alt="downloads" />
      </a>
      </span>
    </div>

    <br />

    <p><img src="https://raw.githubusercontent.com/maraisr/storybook-addon-grid/HEAD/shots/example.png" alt="example that shows how the columns look when enabled">
    <img src="https://raw.githubusercontent.com/maraisr/storybook-addon-grid/HEAD/shots/example.png" alt="example that shows how the columns look when enabled"></p>`);
  });
});
