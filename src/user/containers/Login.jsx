import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  };

  handleLogin = e => {
    e.preventDefault();
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <input
            type='email'
            name='email'
            placeholder='exapmle@gmail.com'
            required
            value={email}
            onChange={this.handleInputChange}
          />
          <input
            type='password'
            name='password'
            required
            value={password}
            onChange={this.handleInputChange}
          />
          <input type='submit' value='Login' />
          <div>
            <span>Don't have an account ?</span>
            <Link to='/users/register'>SignUp</Link>
          </div>
        </form>
      </div>
    );
  }
}
