## Description

WikiView is a tool for visualizing the interconnectedness of topics using public information from Wikipedia.

To use WikiView, simply begin to enter a topic in the search form and related topics will appear in a drop-down. One you select a topic and click Submit, a word cloud will render in which important topics appear in large text and lesser topics appear in smaller text. Select related topics from the word cloud to continue down the wikihole.

## Wireframe

![wireframe](https://github.com/aefritz/Wiki-Project/blob/master/wireframe.png)

## MVP and Post-MVP

### MVP

A tool that takes a user input, finds the Wikipedia page most closely aligned to that topic, and visualizes the topics connected to the original topic in a word-cloud like map.

### Post-MVP

Completed:
* A drop down menu that suggests topic pages as the user begins inputting text
* An option for the user to be directed to a random page and challenged to find a certain target page

Not-yet-completed:
* A log of the user's browse history
* Forward and back buttons

#### Deployed page

http://strong-pear.surge.sh/

## How It Works

WikiView uses data from the [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page).

After the user begins inputting text into the search form, the app starts making requests to the API and returns the top 3 related pages in the suggestions drop-down. Once a topic is selected, Wikiview makes two additional requests, one for that page's hyperlinks and one for that page's text.

Next, a script is run to search the page text for all instances of each hyperlink and return a count. The hyperlink topics are ordered by incidence in the article's body and then the top 100 are passed into the global state to be rendered.

## React Components and State

### Components

![wireframe](https://github.com/aefritz/Wiki-Project/blob/master/components.png)

* App: organizes all subcomponents
* Header: contains the page title
* LoadingPage: CSS navigation to entertain while data loads
* SearchForm: where the user inputs topics
* SearchResults: subcomponent of SearchForm -- drop down menu of search suggestions
* RenderScreen: where text cloud is rendered and displayed
* About: static description of the appear
* Challenge: allows the user to begin browsing from a random page and challenges the user to find their way to the topic 'existentialism'

### State

* linkData: the data to be rendered in a text cloud
* focusDisplay: triggers the drop-down search suggestions if user has inputted enough text
* currentPage: the current topic that the user has visualized in the word cloud
* formValue: the value of the text field in the search form
* suggestionsArray: a set of up to three suggested topics retrieved from the Wikipedia API based on the text that the user has entered in the search form

## Technologies
* React.js
* Vanilla JS
* CSS
* HTML
* Wikipedia API

## Challenges and Workarounds

One problem I encountered involved scoring the relevance of the thousands of topics on a given page in a timely way. A page often had both thousands of words but also thousands of hyperlinked topics whose relevance needed to be decided. At first, I wrote my own search algorithm, but the volume of information that needed parsed over ended up causing the page to crash. Instead, I used a search algorithm from stack overflow that using [Regular Expressions](https://stackoverflow.com/questions/1072765/count-number-of-matches-of-a-regex-in-javascript). This accomplished the task much more quickly without the page crashing.

I had initially planned to create the word cloud using SVG and positioning text semi-randomly on the page. I found this to be a messy approach so I had to retool it. The relevant data was stored in the global state in an array called linkData. Each array element was an object with the link title and the count of that topic in the body of the page, with elements in descending order of importance. Therefore, I decided to construct the word-cloud by first mapping a style to each piece of data in linkData like so ...

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

One technical problem that I was unable to resolve for this version involved hiding the drop-down search suggestions when the text input is blurred. A blur event listener was added to the text field in the form for this specific purpose. However, it came to be that the action of the user clicking one of the topic results blurred the text field and hid the suggestions before the data from those suggestions could be returned to the global state. I tried retooling the hierarchy of the div, form, and input elements and using ev.preventDefault but this steps did not fix the problem. I ended up compromising by simply not hiding the drop-down until the user hits the submit button. I would be interested in revisiting this issue in a later update.
