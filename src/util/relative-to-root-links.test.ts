import relativeToRootLinks from './relative-to-root-links';

it('transforms sibling-level links', () => {
  const rootUrl = relativeToRootLinks('./args.md', '/docs/writing-stories/decorators');
  expect(rootUrl).toEqual('/docs/writing-stories/args');
});

it('transforms sibling-level links on index pages', () => {
  const rootUrl = relativeToRootLinks('./args.md', '/docs/writing-stories', true);
  expect(rootUrl).toEqual('/docs/writing-stories/args');
});

it('transforms parent-level links', () => {
  const rootUrl = relativeToRootLinks('../writing-docs/autodocs.md', '/docs/writing-stories/args');
  expect(rootUrl).toEqual('/docs/writing-docs/autodocs');
});

it('transforms specific-version links', () => {
  const rootUrl = relativeToRootLinks(
    '../../../release-6-5/docs/api/csf.md',
    '/docs/configure/babel'
  );
  expect(rootUrl).toEqual('/docs/6.5/api/csf');
});

it('removes trailing index pages', () => {
  const rootUrl = relativeToRootLinks('../writing-stories/index.md', '/docs/api/csf');
  expect(rootUrl).toEqual('/docs/writing-stories');
});

it('retains URL fragment on trailing index pages', () => {
  const rootUrl = relativeToRootLinks('../writing-stories/index.md#foo', '/docs/api/csf');
  expect(rootUrl).toEqual('/docs/writing-stories/#foo');
});

it('does not transform non-versioned upper-level links', () => {
  const rootUrl = relativeToRootLinks('../../foo/bar/README.md', '/docs/writing-stories/args');
  expect(rootUrl).toEqual('../../foo/bar/README.md');

  const rootUrl2 = relativeToRootLinks('../../../foo/bar/README.md', '/docs/writing-stories/args');
  expect(rootUrl2).toEqual('../../../foo/bar/README.md');
});

it('does not transform non-relative links', () => {
  const rootUrl = relativeToRootLinks('/foo', '/docs/writing-stories/args');
  expect(rootUrl).toEqual('/foo');
});
