import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { withRouter } from 'react-router-dom';
const BASE_URL = 'http://localhost:8000/api/v1';

class Login extends Component {
  state = {
    user: {
      email: '',
      password: ''
    }
  };

  handleLogin = e => {
    e.preventDefault();

    fetch(BASE_URL + '/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'user login data');
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
          console.log('login user unsuccessfull');

          this.props.history.push('/users/login');
        }
      })
      .catch(err => {
        console.log(err, 'login user catch err');
      });
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
          <input type='submit' value='Login' className='btn' />
          <div>
            <span>Don't have an account ?</span>
            <Link to='/users/register' className='btn'>
              SignUp
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, 'login mapstate...');
  return state;
}

export default connect(mapStateToProps)(Login);
