import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './app/componets/Header';
import AdminRoutes from './admin/components/AdminRoutes';
import UserRoutes from './user/components/UserRoutes';
import PublicRoutes from './app/componets/PublicRoutes';

import { handleAutoLogin } from './user/actions';

const BASE_URL = 'https://nodejs-quiz-app.herokuapp.com/api/v1';

class App extends Component {
  state = {};

  componentDidMount = () => {
    const { jwt } = localStorage;

    if (jwt) {
      this.props.dispatch(
        handleAutoLogin(BASE_URL + '/users/me', jwt, this.props.history)
      );
    } else if (!jwt) {
      this.props.history.push('/users/login');
    }
  };

  handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    const { user } = this.props;
    return (
      <div className='app' style={{ marginTop: '60px' }}>
        <Header user={user} handleLogout={this.handleLogout} />
        {!user.user ? <PublicRoutes /> : ''}

        {user && user.user && user.user.isAdmin ? (
          <AdminRoutes />
        ) : user && user.user && !user.user.isAdmin ? (
          <UserRoutes />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
