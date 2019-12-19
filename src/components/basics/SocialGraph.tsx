import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';

const SocialGraph: FunctionComponent<Props> = ({ title, desc, url = null, image = null }) => (
  <Helmet title={title}>
    <meta name="description" content={desc} />
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
    {image && <meta name="twitter:image" content={image} />}

    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
  </Helmet>
);

export default SocialGraph;

interface Props {
  title: string;
  desc: string;
  url?: string;
  image?: string;
}
