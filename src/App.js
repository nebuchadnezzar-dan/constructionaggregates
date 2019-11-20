import React from 'react';

import { Route } from 'react-router-dom';

import Auxillary from './hoc/Auxillary/Auxillary';
import Layout from './hoc/Layout/Layout';
import Invoice from './containers/Invoice/Invoice';
import Customers from './containers/Customers/Customers';
import Truck from './containers/settings/TruckBuilder/TruckBuilder';
import Supply from './containers/settings/Supply/Supply';
import Transaction from './containers/Invoice/Transactions/Transaction/Transaction';

const app = () => {
  return (
    <Auxillary>
      <Layout>
        <Route path="/" exact render={() => <div>Dashboard</div>} />
        {/* <Route path="/settings" component={Settings} /> */}
        <Route path="/settings/truck" component={Truck} />
        <Route path="/settings/supply" component={Supply} />
        <Route path="/user" render={() => <div>User</div>} />
        <Route path="/pos" exact component={Invoice} />
        <Route path="/pos/:id/invoice" component={Transaction} />
        <Route path="/customers" component={Customers} />
        <Route path="/notifications" render={() => <div>Notifications</div>} />
        <Route path="/support" render={() => <div>Support</div>} />
        {/* <Settings /> */}
      </Layout>
    </Auxillary>
  );
};

export default app;
