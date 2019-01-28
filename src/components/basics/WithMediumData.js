import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import { url } from './shared/site';

const query = graphql`
  {
    allMediumPost(sort: { fields: [createdAt], order: DESC }, limit: 3) {
      edges {
        node {
          id
          title
          virtuals {
            subtitle
          }
          medium_id
          uniqueSlug
        }
      }
    }
  }
`;

const WithMediumData = ({ render }) => (
  <StaticQuery
    query={query}
    render={data =>
      render(
        data.allMediumPost.edges.map(({ node: { id, title, virtuals, uniqueSlug } }) => ({
          id,
          title,
          subtitle: virtuals.subtitle,
          link: `${url.medium}/${uniqueSlug}`,
        }))
      )
    }
  />
);

WithMediumData.propTypes = {
  render: PropTypes.func.isRequired,
};

export default WithMediumData;
