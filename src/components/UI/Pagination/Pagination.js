import React from 'react';

import styles from './Pagination.module.scss'

import Button from '../Button/Button';

const pagination = props => {
    const { currentpage, pages, color, clickButton, pageIndex } = props;
    let startingPage;
    if (currentpage + 2 <= pageIndex && currentpage - 2 <= 1) {
        startingPage = 1;
    } else if (currentpage + 1 === pages) {
        startingPage = currentpage - 3;
    } else if (currentpage === pages) {
        startingPage = pageIndex - 4;
    }
    else if (currentpage + 2 >= pageIndex || currentpage + 2 <= pages) {
        startingPage = currentpage - 2;
    }
    else {
        startingPage = pageIndex - 4;
    }

    let ind = startingPage;
    let lastInd = startingPage + 4;
    let buttonPages = [];
    if (pages > 4) {
        for (let i = 0; i < 5; i++) {
            buttonPages.push(<Button key={i} hover='green' color={currentpage === ind ? color : null} click={clickButton.bind(null, ind, lastInd)}>{ind}</Button>);
            ind++;
        }
    } else {
        for (let i = 0; i < pages; i++) {
            let curr = i + 1;
            buttonPages.push(<Button key={i} hover='green' color={currentpage === curr ? color : null} click={clickButton.bind(null, curr, pages)}>{curr}</Button>)
        }
    }
    const previous = currentpage !== 1 ? <div className={styles.prev}>
        <Button hover='green' click={clickButton.bind(null, currentpage - 1, lastInd)} >Previous</Button></div> : null;
    const next = currentpage !== pages ? <div className={styles.next}>
        <Button hover='green' click={clickButton.bind(null, currentpage + 1, lastInd)}>Next</Button></div> : null;
    return <div className={styles.pages}>
        {previous}
        {buttonPages}
        {next}
    </div>

}

export default pagination;