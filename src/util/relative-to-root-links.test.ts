import relativeToRootLinks from './relative-to-root-links';

it('transforms sibling-level links', () => {
  const rootUrl = relativeToRootLinks(
    './args.md',
    'react',
    '/docs/react/writing-stories/introduction'
  );
  expect(rootUrl).toEqual('/docs/react/writing-stories/args.md');
});

it('transforms parent-level links', () => {
  const rootUrl = relativeToRootLinks(
    '../writing-docs/introduction.md',
    'react',
    '/docs/react/writing-stories/introduction'
  );
  expect(rootUrl).toEqual('/docs/react/writing-docs/introduction.md');
});

it('transforms specific-version links', () => {
  const rootUrl = relativeToRootLinks(
    '../../../release-6-5/docs/api/csf.md',
    'react',
    '/docs/react/configure/babel'
  );
  expect(rootUrl).toEqual('/docs/6.5/react/api/csf.md');
});

it('does not transform non-versioned upper-level links', () => {
  const rootUrl = relativeToRootLinks(
    '../../foo/bar/README.md',
    'react',
    '/docs/react/writing-stories/introduction'
  );
  expect(rootUrl).toEqual('../../foo/bar/README.md');

  const rootUrl2 = relativeToRootLinks(
    '../../../foo/bar/README.md',
    'react',
    '/docs/react/writing-stories/introduction'
  );
  expect(rootUrl2).toEqual('../../../foo/bar/README.md');
});

it('does not transform non-relative links', () => {
  const rootUrl = relativeToRootLinks('/foo', 'react', '/docs/react/writing-stories/introduction');
  expect(rootUrl).toEqual('/foo');
});
