import React from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../Button/Button';

// make this class to handle the active view/form
const headChild = props => {
  const childName = props.childName;
  const noChild = props.noChild

  const headc = (
    <Auxillary>
      <span style={{ fontSize: '3rem', fontWeight: '300' }}>|</span>{' '}
      <span>
        <Button
          cName={
            props.forClassName === 'view' ? 'headButtonActive' : 'headButton'
          }
          click={props.dispatchClickView}
        >
          {childName}
        </Button>
      </span>
    </Auxillary>
  )

  return (
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
      {!noChild ? headc : null}
    </Auxillary>
  );
};

export default headChild;
