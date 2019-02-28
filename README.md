## Description

WikiView is a tool for visualizing the interconnectedness of topics using public information from Wikipedia.

To use WikiView, simply begin to enter a topic in the search form and related topics will appear in a drop-down. One you select a topic and click Submit, a word cloud will render in which important topics appear in large text and lesser topics appear in smaller text. Select related topics from the word cloud to continue down the wikihole.

#### Deployed page

http://strong-pear.surge.sh/

## How It Works

WikiView uses data from the [Wikipedia API] (https://www.mediawiki.org/wiki/API:Main_page).

After the user begins inputting text into the search form, the app starts making requests to the API and returns the top 3 related pages in the suggestions drop-down. Once a topic is selected, Wikiview makes two additional requests, one for that page's hyperlinks and one for that page's text.

Next, a script is run to search the page text for all instances of each hyperlink and return a count. The hyperlink topics are ordered by incidence in the article's body and then the top 100 are passed into the global state to be rendered.

## Technologies
* React.js
* Vanilla JS
* CSS
* HTML
* Wikipedia API

## Challenges and Workarounds

One problem I encountered involved scoring the relevance of the thousands of topics on a given page in a timely way. A page often had both thousands of words but also thousands of hyperlinked topics whose relevance needed to be decided. At first, I wrote my own search algorithm, but the volume of information that needed parsed over ended up causing the page to crash. Instead, I used a search algorithm from stack overflow that using [Regular Expressions] (https://stackoverflow.com/questions/1072765/count-number-of-matches-of-a-regex-in-javascript). This accomplished the task much more quickly without the page crashing.

I had initially planned to create the word cloud using SVG and semi-random positioning of text. I found this to be a messy approach so I had to retool it. The relevant data was stored in the global state in an array called linkData. Each array element was an object with the link title and the count of that topic in the body of the page, with elements in descending order of importance. Therefore, I decided to construct the word-cloud by first mapping a style to each piece of data in linkData like so ...

```
{value: value, incidence: incidence} => {value: value, style: styleObject}

```
and then resorting the array using the following algorithm:

```
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
```
The function rearranges the elements of an array like so:

```
[1, 2, 3, 4, 5, 6, 7, 8, 9] => [8, 6, 4, 2, 1, 3, 5, 7, 9]
```

This strategy allows the most important topics to appear in the middle of the cloud.

## Next Steps

Right now, the app processes most topic requests (95%) without issue. However, every few requests throws a "Nothing to repeat" error in the RegExp search in services.js. I am looking into the root of this issue. My research right now suggests that there might be improper characters being passed as an argument.

The next step I would like to take is to integrate a challenge into the app. Users might, for example, be taken to a random page and asked to find their way to a target page (say 'existentialism') in a minimum number of steps.
