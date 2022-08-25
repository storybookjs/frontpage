import { useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export function useMediaQuery(query: string | string[]): boolean[] {
  const queries = Array.isArray(query) ? query : [query];

  const [value, setValue] = useState(() => {
    return queries.map((q) => ({
      media: q,
      matches: isBrowser ? window.matchMedia(q).matches : false,
    }));
  });

  useEffect(() => {
    if (!isBrowser) {
      return () => {};
    }

    setValue(
      queries.map((q) => ({
        media: q,
        matches: window.matchMedia(q).matches,
      }))
    );

    const mediaQueryListeners = queries.map((q) => window.matchMedia(q));

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches };
          return item;
        });
      });
    };

    mediaQueryListeners.forEach((mql) => {
      mql.addEventListener('change', handler);
    });

    return () => {
      mediaQueryListeners.forEach((mql) => {
        mql.removeEventListener('change', handler);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value.map((item) => item.matches);
}
