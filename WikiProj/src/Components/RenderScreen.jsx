import React from 'react';

function RenderScreen (props) {
  let {linkData, formValue, handleClick} = props;
  return (
    <div className="renderContainer">
      <p>
      {linkData.map(link => {
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
            color = 'orange';
            break;
          case 4:
            color = 'magenta';
            break;
        }
        let styleObj = {
          fontSize: `${10+(40/(0.1*percentile+0.9))}px`,
          color: `${color}`
        }
        return(
          <span style={styleObj} key={link.value} onClick={(ev) => handleClick(ev,link.value)}>{link.value + " "}</span>
        )})}
      </p>
    </div>
  )
}

export default RenderScreen;
