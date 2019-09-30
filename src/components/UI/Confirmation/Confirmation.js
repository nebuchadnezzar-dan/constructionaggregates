import React from 'react';

import { connect } from 'react-redux';

import styles from './Confirmation.module.scss';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../Button/Button';

const confirmation = props => {


    const { confirmation, error, proceed, feedback, okClose } = props;

    let modalChild;
    console.log(feedback, error);
    if (confirmation) {
        modalChild = <Auxillary><p>Are you sure you want to proceed?</p>
            <Button color="green" click={proceed} >Yes</Button>
            <Button color="red" click={okClose}>Cancel</Button></Auxillary>;
    } else if (feedback) {
        modalChild = error ? <Auxillary>
            <p>Something went wrong! Please try again.</p>
            <Button color="red" click={okClose}>
                OK
        </Button>
        </Auxillary> : <Auxillary>
                <p>Record succesfully updated/saved!</p>
                <Button color="green" click={okClose}>
                    &#10004;
          </Button>
            </Auxillary>;
    } else if (props.deletePopup) {
        modalChild = <Auxillary>
            <p>Record succesfully deleted!</p>
            <Button color="green" click={okClose}>
                &#10004;
            </Button>
        </Auxillary>
    }
    return <div className={styles.modalBody}> {modalChild}</div>;

};

const mapStateToProps = state => ({
    deletePopup: state.modal.localModalDeleteSettings
});

export default connect(mapStateToProps)(confirmation);