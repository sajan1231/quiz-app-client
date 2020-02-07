import React from 'react';

export default function NoQuiz({ body }) {
  return (
    <div className='notification'>
      <div className='container'>
        <div className='notification is-light is-success'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3 className='title is-4'>{body}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
