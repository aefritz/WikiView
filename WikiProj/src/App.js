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


class App extends Component {

  constructor() {
    super();
    this.state = {
      linkData: [],
      focusDisplay: false,
      loading: true,
      suggestionsArray: [],
      formValue: "The Handmaid's Tale"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  async updateSearchSuggestions() {
    let value = this.state.formValue;
    let suggestionsArray = await getSearchResults(value);
    if (this.state.focusDisplay) {
      this.setState({
        suggestionsArray: suggestionsArray
      });
    }
  }

  handleChange (ev) {
    let value = ev.target.value;
    if (value.length > 3) {
      this.setState({
        focusDisplay: true
      })
    } else {
      this.setState({
        focusDisplay: false
      })
    }
    this.setState({
      formValue: value
    });
    this.updateSearchSuggestions();
  }

  handleClick(ev,value) {
    this.setState({
      formValue: value
    })
  }

  handleSubmit (ev) {
    ev.preventDefault();
    this.fetchData();
  }

  handleBlur (ev) {
    this.setState({
      focusDisplay: false,
      suggestionsArray: []
    });
  }

  render() {
    return (
      <div className="App">
        <div className="gradient">
          <Header />
          {this.state.loading && <LoadingPage/>}
          {!this.state.loading && <SearchForm formValue={this.state.formValue} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleBlur={this.handleBlur} focusDisplay={this.state.focusDisplay} suggestionsArray={this.state.suggestionsArray} handleClick={this.handleClick}/>}
          {!this.state.loading && <RenderScreen linkData={this.state.linkData} formValue={this.state.formValue} handleClick={this.handleClick}/>}
        </div>
      </div>
    );
  }
}

export default App;
