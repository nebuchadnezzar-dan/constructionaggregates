import React, { Component } from 'react'

import styles from './AdminTable.module.scss'

import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

import Button from '../../../../components/UI/Button/Button'

class AdminTable extends Component {

    state = {
        indexBeingEdited: '',
        roleValue: ''
    }

    triggerEditHandler = (index) => {
        if (index === 'cancel') { this.setState({ indexBeingEdited: '', roleValue: '' }) }
        else {
            this.setState({ indexBeingEdited: +index })
        }

    }

    roleChangeHandler = (e) => {
        this.setState({ roleValue: e.target.value })
    }

    editRoleHandler = () => {
        const roleId = this.props.roles.findIndex(el => el.description === this.state.roleValue)
        const role = this.props.roles[roleId].level
        const userId = this.props.users[this.state.indexBeingEdited].id
        console.log(userId, role)
        this.props.editUserRoleDispatch(userId, role)
    }

    render() {
        // console.log(this.props)

        const tableBody = this.props.users ? this.props.users.map((el, i) => {
            const editButtons = (
                <td>
                    <Button color="violet" click={this.editRoleHandler.bind(null)}>&#10004;</Button>
                    <Button color="red"
                        click={this.triggerEditHandler.bind(null, 'cancel')}>
                        &#10006;
                    </Button>
                </td>
            )
            const normalButton = (
                <td>
                    <Button color="blue"
                        click={this.triggerEditHandler.bind(null, i)}>
                        &#9998;
                    </Button>
                </td>
            )
            const roleDisplay = <td>{el.role}</td>
            const roleEdit = (
                <td>
                    <select defaultValue={el.role} onChange={this.roleChangeHandler}>
                        {this.props.roles.map((el, roleI) => (
                            <option key={roleI} value={el.description}>{el.description}</option>
                        ))}
                    </select>
                </td>
            )
            return (
                <tr className={i % 2 === 0 ? styles.odd : styles.even} key={i}>
                    <td>{el.lastName}</td>
                    <td>{el.firstName}</td>
                    <td>{el.email}</td>
                    <td>{el.contactNo}</td>
                    {i === this.state.indexBeingEdited ? roleEdit : roleDisplay}
                    {i === this.state.indexBeingEdited ? editButtons : normalButton}

                </tr>
            )
        }) : null
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

const mapDispatchToProps = (dispatch) => ({
    editUserRoleDispatch: (id, role) => dispatch(actions.editUserRole(id, role))
})

export default connect(null, mapDispatchToProps)(AdminTable)