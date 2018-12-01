import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from './../ListItem';

const List = styled.div`
  min-width: 180px;
`;

function TooltipLinkList({ links, LinkWrapper }) {
  return (
    <List>
      {links.map(({ title, href, onClick, active, ...props }, index) => (
        <ListItem
          /* eslint-disable react/no-array-index-key */
          key={index}
          title={title}
          onClick={onClick}
          active={active}
          href={href}
          LinkWrapper={LinkWrapper}
          {...props}
        />
      ))}
    </List>
  );
}

TooltipLinkList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      href: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
      onClick: PropTypes.func,
      active: PropTypes.bool,
    }).isRequired
  ).isRequired,
  LinkWrapper: ListItem.propTypes.LinkWrapper,
};

TooltipLinkList.defaultProps = {
  LinkWrapper: ListItem.defaultProps.LinkWrapper,
};

export default TooltipLinkList;
