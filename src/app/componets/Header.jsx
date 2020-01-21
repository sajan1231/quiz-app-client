import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <nav
        className='navbar is-dark'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-brand'>
          <h1
            className='navbar-item'
            style={{
              fontSize: '30px',
              fontWeight: 'bold'
            }}
          >
            QUIZ APP
          </h1>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <Link to='/users/register' className='button is-primary'>
                <strong>Sign up</strong>
              </Link>

              <Link to='/users/login' className='button is-primary is-light'>
                Log in
              </Link>

              {/* <Link to='/users/register' className='button is-primary'>
                <strong>Log out</strong>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
