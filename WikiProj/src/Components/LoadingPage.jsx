import React from 'react';

function LoadingPage (props) {
  return (
    <div className="pageLoad">
      <h1 className="loadHeader">Loading Page</h1>
      <div className="spiralContainer">
        <div className="loadSpiral">
        </div>
      </div>
    </div>
  )
}

export default LoadingPage;
