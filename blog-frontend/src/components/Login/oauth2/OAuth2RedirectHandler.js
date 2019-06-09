import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const { AuthActions } = this.props;
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');
        AuthActions.socialLogin(token);
        if (token) {
            return <Redirect to={{
                pathname: "/pages",
                state: { from: this.props.location }
            }} />;
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: {
                    from: this.props.location,
                    error: error
                }
            }} />;
        }
    }
}

export default connect(
    state => ({
        loading: state.pender.pending["auth/LOGIN"],
        loginError: state.pender.failure["auth/LOGIN"],
        isAuthenticated: state.auth.get("isAuthenticated")
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(OAuth2RedirectHandler);

