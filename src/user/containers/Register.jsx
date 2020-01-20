import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    const { name, email, password, confirmPassword } = this.state;

    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <input
            type='text'
            name='name'
            placeholder='exapmle@gmail.com'
            required
            value={name}
            onChange={this.handleInputChange}
          />
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

          <input
            type='password'
            name='confirmPassword'
            required
            value={confirmPassword}
            onChange={this.handleInputChange}
          />

          <input type='submit' value='Register' />
          <div>
            <span>Already have an account ?</span>
            <Link to='/users/login'>Login</Link>
          </div>
        </form>
      </div>
    );
  }
}
