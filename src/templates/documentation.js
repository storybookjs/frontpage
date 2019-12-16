import React from 'react';
import Layout from '../components/layout/PageLayout';

export default data => {
  console.log({ data });
  return (
    <Layout>
      <div>Hello docs page</div>
    </Layout>
  );
};
