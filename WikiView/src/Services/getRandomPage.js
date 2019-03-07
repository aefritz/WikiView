import axios from 'axios';

async function getRandomPage() {
  let resp = await axios('https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1');
  return resp.data.query.random[0].title;
}

export default getRandomPage;
