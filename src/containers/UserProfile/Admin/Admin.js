import React, { Component } from 'react'

import styles from './Admin.module.scss'

import Button from '../../../components/UI/Button/Button'

class Admin extends Component {


    render() {
        return (
            <div className={styles.Admin}>
                <div className={styles.searchWrapper}>
                    <div className={styles.search}>
                        <span className={styles.searchIcon}>&#9906;</span>
                        <input
                            className={styles.input}
                            placeholder="Customer"
                            type="text"
                        // value={this.state.customerSearchForm}
                        // onChange={this.searchFormHandler}
                        // onKeyDown={this.onSearchPress}
                        />
                    </div>
                    <Button color="violet"
                    // click={this.onSearchClick} 
                    // disabled={this.state.customerSearchForm.length < 3 ? true : false}
                    >
                        Search
                    </Button>
                </div>
                <div className={styles.AdminTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email</th>
                                <th>Contact No.</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.odd}>
                                <td>Admin</td>
                                <td>Super</td>
                                <td>superadmin@admin.com</td>
                                <td>+6390123439061</td>
                                <td>Admin</td>
                                <td><Button>A</Button></td>
                            </tr>
                            <tr className={styles.even}>
                                <td>Admin</td>
                                <td>Super</td>
                                <td>superadmin@admin.com</td>
                                <td>+6390123439061</td>
                                <td>Admin</td>
                                <td><Button>A</Button></td>
                            </tr>
                            <tr className={styles.odd}>
                                <td>Admin</td>
                                <td>Super</td>
                                <td>superadmin@admin.com</td>
                                <td>+6390123439061</td>
                                <td>Admin</td>
                                <td><Button>A</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}

export default Admin