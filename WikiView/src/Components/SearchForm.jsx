import React from 'react';
import SearchResults from './SearchResults';

function SearchForm (props) {
  let {formValue, focusDisplay, handleChange, handleSubmit, handleBlur, suggestionsArray, handleClick} = props;
  return (
    <div className="formContainer1">
    <div className="formContainer2">
      <form>
        <input name="formValue" type="text" autoComplete="off" value={formValue} placeholder="Find Articles" onChange={handleChange} onBlur={handleBlur}></input>
        <input type="submit" onClick = {handleSubmit}/>
      </form>
    </div>
    {(focusDisplay) ? (
      <SearchResults suggestionsArray={suggestionsArray} handleClick={handleClick}/>
    ) : null}
    </div>
  )
}

export default SearchForm;
