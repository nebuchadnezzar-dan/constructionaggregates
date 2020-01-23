import React, { Component } from 'react'

import styles from './Admin.module.scss'

import * as actions from '../../../store/actions/index'

import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import AdminTable from './AdminTable/AdminTable'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Pagination from '../../../components/UI/Pagination/Pagination'

class Admin extends Component {

    state = {
        currentpage: 1,
        pageIndex: 5,
        sortValue: 'date',
        searchBarValue: ''
    }

    componentDidMount() {
        this.props.fetchUsersDispatch(1)
    }

    onChangePage = (page, pageIndex) => {
        this.setState({ currentpage: page, pageIndex });
        // this.props.fetchCustomerCreditHistoryDispatch(this.props.data.id, page, this.state.shownHistory, this.state.sortValue);
        this.props.fetchUsersDispatch(1)
    }

    onChangeSearchBarHandler = (e) => {
        this.setState({ searchBarValue: e.target.value })
    }

    onSearchUserHandler = () => {
        this.props.searchUsersDispatch(this.state.searchBarValue, this.state.currentpage)
    }




    render() {
        const table = false ? <Spinner color="grey" /> : <AdminTable users={this.props.users} roles={this.props.roles} />
        return (
            <div className={styles.Admin}>
                <div className={styles.searchWrapper}>
                    <div className={styles.search}>
                        <span className={styles.searchIcon}>&#9906;</span>
                        <input
                            className={styles.input}
                            placeholder="Customer"
                            type="text"
                            value={this.state.searchBarValue}
                            onChange={this.onChangeSearchBarHandler}
                        // onKeyDown={this.onSearchPress}
                        />
                    </div>
                    <Button color="violet"
                        click={this.onSearchUserHandler}
                    // disabled={this.state.customerSearchForm.length < 3 ? true : false}
                    >
                        Search
                    </Button>
                </div>
                {this.props.users.length > 0 ? table : <div>Sorry, no matches found...</div>}
                <Pagination
                    currentpage={this.props.pages < this.state.currentpage ? 1 : this.state.currentpage}
                    pages={this.props.pages}
                    color='violet'
                    pageIndex={this.state.pageIndex}
                    clickButton={this.onChangePage}
                />

            </div>
        )
    }


}

const mapStateToProps = (state) => ({
    loading: state.users.loading,
    error: state.users.error,
    users: state.users.users,
    roles: state.users.roles,
    pages: state.users.pages
})

const mapDispatchToProps = (dispatch) => ({
    fetchUsersDispatch: (page) => dispatch(actions.fetchUser(page)),
    searchUsersDispatch: (keyword, page) => dispatch(actions.searchUsers(keyword, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)