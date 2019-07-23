import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import styles from './InputSearch.module.scss';

class InputSearch extends Component {
  state = {
    inputSupplies: [],
    filteredSuppliesState: [],
    focusedItemIndex: '',
    searchForm: '',
    hideSuggestClick: true,
    hideSuggestBlur: true,
    focusOnSuggest: false,
    hoveredItem: ''
  };
  componentDidMount() {
    this.setState({ inputSupplies: this.props.data });
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
        value = copyFiltered[currentItemIndex].materials;
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
      if (
        copyFiltered.findIndex(
          item => item.materials.toLowerCase() === e.target.value.toLowerCase()
        ) === -1
      ) {
        // console.log(
        //   e.target.value.toLowerCase(),
        //   copyFiltered[this.state.focusedItemIndex].materials.toLowerCase()
        // );
        this.props.onPopUpShowDispatch();
      } else if (
        copyFiltered.length > 0 &&
        this.state.focusedItemIndex !== ''
      ) {
        // console.log(
        //   this.state.filteredSuppliesState[this.state.focusedItemIndex]
        // );
        this.props.onAddItemsToBuyDispatch(
          this.state.filteredSuppliesState[this.state.focusedItemIndex]
        );
      }
      this.setState({ searchForm: '', focusedItemIndex: '', hoveredItem: '' });
    }
  };

  onSearchFormhandler = e => {
    this.setState({
      searchForm: e.target.value,
      filteredSuppliesState: this.state.inputSupplies.filter(material =>
        material.materials.toLowerCase().includes(e.target.value.toLowerCase())
      ),
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
      this.props.onAddItemsToBuyDispatch(
        this.state.filteredSuppliesState[this.state.hoveredItem]
      );
    }
    this.setState({
      hideSuggestClick: true,
      searchForm: '',
      focusedItemIndex: ''
    });
  };

  render() {
    const { props } = this;
    let suggestion =
      this.state.searchForm.length > 0 && !this.state.hideSuggestClick ? (
        <div className={styles.autosuggest}>
          {' '}
          {this.state.filteredSuppliesState.map((supply, i) => (
            <div
              onMouseEnter={this.onClickItemsAutoSuggest.bind(null, i, 'enter')}
              onMouseLeave={this.onClickItemsAutoSuggest.bind(null, i, 'leave')}
              key={supply.materials}
              className={[
                styles.suggestItem,
                styles[i === this.state.focusedItemIndex ? 'isActive' : null]
              ].join(' ')}
              // isActive={i === this.state.focusedItemIndex}
            >
              {supply.materials}
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

const mapDispatchToProps = dispatch => ({
  onAddItemsToBuyDispatch: item => dispatch(actions.addItemsToSales(item)),
  onPopUpShowDispatch: () => dispatch(actions.togglePopup(true))
});

export default connect(
  null,
  mapDispatchToProps
)(InputSearch);
