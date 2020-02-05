import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../app/componets/Loader';

import { handleUserRegister } from '../actions';
import validateEmail from '../../utils/helper';

import { BASE_URL } from '../../static';

class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    formValidationError: ''
  };

  handleRegister = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state.user;

    if (password !== confirmPassword) {
      this.handleFormValidation('formValidationError', "password didn't match");
      window.setTimeout(
        () => this.handleFormValidation('formValidationError', ''),
        2000
      );
    } else if (
      name.trim() &&
      name.length >= 3 &&
      email &&
      email.length >= 8 &&
      (email.includes('@gmail.com') || email.includes('@yahoo.com')) &&
      password.trim() &&
      confirmPassword.trim() &&
      password.length >= 8 &&
      password === confirmPassword
    ) {
      const user = { name, email, password };

      this.props.dispatch(
        handleUserRegister(
          BASE_URL + '/users/register',
          user,
          this.props.history
        )
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
    if (name === 'name' && value.length < 4) {
      this.handleFormValidation(
        'formValidationError',
        'Name shold be at least 4 charectors'
      );
    } else if (name === 'email' && !validateEmail(value)) {
      this.handleFormValidation(
        'formValidationError',
        'Enter a valid email address'
      );
    } else if (name === 'password' && value.length < 8) {
      this.handleFormValidation(
        'formValidationError',
        'Password should be at least 8 charectors'
      );
    } else if (name === 'confirmPassword' && value.length < 8) {
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
    const { name, email, password, confirmPassword } = this.state.user;
    const { formValidationError } = this.state;
    const { isLoading, error } = this.props.user;

    console.log(error, 'register');

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
                <form className='box' onSubmit={this.handleRegister}>
                  <div className='field'>
                    <label htmlFor='' className='label'>
                      Username
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        className='input'
                        type='text'
                        name='name'
                        placeholder='bob'
                        required
                        value={name}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-user'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='' className='label'>
                      Email
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        className='input'
                        type='email'
                        name='email'
                        placeholder='exapmle@gmail.com'
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
                    <label htmlFor='' className='label'>
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
                    <label htmlFor='' className='label'>
                      Confirm Password
                    </label>
                    <div className='control has-icons-left'>
                      <input
                        placeholder='*******'
                        className='input'
                        type='password'
                        name='confirmPassword'
                        required
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fa fa-lock'></i>
                      </span>
                    </div>
                  </div>
                  <div className='field'>
                    <label htmlFor='' className='checkbox'>
                      Already have an account?
                    </label>
                    <Link to='/users/login'>
                      <span style={{ margin: '0 10px' }}>Login</span>
                    </Link>
                  </div>
                  <div className='field'>
                    <button
                      className={`button is-success ${
                        isLoading ? 'is-loading' : ''
                      }`}
                    >
                      Sign Up
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
  return state;
}

export default connect(mapStateToProps)(Register);
