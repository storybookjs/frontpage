import relativeToRootLinks from './relativeToRootLinks';

describe('relativeToRootLinks', () => {
  it('transforms specific-version links', () => {
    const result = relativeToRootLinks(
      '../../../release-6-5/docs/api/csf.md',
      '/docs/configure/babel'
    );
    expect(result).toEqual('/docs/6.5/api/csf');
  });

  describe('trailing index files', () => {
    it('removes them', () => {
      const result = relativeToRootLinks('../writing-stories/index.md', '/docs/api/csf');
      expect(result).toEqual('/docs/writing-stories/');
    });

    it('retains URL fragment', () => {
      const result = relativeToRootLinks('../writing-stories/index.md#foo', '/docs/api/csf');
      expect(result).toEqual('/docs/writing-stories/#foo');
    });
  });

  describe('same-level links', () => {
    it('transforms them', () => {
      const result = relativeToRootLinks('./args.md', '/docs/writing-stories/decorators');
      expect(result).toEqual('/docs/writing-stories/args');
    });

    it('when on a top-level index', () => {
      const result = relativeToRootLinks('./args.md', '/docs/writing-stories');
      expect(result).toEqual('/docs/writing-stories/args');
    });

    it('when on a top-level index with versioned path', () => {
      const result = relativeToRootLinks('./args.md', '/docs/7.6/writing-stories');
      expect(result).toEqual('/docs/7.6/writing-stories/args');
    });
  });

  describe('up-one-level links', () => {
    it('transforms up-one-level links', () => {
      const result = relativeToRootLinks(
        '../writing-docs/autodocs.md',
        '/docs/writing-stories/args'
      );
      expect(result).toEqual('/docs/writing-docs/autodocs');
    });

    it('transforms up-one-level links without a parent', () => {
      const result = relativeToRootLinks('../index.md', '/docs/writing-stories/args');
      expect(result).toEqual('/docs/writing-stories/');
    });
  });

  it('transforms up-two-level, up-three-level links', () => {
    const upTwoLevels = relativeToRootLinks(
      '../../writing-docs/autodocs.md',
      '/docs/writing-stories/args/api'
    );
    expect(upTwoLevels).toEqual('/docs/writing-docs/autodocs');

    const upThreeLevels = relativeToRootLinks(
      '../../../writing-docs/autodocs.md',
      '/docs/writing-stories/args/api/nested'
    );
    expect(upThreeLevels).toEqual('/docs/writing-docs/autodocs');
  });

  it('does not transform non-relative links', () => {
    const result = relativeToRootLinks('/foo', '/docs/writing-stories/args');
    expect(result).toEqual('/foo');
  });
});
