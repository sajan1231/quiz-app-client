import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../app/componets/Loader';

import { handleUserLogin } from '../actions';
import validateEmail from '../../utils/helper';

import { BASE_URL } from '../../static';

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    },
    formValidationError: ''
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state.user;
    if (email && validateEmail(email) && password && password.length >= 8) {
      this.props.dispatch(
        handleUserLogin(
          BASE_URL + '/users/login',
          this.state.user,
          this.props.history
        )
      );
    } else if (!email) {
      this.handleFormValidation('formValidationError', 'Email is required');
    } else if (!validateEmail(email)) {
      this.handleFormValidation('formValidationError', 'Invalid email address');
    } else if (!password) {
      this.handleFormValidation('formValidationError', 'Password is required');
    } else if (password < 8) {
      this.handleFormValidation(
        'formValidationError',
        'Password should be at least 8 charectors'
      );
    }
  };

  updateState = (name, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  };

  handleFormValidation = (error, value) => {
    this.setState({
      [error]: value
    });
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    if (name === 'email' && !validateEmail(value)) {
      this.handleFormValidation('formValidationError', 'Invalid email address');
    } else if (name === 'password' && value.length < 8) {
      this.handleFormValidation(
        'formValidationError',
        'Password should be at least 8 charectors'
      );
    } else {
      this.handleFormValidation('formValidationError', '');
      this.updateState(name, value);
    }
    this.updateState(name, value);
  };

  render() {
    const { email, password } = this.state.user;
    const { isLoading, error } = this.props;
    const { formValidationError } = this.state;

    return (
      <section className='hero is-primary is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                {formValidationError ? (
                  <label
                    htmlFor=''
                    className='label'
                    style={{ color: '#b10000', textAlign: 'center' }}
                  >
                    {formValidationError}
                  </label>
                ) : error ? (
                  <label
                    htmlFor=''
                    className='label'
                    style={{
                      color: '#b10000',
                      textAlign: 'center',
                      textTransform: 'capitalize'
                    }}
                  >
                    {error}
                  </label>
                ) : (
                  ''
                )}
                <form action='' className='box'>
                  <div className='field'>
                    <label htmlFor='email' className='label'>
                      Email
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        type='email'
                        placeholder='e.g. bobsmith@gmail.com'
                        className='input'
                        name='email'
                        required
                        value={email}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-envelope'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='password' className='label'>
                      Password
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        placeholder='*******'
                        className='input'
                        type='password'
                        name='password'
                        required
                        value={password}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-lock'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='' className='checkbox'>
                      Don't have an account?
                    </label>
                    <Link to='/users/register'>
                      <span style={{ margin: '0 10px' }}>SignUp</span>
                    </Link>
                  </div>
                  <div className='field'>
                    <button
                      className={`button is-success ${
                        isLoading ? 'is-loading' : ''
                      }`}
                      onClick={this.handleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}
export default connect(mapStateToProps)(Login);
