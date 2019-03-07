import axios from 'axios';

async function getSearchResults(keyword) {
  let resp = await axios(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=3&srsearch=${keyword}&format=json`);
  let suggestions = resp.data.query.search;
  suggestions = suggestions.map(suggestion => suggestion.title);
  return suggestions;
}

export default getSearchResults;
