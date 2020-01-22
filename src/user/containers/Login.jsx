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
      <section className='hero is-primary is-fullheight'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-centered'>
              <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
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
                      className='button is-success'
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
  console.log(state, 'login mapstate...');
  return state;
}

export default connect(mapStateToProps)(Login);

/*
// ===========================================
// <div>
//   <form onSubmit={this.handleLogin}>
//     <input
//       type='email'
//       name='email'
//       placeholder='exapmle@gmail.com'
//       required
//       value={email}
//       onChange={this.handleInputChange}
//     />
//     <input
//       type='password'
//       name='password'
//       required
//       value={password}
//       onChange={this.handleInputChange}
//     />
//     <input type='submit' value='Login' className='btn' />
//     <div>
//       <span>Don't have an account ?</span>
//       <Link to='/users/register' className='btn'>
//         SignUp
//       </Link>
//     </div>
//   </form>
// </div>
// ===========================================
*/
