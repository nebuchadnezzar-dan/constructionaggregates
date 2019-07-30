import React from 'react';
import './App.css';

import { Route } from 'react-router-dom';

import Auxillary from './hoc/Auxillary/Auxillary';
import Layout from './hoc/Layout/Layout';
import Settings from './containers/settings/Settings';
import Invoice from './containers/Invoice/Invoice';
import Customer from './containers/Customer/Customer';

const app = () => {
  return (
    <Auxillary>
      <Layout>
        <Route path="/" exact render={() => <div>Dashboard</div>} />
        <Route path="/settings" component={Settings} />
        <Route path="/user" render={() => <div>User</div>} />
        <Route path="/pos" component={Invoice} />
        <Route path="/customers" component={Customer} />
        <Route path="/notifications" render={() => <div>Notifications</div>} />
        <Route path="/support" render={() => <div>Support</div>} />
        {/* <Settings /> */}
      </Layout>
    </Auxillary>
  );
};

export default app;
