import React, { Component } from 'react'

import styles from './AdminTable.module.scss'


import Button from '../../../../components/UI/Button/Button'

class AdminTable extends Component {

    render() {
        // console.log(this.props)
        const tableBody = this.props.users ? this.props.users.map((el, i) => (
            <tr className={i % 2 === 0 ? styles.odd : styles.even} key={i}>
                <td>{el.lastName}</td>
                <td>{el.firstName}</td>
                <td>{el.email}</td>
                <td>{el.contactNo}</td>
                <td>{el.role}</td>
                <td><Button color="violet">&#128065;</Button></td>
            </tr>
        )) : null
        // const tableBody = <tr>no</tr>

        return (
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
                        {tableBody}
                        {/* <tr className={styles.odd}>
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
                            <td><Button color="violet">&#128065;</Button></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default AdminTable