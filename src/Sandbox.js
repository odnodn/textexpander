import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import List from './List'
import Site from './Sandbox/Site'
import Menu from './Sandbox/Menu'
import Button from './Sandbox/Button'
import Input from './Sandbox/Input'

export default class Sandbox extends Component {
  render() {
    return (
      <div className="ui container">

        <h1>Theming Examples</h1>
        <h2 className="ui dividing header">Site</h2>
        <Site/>

        <h2 className="ui dividing header">Menu</h2>
        <Menu/>

        <h2 className="ui dividing header">Buttons</h2>
        <Button/>

        <h2 className="ui dividing header">Input</h2>
        <Input/>

      </div>

    );
  }
}
