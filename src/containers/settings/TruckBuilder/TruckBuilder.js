import React, { Component } from 'react';

import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import * as actions from '../../../store/actions/index';

import Head from '../../../components/UI/Head/Head';
import HeadChild from '../../../components/UI/HeadChild/HeadChild';
import Table from '../../../components/UI/Table/Table';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBody from '../../../components/UI/ErrorBody/ErrorBody';
import Pagination from '../../../components/UI/Pagination/Pagination';
import TruckForm from './TruckForm/TruckForm';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

// import Auxillary from '../../../hoc/Auxillary/Auxillary';

import styles from './TruckBuilder.module.scss';

class TruckBuilder extends Component {
  state = {
    view: 'form',
    currentpage: 1,
    pageIndex: 5
  };

  componentDidMount() {
    this.props.fetchTruckDispatch(1);
    this.props.toggleGlobalModalDispatch();
  }

  onChangePage = (page, pageIndex) => {
    this.setState({ currentpage: page, pageIndex });
    this.props.fetchTruckDispatch(page);
  }

  onToggleView = value => {
    this.setState({ view: value });
    if (value === 'form') {
      this.props.fetchTruckDispatch(this.state.currentpage);
      this.props.toggleGlobalModalDispatch();
    }
  };

  render() {
    const view = (
      <div className={styles.view}>
        <Table
          data={this.props.availableTrucks}
          cName="green"
          from="truckSettings"
        />
        <Pagination
          currentpage={this.props.pages < this.state.currentpage ? 1 : this.state.currentpage}
          pages={this.props.pages}
          color='green'
          pageIndex={this.state.pageIndex}
          clickButton={this.onChangePage} />
      </div>
    );

    let toBeShown =
      this.state.view === 'form' ? (
        view
      ) : <TruckForm />;
    let mainBody = <div className={styles.truckComponent}>
      <Head classname="green" svgname="truck">
        <HeadChild
          forClassName={this.state.view}
          dispatchClickView={this.onToggleView.bind(null, 'view')}
          dispatchClickForm={this.onToggleView.bind(null, 'form')}
          childName="Form"
        >
          TRUCK
    </HeadChild>
      </Head>
      {toBeShown}
    </div>;
    let truckWithError = this.props.fetchError ? <ErrorBody>{this.props.children}</ErrorBody> : mainBody;
    let truckWithSpinner = this.props.fetchLoading ? <Spinner color="grey" /> : truckWithError
    return (truckWithSpinner);
  }
}

const mapStateToProps = state => ({
  availableTrucks: state.truckSettings.availableTrucks,
  pages: state.truckSettings.pages,
  fetchError: state.truckSettings.error,
  fetchLoading: state.truckSettings.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchTruckDispatch: (page) => dispatch(actions.fetchTruck(page)),
  toggleGlobalModalDispatch: () => dispatch(actions.toggleGlobalModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(TruckBuilder, axios));
