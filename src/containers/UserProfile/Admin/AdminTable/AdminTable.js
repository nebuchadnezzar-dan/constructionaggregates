import React, { Component } from 'react'

import styles from './AdminTable.module.scss'

import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'

import Button from '../../../../components/UI/Button/Button'
import Modal from '../../../../components/UI//Modal/Modal'
import Confirmation from '../../../../components/UI/Confirmation/Confirmation'
import Spinner from '../../../../components/UI/Spinner/Spinner'

class AdminTable extends Component {

    state = {
        indexBeingEdited: '',
        roleValue: '',
        feedback: false,
        confirmation: false,
    }

    onSendPostRequest = async () => {
        this.props.globalPopupDispatch();
        if (this.state.button === 'edit') {
            const roleId = this.props.roles.findIndex(el => el.description === this.state.roleValue)
            const role = this.props.roles[roleId].level
            const userId = this.props.users[this.state.indexBeingEdited].id
            this.props.editUserRoleDispatch(userId, role)
            this.props.localPopupDispatchDispatch({ from: 'localModalAdminUserRoleEdit', value: true, global: true });
        } else {
            await this.props.localPopupDispatchDispatch({ from: 'localModalDeleteSettings', value: true, global: true });
        }
        this.setState({ confirmation: false, feedback: true, indexBeingEdited: '', roleValue: '' });

    }

    onCloseModalHandler = () => {
        this.props.globalPopupDispatch();
        this.setState({ confirmation: false, feedback: false });
    }

    onConfirm = (button) => {
        this.setState({ confirmation: true, feedback: false, button });
        this.props.localPopupDispatchDispatch({ from: 'localModalAdminUserRoleEdit', value: true, global: true });

    }

    triggerEditHandler = (index, role) => {
        if (index === 'cancel') { this.setState({ indexBeingEdited: '', roleValue: '' }) }
        else {
            this.setState({ indexBeingEdited: +index, roleValue: role })
        }

    }

    roleChangeHandler = (e) => {
        this.setState({ roleValue: e.target.value })
    }

    editRoleHandler = () => {
        const roleId = this.props.roles.findIndex(el => el.description === this.state.roleValue)
        const role = this.props.roles[roleId].level
        const userId = this.props.users[this.state.indexBeingEdited].id
        this.props.editUserRoleDispatch(userId, role)
    }

    render() {
        // console.log(this.props)
        const modalBody = (this.props.localPopup && this.props.globalPopup) || this.props.deletedModal ?
            <Modal>
                <Confirmation
                    confirmation={this.state.confirmation}
                    error={this.props.error}
                    proceed={this.onSendPostRequest.bind(null)}
                    feedback={this.state.feedback}
                    okClose={this.onCloseModalHandler.bind(null)}

                />
            </Modal>
            : null;

        const tableBody = this.props.users ? this.props.users.map((el, i) => {
            const editButtons = (
                <td>
                    <Button color="violet" click={this.onConfirm.bind(null, 'edit')}>&#10004;</Button>
                    <Button color="red"
                        click={this.triggerEditHandler.bind(null, 'cancel')}>
                        &#10006;
                    </Button>
                </td>
            )
            const normalButton = (
                <td>
                    <Button color="blue"
                        click={this.triggerEditHandler.bind(null, i, el.role)}>
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

        const mainBody = this.props.loading ? <Spinner color="grey" /> : (
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
                </tbody>
            </table>
        )

        return (
            <div className={styles.AdminTable}>
                {modalBody}
                {mainBody}
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    loading: state.users.loading,
    localPopup: state.modal.localModalAdminUserRoleEdit,
    globalPopup: state.modal.showGlobalModal,
    deletedModal: state.modal.localModalDeleteSettings,
    error: state.users.putError
})

const mapDispatchToProps = (dispatch) => ({
    editUserRoleDispatch: (id, role) => dispatch(actions.editUserRole(id, role)),
    globalPopupDispatch: () => dispatch(actions.toggleGlobalModal()),
    localPopupDispatchDispatch: local => dispatch(actions.toggleLocalPopupSettings(local))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminTable)