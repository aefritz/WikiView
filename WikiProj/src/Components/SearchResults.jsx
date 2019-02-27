import React from 'react';

function SearchResults (props) {
  let {suggestionsArray, handleClick} = props;
  console.log(suggestionsArray)
  return (
    <div className="searchSuggestions">
      {suggestionsArray.map(suggestion => <p onClick={(ev)=>handleClick(ev,suggestion)}>{suggestion}</p>)}
    </div>
  )
}

export default SearchResults;
