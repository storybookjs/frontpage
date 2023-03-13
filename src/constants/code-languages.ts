const { version } = require('../util/version-data');

export const CODE_LANGUAGES = {
  js: 'JS',
  ts: 'TS',
  ...(version >= 7 && { 'ts-4-9': 'TS 4.9' }),
} as const;

export const CODE_LANGUAGES_FULL = {
  js: 'JavaScript',
  ts: 'TypeScript',
  ...(version >= 7 && { 'ts-4-9': 'TypeScript 4.9' }),
} as const;

export const DEFAULT_CODE_LANGUAGE = 'ts';
