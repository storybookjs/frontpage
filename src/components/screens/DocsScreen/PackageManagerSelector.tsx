import * as React from 'react';

import {
  PACKAGE_MANAGERS,
  PackageManager,
  PackageManagerKey,
} from '../../../constants/package-managers';
import { LanguageSelector } from '../../basics/LanguageSelector';
import { useDocsContext } from './DocsContext';

type PackageManagerSelectorProps = Omit<
  React.ComponentProps<typeof LanguageSelector>,
  'items' | 'onChange' | 'value'
>;

// Workaround TypeScript's lack of support for Object.keys() types
const allPackageManagers = Object.entries(PACKAGE_MANAGERS) as [
  PackageManagerKey,
  PackageManager
][];

export const PackageManagerSelector = (props: PackageManagerSelectorProps) => {
  const {
    packageManager: [packageManager, setPackageManager],
  } = useDocsContext();

  const packageManagers = allPackageManagers;

  if (packageManagers.length < 2) {
    return null;
  }

  const PackageManagerItems = packageManagers.map(([key, label]) => ({
    id: key,
    label,
  }));

  return (
    <LanguageSelector
      items={PackageManagerItems}
      onChange={(pm) => {
        setPackageManager(pm as PackageManagerKey);
      }}
      value={PACKAGE_MANAGERS[packageManager]}
      {...props}
    />
  );
};
