import React from 'react';

import { Link } from 'react-router-dom';

function Header({ user, handleLogout }) {
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
            {!user.user ? (
              <>
                <Link to='/users/register' className='button is-primary'>
                  <strong>Sign up</strong>
                </Link>

                <Link to='/users/login' className='button is-primary is-light'>
                  Log in
                </Link>
              </>
            ) : (
              <>
                <button className='button is-danger is-rounded'>
                  {user.user.name[0].toUpperCase()}
                </button>
                <Link
                  to='/users/register'
                  className='button is-primary'
                  onClick={handleLogout}
                >
                  <strong>Log out</strong>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
