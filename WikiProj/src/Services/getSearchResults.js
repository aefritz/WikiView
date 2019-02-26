import axios from 'axios';

async function getSearchResults(keyword) {
  let resp = await axios(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=3&srsearch=${keyword}&format=json`);
  let returnArray = [
    (resp.data.query.search[0] === undefined) ? null : resp.data.query.search[0].title,
    (resp.data.query.search[1] === undefined) ? null : resp.data.query.search[1].title,
    (resp.data.query.search[2] === undefined) ? null : resp.data.query.search[2].title]
  return returnArray
}

export default getSearchResults;
