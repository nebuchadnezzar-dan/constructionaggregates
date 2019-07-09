import React from 'react';

import { connect } from 'react-redux';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../Button/Button';

import * as actions from '../../../store/actions/index';

const headChild = props => (
  <Auxillary>
    <span>
      <Button cName="headButton" click={props.toggleView.bind(null, 'form')}>
        {props.children}
      </Button>
    </span>{' '}
    <span style={{ fontSize: '3rem', fontWeight: '300' }}>|</span>{' '}
    <span>
      <Button cName="headButton" click={props.toggleView.bind(null, 'view')}>
        View
      </Button>
    </span>
  </Auxillary>
);

const mapDispatchToProps = dispatch => ({
  toggleView: val => dispatch(actions.toggleViewTruck(val))
});

export default connect(
  null,
  mapDispatchToProps
)(headChild);
