import React from 'react';

function NotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '5em', fontWeight: 'bold' }}>
        4
        <span role="img" aria-label="0">
          😯
        </span>
        4
      </div>
      <div className="bold">page not found</div>
    </div>
  );
}

export default React.memo(NotFound);
