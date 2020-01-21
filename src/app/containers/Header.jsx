import React from 'react';

import { Link } from 'react-router-dom';

export default function Header({ user, handleLogout }) {
  console.log(user, 'header user...');

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
        {!user.user ? (
          <>
            <Link to='/users/login'>
              <button className='btn'>Login</button>
            </Link>
            <Link to='/users/register'>
              <button className='btn'>Register</button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className='btn'>
              Logout
            </button>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 7px',
                margin: '0 10px',
                borderRadius: '50%',
                background: 'red'
              }}
            >
              {user.user.name[0].toUpperCase()}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
