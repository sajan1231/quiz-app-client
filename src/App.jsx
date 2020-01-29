import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Login from './user/containers/Login';
import Register from './user/containers/Register';
import Header from './app/componets/Header';
import AdminDashboard from './admin/containers/AdminDashboard';
import UserDashboard from './user/containers/UserDashboard';

const BASE_URL = 'http://localhost:8000/api/v1';

class App extends Component {
  state = {};

  componentDidMount = () => {
    const { jwt } = localStorage;

    if (jwt) {
      this.fetchData(BASE_URL + '/users/me', jwt);
    } else if (!jwt) {
      this.props.history.push('/users/login');
    }
  };

  fetchData = (url, jwt) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          if (data.user) this.props.dispatch({ type: 'LOGIN', payload: data });
        } else if (!data.success) {
          this.props.history.push('/users/login');
        }
      })
      .catch(err => {
        console.log(err, 'auto login catch err');
      });
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
        {user && !user.user ? <PublicRoutes /> : ''}

        {user && user.user && user.user.isAdmin ? (
          <AdminDashboard />
        ) : user && user.user && !user.user.isAdmin ? (
          <UserDashboard />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path='/users/login' component={Login} />
      <Route path='/users/register' component={Register} />
    </Switch>
  );
};

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
