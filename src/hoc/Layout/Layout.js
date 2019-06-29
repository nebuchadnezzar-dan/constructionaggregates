import React from 'react';

import Auxillary from '../Auxillary/Auxillary';

const layout = ({ children }) => {
  return (
    <Auxillary>
      <div>Toolbar, Navigation</div>
      <main>{children}</main>
    </Auxillary>
  );
};

export default layout;
