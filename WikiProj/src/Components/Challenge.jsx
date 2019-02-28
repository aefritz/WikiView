import React from 'react';
import {Link} from 'react-router-dom';

function Challenge (props) {
  let {clickChallenge} = props;
  let windowHeight = window.innerHeight - 275;
  return (
    <div className="renderContainer" style={{minHeight: windowHeight}}>
      <h4>Challenge:</h4>
      <h4>Starting from a random page, find your way to 'existentialism'</h4>
      <Link to="/" onClick={clickChallenge}>Begin</Link>
    </div>
  )
}

export default Challenge;
