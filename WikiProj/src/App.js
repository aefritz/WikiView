import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import axios from 'axios';
import getData from './Services/services';
import SearchForm from './Components/SearchForm';
import RenderScreen from './Components/RenderScreen';
import getSearchResults from './Services/getSearchResults';
import LoadingPage from './Components/LoadingPage';
import Footer from './Components/Footer';
import About from './Components/About';
import Challenge from './Components/Challenge';
import getRandomPage from './Services/getRandomPage'


class App extends Component {

  constructor() {
    super();
    this.state = {
      linkData: [],
      focusDisplay: false,
      loading: true,
      currentPage: "The Handmaid's Tale",
      suggestionsArray: [],
      formValue: "The Handmaid's Tale"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickChallenge = this.clickChallenge.bind(this);
  }

  async fetchData() {
    this.setState({
      loading: true
    })
    let value = this.state.formValue;
    let data = await getData(value);
    this.setState({
      linkData: data,
      loading: false
    })
  }

  async componentDidMount() {
    this.fetchData();
  }

  async updateSearchSuggestions(value) {
    let suggestionsArray = await getSearchResults(value);
    if (this.state.focusDisplay) {
      this.setState({
        suggestionsArray: suggestionsArray
      });
    }
  }

  handleChange (ev) {
    let value = ev.target.value;
    this.setState({
      formValue: value
    });
    if (value.length > 3) {
      this.setState({
        focusDisplay: true
      })
      this.updateSearchSuggestions(value);
    } else {
      this.setState({
        focusDisplay: false,
        suggestionsArray: []
      })
    }
  }

  handleClick(ev,value) {
    this.setState({
      formValue: value
    })
  }

  handleSubmit (ev) {
    ev.preventDefault();
    let value = this.state.formValue;
    this.setState({
      focusDisplay: false,
      currentPage: value
    })
    this.fetchData();
  }

  async clickChallenge() {
    this.setState({
      loading: true
    })
    let randomPage = await getRandomPage();
    let data = await getData(randomPage);
    this.setState({
      loading: false,
      formValue: randomPage,
      linkData: data,
      currentPage: randomPage
    })
  }

  handleBlur (ev) {
    if (this.state.formValue.length <= 3) {
      this.setState({
        focusDisplay: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="gradient">

          <Header />

          <div className="navBar">
            <Link to="/">Browse</Link>
            <Link to="/about">About</Link>
            <Link to="/challenge">Challenge</Link>
          </div>


          <Route exact path="/" render={() => <div>{this.state.loading && <LoadingPage/>}
          {!this.state.loading && <SearchForm formValue={this.state.formValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleBlur={this.handleBlur} focusDisplay={this.state.focusDisplay} suggestionsArray={this.state.suggestionsArray} handleClick={this.handleClick}/>}
          {!this.state.loading && <RenderScreen linkData={this.state.linkData} formValue={this.state.formValue} handleClick={this.handleClick}/>}</div>}/>
          <Route path = "/about" component={About} />
          <Route path = "/challenge" render={() => <Challenge clickChallenge={this.clickChallenge}/>} />



          <Footer />

        </div>
      </div>
    );
  }
}

export default App;
