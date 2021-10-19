import React, { Component } from 'react';
import './App.css';
import TdlistsContainer from './components/TdlistsContainer'

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>A Simple To-Do List App</h1>
        </div>
        <TdlistsContainer />
      </div>
    );
  }
}

export default App;