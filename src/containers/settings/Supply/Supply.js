import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Head from '../../../components/UI/Head/Head';
import HeadChild from '../../../components/UI/HeadChild/HeadChild';
import Table from '../../../components/UI/Table/Table';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBody from '../../../components/UI/ErrorBody/ErrorBody';
import SupplyForm from '../Supply/SupplyForm/SupplyForm';
import Pagination from '../../../components/UI/Pagination/Pagination';

import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../../store/actions/index';

import styles from './Supply.module.scss';

class Supply extends Component {
  state = {
    view: 'form',
    activeSupp: '',
    addForm: '',
    currentpage: 1,
    pageIndex: 5
  };

  componentDidMount() {
    const route = this.props.location.pathname.match(/[a-zA-z]+/g);
    this.props.activeRouteDispatch(route);
    this.props.fetchSupplyDispatch(1);
  }

  onChangePage = (page, pageIndex) => {
    this.setState({ currentpage: page, pageIndex });
    this.props.fetchSupplyDispatch(page);
  }

  onToggleView = value => {
    this.setState({ view: value });
    if (value === 'form') {
      this.props.fetchSupplyDispatch(this.state.currentpage);
    }
  };
  render() {
    let view = (
      <div className={styles.view}>
        {' '}
        <Table
          data={this.props.activeSupplies}
          cName="orange"
          from="supplySettings"
        />
        <Pagination
          currentpage={this.props.pages < this.state.currentpage ? 1 : this.state.currentpage}
          pages={this.props.pages}
          color='orange'
          pageIndex={this.state.pageIndex}
          clickButton={this.onChangePage}
        />
      </div>
    );
    let tobeShown =
      this.state.view === 'form' ? (
        view
      ) : (<SupplyForm />);
    let mainSupplyBody = this.props.errorFetch ? <ErrorBody>{this.props.children}</ErrorBody> : <div className={styles.supplyWrapperHead}>
      {this.props.children}
      <Head classname="orange" svgname="supply">
        <HeadChild
          forClassName={this.state.view}
          dispatchClickView={this.onToggleView.bind(null, 'view')}
          dispatchClickForm={this.onToggleView.bind(null, 'form')}
          childName="Form"
        >
          SUPPLY
          </HeadChild>
      </Head>
      {tobeShown}
    </div>;
    let mainBodyWithSpinner = this.props.loadingFetch ? <Spinner color="grey" /> : mainSupplyBody
    return (
      <Auxillary>
        {mainBodyWithSpinner}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => ({
  activeSupp: state.supplySettings.activeSupp,
  activeSupplies: state.supplySettings.activeSupplies,
  errorFetch: state.supplySettings.error,
  loadingFetch: state.supplySettings.loading,
  pages: state.supplySettings.pages

});

const mapDispatchToProps = dispatch => ({
  activeRouteDispatch: routes => dispatch(actions.activeRoute(routes)),
  fetchSupplyDispatch: (page) => dispatch(actions.fetchSupply(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorhandler(Supply, axios));
