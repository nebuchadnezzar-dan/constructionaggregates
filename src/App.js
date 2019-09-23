import React from 'react';

import { Route } from 'react-router-dom';

import Auxillary from './hoc/Auxillary/Auxillary';
import Layout from './hoc/Layout/Layout';
import Invoice from './containers/Invoice/Invoice';
import Customer from './containers/Customer/Customer';
import Truck from './containers/settings/TruckBuilder/TruckBuilder';
import Supply from './containers/settings/Supply/Supply';

const app = () => {
  return (
    <Auxillary>
      <Layout>
        <Route path="/" exact render={() => <div>Dashboard</div>} />
        {/* <Route path="/settings" component={Settings} /> */}
        <Route path="/settings/truck" component={Truck} />
        <Route path="/settings/supply" component={Supply} />
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
