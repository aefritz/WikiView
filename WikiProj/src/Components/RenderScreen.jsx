import React from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

function shuffle(array) {
  let shuffledArray = array.map(a => "");
  for (let i = array.length-1; i>=0; i--) {
    let arrayPosition;
    if (i%2 === 0) {
      arrayPosition = array.length - (((array.length) - i) / 2);
      if (array.length % 2 === 1) {
        arrayPosition += 0.5;
      }
    }
    if (i%2 === 1) {
      arrayPosition = ((array.length - 1) - i) / 2;
      if (array.length % 2 === 1) {
        arrayPosition -= 0.5;
      }
    }
    shuffledArray[arrayPosition] = array[i];
  }
  if (array.length % 2 === 1) {
    shuffledArray.splice((array.length - 1)/2, 1);
  }
  return shuffledArray;
}

function RenderScreen (props) {
  let windowHeight = window.innerHeight - 280;
  let matchesLevelOne = useMediaQuery('(max-width:720px)');
  let matchesLevelTwo = useMediaQuery('(min-width:570px)');
  let {linkData, formValue, handleClick} = props;
  linkData = linkData.map(link => {
    let percentile = 100*linkData.indexOf(link)/linkData.length;
    let index = linkData.indexOf(link) % 5;
    let color;
    switch(index) {
      case 0:
        color = 'rgb(255,100,100)';
        break;
      case 1:
        color = 'blue';
        break;
      case 2:
        color = 'green';
        break;
      case 3:
        color = 'brown';
        break;
      case 4:
        color = 'magenta';
        break;
    };
    let styleObj = {
      fontSize: `${10+(40/(0.1*percentile+0.9))}px`,
      color: `${color}`
    };
    if (matchesLevelOne) {
      styleObj = {
        fontSize: `${10+(15/(0.1*percentile+0.9))}px`,
        color: `${color}`
      }
    }
    return {value: link.value, style: styleObj};
  });
  if (matchesLevelTwo) {
    linkData = shuffle(linkData);
  }
  return (
    <div className="renderContainer" style={{minHeight: windowHeight}}>
      {linkData.map(link => <span style={link.style} key={link.value} onClick={(ev) => handleClick(ev,link.value)}>{link.value + "  "}</span>)}
    </div>
  )
}

export default RenderScreen;
