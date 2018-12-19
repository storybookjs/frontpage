/* eslint-env browser */
import React from 'react';
import { PropTypes } from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import styled from 'styled-components';

import MailingListSubscribeForm from './MailingListSubscribeForm';

import { styles } from '../basics';

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

// XXX: what is this
const listUrl = 'https://<something>.us15.list-manage.com/subscribe/post';

export const PureConfirmedMailingList = ({ hasSubscribed, onSubscribe }) =>
  hasSubscribed ? (
    <MailingListConfirm>
      <b>
        <span role="img" aria-label="thumbs up">
          👍
        </span>{' '}
        Thanks, you&rsquo;re all signed up!
      </b>
    </MailingListConfirm>
  ) : (
    <MailingListForm onSubscribe={onSubscribe} cta="Sign up" />
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
        MERGE0: email,
        // XXX: what is this
        ...(optIn && { 'group[4969][1]': 1 }),
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
