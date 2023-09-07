import { Icon, Link } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import React, { useMemo } from 'react';
import { zonedTimeToUtc, format } from 'date-fns-tz';
import { isPast } from 'date-fns';
import { styles } from '@storybook/components-marketing';

const { marketing, color, subheading, breakpoints } = styles;

const rezoneDate = (date: Date) => zonedTimeToUtc(date, 'America/Los_Angeles');

const formatDate = (date: Date) => {
  // https://github.com/date-fns/date-fns/issues/946
  return {
    date: format(date, 'd LLLL, y, h:mmaaa (zzzz)'),
    dateShort: format(date, 'd LLL, y, haaa (zzz)'),
  };
};

interface Session {
  id: number;
  title: string;
  date: string;
  dateShort?: string;
  registrationLink: string;
}

// All times in PT
const sessionsData: Session[] = [
  {
    id: 0,
    title: 'Storybook for Developers',
    date: 'July 20, 2023 8:30 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=July+20,+2023',
  },
  {
    id: 1,
    title: 'Storybook for Developers',
    date: 'Aug 29, 2023 7:00 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Aug+29,+2023',
  },
  {
    id: 2,
    title: 'Chromatic & Storybook for Designers',
    date: 'Oct 12, 2023 8:30 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Oct+12,+2023',
  },
  {
    id: 3,
    title: 'Storybook for Developers',
    date: 'Nov 7, 2023 9:00 AM',
    registrationLink:
      'https://docs.google.com/forms/d/e/1FAIpQLSeLAB8aoLNRiW5M5Jpn78qxVnnCETDJYpTAph5732tRFXoFDw/viewform?usp=pp_url&entry.146778204=Nov+7,+2023',
  },
];

const Title = styled.h3`
  ${marketing.textLargeBold};
  color: ${color.darkest};
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  ${marketing.textLarge};
  color: ${color.darkest};

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
  }
`;

const GroupTitle = styled.h3`
  ${subheading.small};
  color: ${color.dark};
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const SessionsList = styled.ul`
  padding: 0;
  margin: 0;
`;

const SessionItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  ${marketing.textLarge};
  color: ${color.darkest};
  padding: 0.5rem 0;
  border-bottom: 1px solid ${color.border};

  a {
    flex: none;
  }
`;

const Bullet = styled(Icon)`
  color: ${color.dark};
  margin-right: 10px;
`;

const NoSessionsPlanned = styled.div`
  ${marketing.textLarge};
  color: ${color.dark};
  padding: 0.5rem;
  border: 1px dashed ${color.border};
`;

const SessionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    flex: none;
  }
`;

const SessionTitle = styled.div`
  display: none;

  @media (min-width: ${breakpoints[1] * 1.25}px) {
    display: block;
  }
`;

const UpcomingSessions = ({ sessions }: { sessions: Session[] }) => (
  <>
    <GroupTitle>Upcoming</GroupTitle>
    {sessions.length > 0 ? (
      <SessionsList>
        {sessions.map((session) => (
          <SessionItem key={session.id}>
            <SessionInfo>
              <Bullet icon="calendar" />
              <SessionTitle>
                <b>{session.title}</b> —
              </SessionTitle>
              {session.dateShort}
            </SessionInfo>
            <Link
              href={session.registrationLink}
              withArrow
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              register
            </Link>
          </SessionItem>
        ))}
      </SessionsList>
    ) : (
      <NoSessionsPlanned>
        No upcoming sessions scheduled at the moment. To stay informed about new sessions, please
        sign up for our newsletter.
      </NoSessionsPlanned>
    )}
  </>
);

const PastSessions = ({ sessions }: { sessions: Session[] }) => (
  <>
    <GroupTitle>Past</GroupTitle>
    <SessionsList>
      {sessions.map((session) => (
        <SessionItem key={session.id}>
          <SessionInfo>
            <Bullet icon="calendar" />
            <SessionTitle>
              <b>{session.title}</b> —
            </SessionTitle>
            {session.dateShort}
          </SessionInfo>
        </SessionItem>
      ))}
    </SessionsList>
  </>
);

export const StorybookSessions = ({ sessions = sessionsData }: { sessions?: Session[] }) => {
  const localizedSessions = useMemo(() => {
    return sessions
      .map((session) => {
        const date = rezoneDate(new Date(session.date));
        const info = formatDate(date);
        return {
          ...session,
          isPast: isPast(date),
          date: info.date,
          dateShort: info.dateShort,
          rawDate: new Date(session.date),
        };
      })
      .sort((a, b) => new Date(a.rawDate).valueOf() - new Date(b.rawDate).valueOf())
      .reduce(
        (acc, session) => {
          if (session.isPast) {
            acc.past.push(session);
          } else {
            acc.upcoming.push(session);
          }
          return acc;
        },
        { upcoming: [], past: [] }
      );
  }, [sessions]);

  return (
    <div>
      <Title>Storybook Sessions</Title>
      <Description>
        <p>
          Join us for these 1-hour sessions, hosted by the{' '}
          <Link href="https://www.chromatic.com/">Chromatic</Link> team. We'll explore the
          component-driven approach to building, testing, and documenting UIs using Storybook.
          You'll learn how to:
        </p>
        <ul>
          <li>Utilize addons to debug CSS, verify event handlers, and mock API requests.</li>
          <li>Publish your Storybook to gather feedback and embed stories into other tools.</li>
          <li>Strategies for organizing your stories and auto-generating docs.</li>
          <li>
            Use stories to test components for visual, interaction, and accessibility purposes.
          </li>
          <li>
            Facilitate better designer-developer collaboration using the designs addon and the
            Storybook Connect plugin.
          </li>
        </ul>
      </Description>
      <UpcomingSessions sessions={localizedSessions.upcoming} />
      {localizedSessions.past.length > 0 && <PastSessions sessions={localizedSessions.past} />}
    </div>
  );
};
