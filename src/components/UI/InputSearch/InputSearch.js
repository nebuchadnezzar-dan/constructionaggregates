import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './InputSearch.module.scss';

import Spinner from '../Spinner/Spinner';

class InputSearch extends Component {
  state = {
    inputSupplies: [],
    filteredSuppliesState: [],
    focusedItemIndex: '',
    searchForm: '',
    hideSuggestClick: true,
    hideSuggestBlur: true,
    focusOnSuggest: false,
    hoveredItem: '',
    component: ''
  };
  componentDidMount() {
    this.setState({
      inputSupplies: this.props.data,
      component: this.props.component
    });
  }

  onKeyPressHandler = e => {
    let copyFiltered = [...this.state.filteredSuppliesState];
    if (
      (e.keyCode === 40 || e.keyCode === 38) &&
      e.target.value.length > 0 &&
      copyFiltered.length > 0
    ) {
      e.preventDefault();
      const itemsLength = this.state.filteredSuppliesState.length - 1;
      let copyFocusedItemIndex = this.state.focusedItemIndex;
      let currentItemIndex;
      if (
        itemsLength === -1 ||
        this.state.searchForm.length === 0 ||
        e.target.value.length <= 0
      )
        copyFocusedItemIndex = 0;
      currentItemIndex = copyFocusedItemIndex === '' ? 0 : copyFocusedItemIndex;
      if (e.keyCode === 40) {
        if (
          copyFocusedItemIndex === itemsLength ||
          copyFocusedItemIndex > itemsLength ||
          copyFocusedItemIndex === ''
        ) {
          currentItemIndex = 0;
        } else {
          currentItemIndex++;
        }
      } else if (e.keyCode === 38) {
        if (currentItemIndex === 0 || copyFocusedItemIndex === 0) {
          currentItemIndex = itemsLength;
        } else {
          currentItemIndex = currentItemIndex-- === -1 ? 0 : currentItemIndex;
        }
      }
      let value = e.target.value;
      if (this.state.filteredSuppliesState.length !== -1) {
        value =
          this.state.component === 'supplies'
            ? copyFiltered[currentItemIndex].name
            : `${copyFiltered[currentItemIndex].lastName}, ${
            copyFiltered[currentItemIndex].firstName
            }`;
      }

      if (
        this.state.searchForm.length > 0 ||
        this.state.copyFocusedItemIndex !== -1
      ) {
        this.setState({
          focusedItemIndex: currentItemIndex,
          searchForm: value
        });
      }
    }
    if (e.keyCode === 13) {
      let customerNameFind;
      customerNameFind =
        this.state.component === 'customer'
          ? copyFiltered.findIndex(
            customer =>
              `${customer.lastName}, ${customer.firstName}`.toLowerCase() ===
              e.target.value.toLowerCase()
          )
          : copyFiltered.findIndex(
            item =>
              item.name.toLowerCase() === e.target.value.toLowerCase()
          );
      if (customerNameFind === -1) {
        this.props.onPopUpShowDispatch();
      } else if (
        copyFiltered.length > 0 &&
        this.state.focusedItemIndex !== ''
      ) {
        this.state.component === 'supplies'
          ? this.props.onAddItemsToBuyDispatch(
            this.state.filteredSuppliesState[this.state.focusedItemIndex]
          )
          : this.props.onSetCustomerDispatch(
            this.state.filteredSuppliesState[this.state.focusedItemIndex]
          );
      }
      this.setState({ searchForm: '', focusedItemIndex: '', hoveredItem: '' });
    }
  };

  onSearchFormhandler = e => {
    if (e.target.value.length > 2 && this.props.component === 'customer') {
      this.props.searchCustomerDispatch(e.target.value);
    }
    if (e.target.value.length > 1 && this.props.component === 'supplies') {
      this.props.searchSupplyDispatch(e.target.value)
    }
    // this.setState({inputSupplies: }) 
    const copiedState = this.props.component === 'customer' ? [...this.props.customer] : [...this.props.supplies];
    let filter;
    if (this.state.component === 'supplies')
      filter = copiedState.filter(material =>
        material.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
    if (this.state.component === 'customer')
      filter = copiedState.filter(
        customer =>
          customer.lastName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          customer.firstName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
    this.setState({
      searchForm: e.target.value,
      filteredSuppliesState: filter,
      hideSuggestBlur: false,
      hideSuggestClick: false
    });
  };
  onClickItemsAutoSuggest = (i, from) => {
    let ind;
    if (from === 'leave') {
      ind = '';
    } else if (from === 'enter') {
      ind = i;
    }
    this.setState({ hoveredItem: ind });
  };
  onFocusInput = () => {
    if (this.state.hoveredItem !== '') {
      const tobePassed = this.state.filteredSuppliesState[
        this.state.hoveredItem
      ];
      this.state.component === 'supplies'
        ? this.props.onAddItemsToBuyDispatch(tobePassed)
        : this.props.onSetCustomerDispatch(tobePassed);
    }
    this.setState({
      hideSuggestClick: true,
      searchForm: '',
      focusedItemIndex: ''
    });
  };

  render() {
    const { props } = this;
    let suggestion = this.props.loading ? <div className={styles.suggestItem}><Spinner color="grey" /></div> :
      this.state.searchForm.length > 0 && !this.state.hideSuggestClick ? (
        <div className={styles.autosuggest}>
          {' '}
          {this.state.filteredSuppliesState.map((supply, i) => (
            <div
              onMouseEnter={this.onClickItemsAutoSuggest.bind(null, i, 'enter')}
              onMouseLeave={this.onClickItemsAutoSuggest.bind(null, i, 'leave')}
              key={i}
              className={[
                styles.suggestItem,
                styles[i === this.state.focusedItemIndex ? 'isActive' : null]
              ].join(' ')}
            >
              {this.state.component === 'supplies'
                ? supply.name
                : `${supply.lastName}, ${supply.firstName}`}
            </div>
          ))}
        </div>
      ) : null;
    return (
      <div className={styles.search}>
        <div />
        <span className={styles.searchIcon}>&#9906;</span>
        <input
          className={styles.input}
          placeholder={props.elementConfig.placeholder}
          type="text"
          value={this.state.searchForm}
          onChange={this.onSearchFormhandler}
          onKeyDown={this.onKeyPressHandler}
          onBlur={this.onFocusInput.bind(null, 'blur')}
        />
        {suggestion}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  customer: state.customer.customer,
  supplies: state.supplySettings.activeSupplies,
  loading: state.customer.searchLoading,
  error: state.customer.searchError,
  supplyLoading: state.supplySettings.searchLoading,
  supplyError: state.supplySettings.searchError
});

const mapDispatchToProps = dispatch => ({
  onAddItemsToBuyDispatch: item => dispatch(actions.addItemsToSales(item)),
  onSetCustomerDispatch: customer => dispatch(actions.setCustomer(customer)),
  onPopUpShowDispatch: () => dispatch(actions.togglePopup(true)),
  searchCustomerDispatch: search => dispatch(actions.searchCustomer(1, search)),
  searchSupplyDispatch: search => dispatch(actions.searchSupply(search))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputSearch);
