import React from 'react';

export default function Loader() {
  return (
    <div className='container'>
      <div style={{ display: 'grid', height: '40vh', placeItems: 'center' }}>
        <div style={{ color: '#9784ed' }} className='la-ball-pulse'>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
