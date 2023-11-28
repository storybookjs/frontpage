export const PACKAGE_MANAGERS = {
  npm: 'npm',
  pnpm: 'pnpm',
  yarn: 'yarn',
} as const;

export type PackageManagerKey = keyof typeof PACKAGE_MANAGERS;
export type PackageManager = typeof PACKAGE_MANAGERS[PackageManagerKey];

export const DEFAULT_PACKAGE_MANAGER = 'npm';
