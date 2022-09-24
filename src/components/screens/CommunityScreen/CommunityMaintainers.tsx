import React, { forwardRef } from 'react';
import { styled } from '@storybook/theming';
import { SupportFeatureGrid, styles } from '@storybook/components-marketing';
import { Avatar, Link, Icon, Button } from '@storybook/design-system';
import { CommunitySectionHeader } from './CommunitySectionHeader';

const { breakpoints, subheading, color, typography } = styles;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  ${SupportFeatureGrid} {
    width: 100%;
  }

  @media (min-width: ${breakpoints[2]}px) {
    margin-bottom: 4rem;
  }
`;

const SubHeading = styled.h3`
  ${subheading.regular};
  color: ${color.mediumdark};
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

const SteeringCommitteeMembers = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0;
  margin-top: 0;
  margin-bottom: 3rem;

  @media (min-width: ${breakpoints[2]}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const MemberWrapper = styled.li`
  list-style: none;
  display: flex;
  gap: 1rem;
`;
const MemberAvatar = styled(Avatar)`
  width: 48px;
  height: 48px;
`;
const Name = styled.div`
  font-size: ${typography.size.s3}px;
  font-weight: ${typography.weight.bold};
  color: ${color.darkest};
`;
const Title = styled.div`
  color: ${color.dark};
  margin-bottom: 0.25rem;
`;
const Company = styled.span``;
const Social = styled.div`
  margin-top: 0.5rem;

  & > a {
    margin-right: 15px;
    @media (min-width: ${breakpoints[1]}px) {
      margin-right: 7.5px;
    }
    svg {
      height: 1rem;
      width: 1rem;
      color: ${color.mediumdark};
    }
  }
`;

const ContributorsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding: 0;
  margin-top: 0;
  margin-bottom: 2rem;
`;
const Contributor = styled(Avatar)`
  flex: none;
`;

interface SteeringCommitteeMemberProps {
  name: string;
  title: string;
  company: string;
  companyUrl: string;
  avatarUrl: string;
  gitHubUrl: string;
  twitterUrl: string;
}

const SteeringCommitteeMember = ({
  name,
  title,
  company,
  companyUrl,
  avatarUrl,
  gitHubUrl,
  twitterUrl,
}: SteeringCommitteeMemberProps) => (
  <MemberWrapper>
    <MemberAvatar size="large" username={name} src={avatarUrl} />
    <div>
      <Name>{name}</Name>
      <Title>
        {title}
        {company && companyUrl && (
          <Company>
            {' at '}
            <Link secondary href={companyUrl} target="_blank" rel="noopener nofollow noreferrer">
              <b>{company}</b>
            </Link>
          </Company>
        )}
      </Title>
      <Social>
        {gitHubUrl && (
          <Link
            tertiary
            href={gitHubUrl}
            target="_blank"
            rel="noopener nofollow noreferrer"
            containsIcon
          >
            <Icon icon="github" />
          </Link>
        )}
        {twitterUrl && (
          <Link
            tertiary
            href={twitterUrl}
            target="_blank"
            rel="noopener nofollow noreferrer"
            containsIcon
          >
            <Icon icon="twitter" />
          </Link>
        )}
      </Social>
    </div>
  </MemberWrapper>
);
const SteeringCommittee = styled.div`
  margin-top: 2.125rem;
`;

interface CommunityMaintainersProps {
  contributorsUrl: string;
  contributors: {
    name: string;
    avatar: string;
    url: string;
  }[];
}

export const CommunityMaintainers = forwardRef<HTMLDivElement, CommunityMaintainersProps>(
  ({ contributorsUrl, contributors }, ref) => {
    return (
      <Wrapper ref={ref}>
        <CommunitySectionHeader
          id="maintainer-team"
          title="Maintainer team"
          description="Storybook is maintained by thousands of contributors worldwide and guided by a steering committee of top maintainers."
        />
        <SteeringCommittee>
          <SubHeading>Steering committee</SubHeading>
          <SteeringCommitteeMembers>
            {steeringCommittee.map((member) => (
              <SteeringCommitteeMember key={member.name} {...member} />
            ))}
          </SteeringCommitteeMembers>
        </SteeringCommittee>
        <div>
          <SubHeading>Contributors</SubHeading>
          <ContributorsWrapper>
            {contributors.map(({ name, avatar, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener nofollow noreferrer">
                <Contributor size="large" username={name} src={avatar} />
              </a>
            ))}
          </ContributorsWrapper>
          <Button isLink size="medium" appearance="tertiary" href={contributorsUrl}>
            View all contributors on GitHub
          </Button>
        </div>
      </Wrapper>
    );
  }
);

const steeringCommittee = [
  {
    name: 'Norbert de Langen',
    title: 'Open source',
    company: 'Chromatic',
    companyUrl: 'https://www.chromatic.com/',
    location: 'Zwolle, Netherlands',
    avatarUrl: 'https://avatars2.githubusercontent.com/u/3070389?s=200&v=4',
    gitHubUrl: 'https://github.com/ndelangen',
    twitterUrl: 'https://twitter.com/NorbertdeLangen',
  },
  {
    name: 'Filipp Riabchun',
    title: 'Engineering',
    company: 'Jetbrains',
    companyUrl: 'https://www.jetbrains.com',
    location: 'Bayern, Germany',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/6651625?s=200&v=4',
    gitHubUrl: 'https://github.com/Hypnosphi',
    twitterUrl: 'https://twitter.com/hypnos_phi',
  },
  {
    name: 'Michael Shilman',
    title: 'Engineering',
    company: 'Chromatic',
    companyUrl: 'https://www.chromatic.com/',
    location: 'Taipei, Taiwan',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/488689?s=200&v=4',
    gitHubUrl: 'https://github.com/shilman',
    twitterUrl: 'https://twitter.com/mshilman',
  },
  {
    name: 'Igor Davydkin',
    title: 'Engineering',
    company: 'ClimaCell',
    companyUrl: 'https://www.climacell.co/',
    location: 'Tel Aviv, Israel',
    avatarUrl: 'https://avatars1.githubusercontent.com/u/7867954?s=200&v=4',
    gitHubUrl: 'https://github.com/igor-dv',
    twitterUrl: 'https://twitter.com/IgorDavydkin',
  },
  {
    name: 'Tom Coleman',
    title: 'Engineering',
    company: 'Chromatic',
    companyUrl: 'https://www.chromatic.com/',
    location: 'Melbourne, Australia',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/132554?s=200&v=4',
    gitHubUrl: 'https://github.com/tmeasday',
    twitterUrl: 'https://twitter.com/tmeasday',
  },
];
