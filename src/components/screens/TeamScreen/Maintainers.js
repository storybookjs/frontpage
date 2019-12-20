import React from 'react';

import TeamList from './TeamList';
import TeamItem from './TeamItem';

export default function Maintainers() {
  return (
    <TeamList
      heading="Maintainers"
      description="Storybook relies on the regular contribution from dedicated maintainers to evolve and keep up to date. Maintainers are experts in different areas of the project."
    >
      <TeamItem
        name="Placeholder"
        title="Maintainer"
        avatarUrl="https://avatars3.githubusercontent.com/in/15368?s=64&v=4"
      />
      <TeamItem
        name="Placeholder"
        title="Maintainer"
        avatarUrl="https://avatars3.githubusercontent.com/in/15368?s=64&v=4"
      />
      <TeamItem
        name="Placeholder"
        title="Maintainer"
        avatarUrl="https://avatars3.githubusercontent.com/in/15368?s=64&v=4"
      />
      <TeamItem
        name="Placeholder"
        title="Maintainer"
        avatarUrl="https://avatars3.githubusercontent.com/in/15368?s=64&v=4"
      />
    </TeamList>
  );
}
