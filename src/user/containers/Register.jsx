import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const BASE_URL = 'http://localhost:8000/api/v1';

class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  };

  handleRegister = e => {
    const { name, email, password, confirmPassword } = this.state.user;

    console.log(this.state, 'register...');

    e.preventDefault();
    if (
      name.trim() &&
      name.length >= 4 &&
      email &&
      email.length >= 8 &&
      (email.includes('@gmail.com') || email.includes('@yahoo.com')) &&
      password.trim() &&
      confirmPassword.trim() &&
      password.length >= 8 &&
      password === confirmPassword
    ) {
      fetch(BASE_URL + '/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data, 'register user data');
          if (data.success) {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
            }
            this.props.dispatch({ type: 'LOGIN', payload: data });
            if (data.user.isAdmin) {
              this.props.history.push('/users/admindashboard');
            } else {
              this.props.history.push('/users/userdashboard');
            }
          }
          if (!data.success) {
            console.log('register user unsuccessful');

            this.props.history.push('/users/login');
          }
        })
        .catch(err => {
          console.log(err, 'register user catch err');
        });
    }
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
        <form onSubmit={this.handleRegister}>
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

          <input type='submit' value='Register' className='btn' />
          <div>
            <span>Already have an account ?</span>
            <Link to='/users/login' className='btn'>
              Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Register);
