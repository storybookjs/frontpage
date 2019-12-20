/* eslint-env browser */
import React from 'react';
import { PropTypes } from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import styled from 'styled-components';

import { styles } from '@storybook/design-system';
import MailingListSubscribeForm from './MailingListSubscribeForm';

const { background, typography, breakpoint } = styles;

const MailingListConfirm = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: 20px;
  background: ${background.positive};
  padding: 10px;
  text-align: center;
  border-radius: 4px;
`;

const MailingListForm = styled(MailingListSubscribeForm)`
  min-width: 280px;
  width: 100%;
  @media (min-width: ${breakpoint}px) {
    margin: 0 0 0;
  }
`;

const listUrl = 'https://storybook.us18.list-manage.com/subscribe/post';

export const PureConfirmedMailingList = ({ hasSubscribed, onSubscribe, ...props }) =>
  hasSubscribed ? (
    <MailingListConfirm {...props}>
      <b>
        <span role="img" aria-label="thumbs up">
          👍
        </span>{' '}
        Thanks, you&rsquo;re all signed up!
      </b>
    </MailingListConfirm>
  ) : (
    <MailingListForm onSubscribe={onSubscribe} cta="Sign up" {...props} />
  );

PureConfirmedMailingList.propTypes = {
  hasSubscribed: PropTypes.bool.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default compose(
  withState('hasSubscribed', 'onSetHasSubscribed', false),
  withHandlers({
    onSubscribe: ({ onSetHasSubscribed }) => async ({ email, optIn }) => {
      const data = new FormData();
      const fullFields = {
        u: '06a6fce3ab1327784d4342396',
        id: '18b5cea6e6',
        MERGE0: email,
        // XXX: this is for the opt in checkbox on things like free resources
        // We don't have this right now, but may have it in the future (need to change the group field)
        // ...(optIn && { 'group[4969][1]': null }),
      };
      // e.g. u, id, SOURCE
      Object.keys(fullFields).forEach(key => data.append(key, fullFields[key]));

      await fetch(listUrl, {
        method: 'POST',
        body: data,
        mode: 'no-cors',
      });
      onSetHasSubscribed(true);
    },
  })
)(PureConfirmedMailingList);
