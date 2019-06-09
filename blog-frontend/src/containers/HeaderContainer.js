import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as authActions from "store/modules/auth";
import Header from '../components/common/Header/Header';

class HeaderContainer extends Component {

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({ showModal: this.props.showModal });
    }
  }

  handleLogin = async (username, password, rememberMe = false) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.login(username, password);      
    } catch (e) {
      console.log("error log :" + e);
    }
  };

  handleLogout = () => {
    const { AuthActions } = this.props;
    AuthActions.logout();    
  };

  render() {
    const { isAuthenticated } = this.props;
    return (  
      <Header isAuthenticated={isAuthenticated} onLogout={this.handleLogout} />
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.auth.get("isAuthenticated")
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(HeaderContainer);

