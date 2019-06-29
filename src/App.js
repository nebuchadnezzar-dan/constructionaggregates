import React from 'react';
import './App.css';

import Auxillary from './hoc/Auxillary/Auxillary';
import Layout from './hoc/Layout/Layout';
import Settings from './containers/settings/Settings';

const app = () => {
  return (
    <Auxillary>
      <Layout>
        <Settings />
      </Layout>
    </Auxillary>
  );
};

export default app;
