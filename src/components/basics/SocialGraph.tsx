import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../lib/useSiteMetadata';

const SocialGraph: FunctionComponent<Props> = ({ title, desc, url = null, image = null }) => {
  const { siteUrl } = useSiteMetadata();

  return (
    <Helmet title={title}>
      <meta name="description" content={desc} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      {image && <meta property="og:image" content={`${siteUrl}${image}`} />}
      {image && <meta name="twitter:image" content={`${siteUrl}${image}`} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:site" content="@storybookjs" />
    </Helmet>
  );
};

export default SocialGraph;

interface Props {
  title: string;
  desc: string;
  url?: string;
  image?: string;
}
