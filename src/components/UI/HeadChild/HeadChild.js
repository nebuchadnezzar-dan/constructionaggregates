import React from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../Button/Button';

const headChild = props => (
  <Auxillary>
    <span>
      <Button
        cName={
          props.forClassName === 'form' ? 'headButtonActive' : 'headButton'
        }
        click={props.dispatchClickForm}
      >
        {props.children}
      </Button>
    </span>{' '}
    <span style={{ fontSize: '3rem', fontWeight: '300' }}>|</span>{' '}
    <span>
      <Button
        cName={
          props.forClassName === 'view' ? 'headButtonActive' : 'headButton'
        }
        click={props.dispatchClickView}
      >
        View
      </Button>
    </span>
  </Auxillary>
);

export default headChild;
