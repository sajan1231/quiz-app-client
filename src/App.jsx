import React, { Component } from 'react';
import './assets/stylesheets/App.css';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from './app/containers/Home';
import Login from './user/containers/Login';
import Register from './user/containers/Register';
import ListQuiz from './quiz/containers/ListQuiz';
import Header from './app/containers/Header';
import Footer from './app/containers/Footer';

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
        console.log(data, 'user auto login data');
        if (data.success) {
          this.props.dispatch({ type: 'LOGIN', payload: data.user });
          this.props.history.push('/');
        }
        if (!data.success) {
          this.props.history.push('/users/login');
        }
      })
      .catch(err => {
        console.log(err, 'catch err');
      });
  };

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />{' '}
          <Route exact path='/users/login' component={Login} />{' '}
          <Route exact path='/users/register' component={Register} />{' '}
          <Route exact path='/users/list-quiz' component={ListQuiz} />{' '}
        </Switch>{' '}
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(App);
