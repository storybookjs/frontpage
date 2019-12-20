import React from 'react';

import TeamList from './TeamList';
import TeamItem from './TeamItem';

export default function SteeringCommittee() {
  return (
    <TeamList
      heading="Steering Committee"
      description="Storybook is guided by a steering committee of top maintainers whose contributions to the project continue to be instrumental in the growth and success of the project."
    >
      <TeamItem
        name="Norbert de Langen"
        title="Open source"
        company="Chroma"
        companyUrl="https://hichroma.com"
        location="Zwolle, Netherlands"
        avatarUrl="https://avatars2.githubusercontent.com/u/3070389?s=200&v=4"
        gitHubUrl="https://github.com/ndelangen"
        twitterUrl="https://twitter.com/NorbertdeLangen"
      />
      <TeamItem
        name="Filipp Riabchun"
        title="Engineering"
        company="Jetbrains"
        companyUrl="https://www.jetbrains.com"
        location="Bayern, Germany"
        avatarUrl="https://avatars0.githubusercontent.com/u/6651625?s=200&v=4"
        gitHubUrl="https://github.com/Hypnosphi"
        twitterUrl="https://twitter.com/hypnos_phi"
      />
      <TeamItem
        name="Michael Shilman"
        title="Engineering"
        company="Chroma"
        companyUrl="https://hichroma.com"
        location="San Francisco, USA"
        avatarUrl="https://avatars0.githubusercontent.com/u/488689?s=200&v=4"
        gitHubUrl="https://github.com/shilman"
        twitterUrl="https://twitter.com/mshilman"
      />
      <TeamItem
        name="Igor Davydkin"
        title="Engineering"
        company="ClimaCell"
        companyUrl="https://www.climacell.co/"
        location="Tel Aviv, Israel"
        avatarUrl="https://avatars1.githubusercontent.com/u/7867954?s=200&v=4"
        gitHubUrl="https://github.com/igor-dv"
        twitterUrl="https://twitter.com/IgorDavydkin"
      />
      <TeamItem
        name="Tom Coleman"
        title="Engineering"
        company="Chroma"
        companyUrl="https://hichroma.com"
        location="Melbourne, Australia"
        avatarUrl="https://avatars0.githubusercontent.com/u/132554?s=200&v=4"
        gitHubUrl="https://github.com/tmeasday"
        twitterUrl="https://twitter.com/tmeasday"
      />
    </TeamList>
  );
}
