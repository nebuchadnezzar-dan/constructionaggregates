import React from 'react';

import Auxillary from '../Auxillary/Auxillary';

import './Layout.module.scss';

const layout = ({ children }) => {
  return (
    <Auxillary>
      <div>Toolbar, Navigation</div>
      <main>{children}</main>
    </Auxillary>
  );
};

export default layout;
