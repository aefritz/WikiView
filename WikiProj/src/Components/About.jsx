import React from 'react';

function About (props) {
  let windowHeight = window.innerHeight - 275;
  return (
    <div className="renderContainer" style={{minHeight: windowHeight, width: '70%'}}>
      <h4>WikiView is a tool for visualizing the interconnectedness of topics using public information from Wikipedia.</h4>

      <h4>To use WikiView, simply begin to enter a topic in the search form and related topics will appear in a drop-down. One you select a topic and click Submit, a word cloud will render in which important topics appear in large text and lesser topics appear in smaller text. Select related topics from the word cloud to continue down the wikihole.</h4>
    </div>
  )
}

export default About;
