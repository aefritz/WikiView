import axios from 'axios';

async function getData (article) {
  let pageId = 0;
  const linkData = await getWikipediaPageLinks(formatTextForQuery(article));
  const articleText = await getArticleText(pageId);
  let cleanedArray = getCounts (linkData, articleText);
  cleanedArray = sortArray(cleanedArray);
  if (cleanedArray.length > 100) {
    cleanedArray.splice(100, cleanedArray.length - 100);
  }
  return cleanedArray;


  function getCounts(array, text) {
    let returnArray = array;
    returnArray.forEach(function(link) {
      try {
        link.incidence = getStringIncidence(link.value, text);
      }
      catch(e) {
        console.error(e);
        link.incidence = 0;
      }
    });
    return returnArray;
  }

  function sortArray (array) {
      let sortedArray = array.sort((a, b) => (a.incidence >= b.incidence) ? -1 : 1); //credit this
      return sortedArray;
  }


  async function getWikipediaPageLinks (article) {
    let linkData = [];
    let resp = await axios(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=` + article + "&prop=links&pllimit=max&format=json");
    let continueString = (resp.data.continue === undefined) ? null : resp.data.continue.plcontinue;
    pageId = Object.keys(resp.data.query.pages)[0];
    let wikiData = resp.data.query.pages[pageId].links;
    linkData = [...wikiData];
    while (continueString) {
      resp = await axios(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=` + article + "&prop=links&pllimit=max&format=json&plcontinue=" + continueString);
      if (resp.data.continue === undefined) {
        continueString = null;
      } else {
        continueString = resp.data.continue.plcontinue;
      }
      wikiData = resp.data.query.pages[pageId].links;
      linkData = [...linkData, ...wikiData];
    }
    linkData = linkData.map(link => {
      return {value: link.title, incidence: 0};
    });
    return linkData;
  }



  function getStringIncidence (word, text) { //give credit
    const re = new RegExp(word, "g");
    return ((text || '').match(re) || []).length;
  }


  async function getArticleText (pageid) {
    let resp = await axios(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&pageid=` + pageid + `&prop=text&format=json`);
    return resp.data.parse.text['*'];
  }

  function formatTextForQuery (string) {
    let catchPunc = [/ /gi, /'/gi, /"/gi, /,/gi, /;/gi, /</gi, />/gi];
    let swapPunc = ['%20', '%27', '%22', '%2c', '%3b', '%3c', '%3e'];
    for (let i = 0; i<catchPunc.length; i++) {
      string = string.replace(catchPunc[i], swapPunc[i]);
    }
    return string
  }

}

export default getData;
