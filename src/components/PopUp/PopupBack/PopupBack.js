import React from 'react';

import styles from './PopupBack.module.scss';

const popupBack = (props) => (
    <div className={styles.finalPopupBack} onClick={props.close}></div>
)

export default popupBack;