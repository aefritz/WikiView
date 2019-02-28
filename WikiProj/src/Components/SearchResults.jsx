import React from 'react';

function SearchResults (props) {
  let {suggestionsArray, handleClick} = props;
  return (
    <div className="searchSuggestions">
      {suggestionsArray.map(suggestion => <p key={suggestion} onClick={(ev)=>handleClick(ev,suggestion)}>{suggestion}</p>)}
    </div>
  )
}

export default SearchResults;
