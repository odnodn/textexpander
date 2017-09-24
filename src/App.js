import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import List from './List'
import Top from './layouts/Top'
import Left from './layouts/Left'
import Right from './layouts/Right'
import Sandbox from './Sandbox'


class App extends Component {
  render() {
    return (
      <div className="ui container">
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
          <Top/>
          </div>
        </div>
        <div className="row">
          <div className="five wide column">
            <Left/>
          </div>
          <div className="eleven wide column">
            <Right/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
