import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div
        className='header'
        style={{
          width: '60%',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>QUIZY</span>
        <div>
          <Link to='/users/login'>
            <button>Login</button>
          </Link>
          <Link to='/users/register'>
            <button>Register</button>
          </Link>
        </div>
      </div>
    );
  }
}
