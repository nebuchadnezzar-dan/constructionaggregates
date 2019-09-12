import React, { Component } from 'react';

import styles from './withErrorHandler.module.scss';

import Auxillary from '../Auxillary/Auxillary';
import PopUp from '../../components/PopUp/PopUp';
import PopupBack from '../../components/PopUp/PopupBack/PopupBack';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() {
            super();
            this.state = {};
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res,
                error => {
                    console.log(error);
                    this.setState({ error: error });
                });

        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
            // console.log(['willunmount'], this.reqInterceptor, this.resInterceptor);
        }

        onClose = () => {
            this.setState({ error: null })
        }

        render() {
            const showModal = this.state.error ? <Auxillary>
                <div className={styles.popup} >
                    <PopUp type="simple" close={this.onClose.bind(null)}>Test</PopUp>
                </div>
                <PopupBack close={this.onClose.bind(null)} />
            </Auxillary> : null;
            return <Auxillary>
                <WrappedComponent {...this.props} >
                    {showModal}
                </WrappedComponent>
            </Auxillary>
        }
    }
}

export default withErrorHandler