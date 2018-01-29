import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
// import List from './List'
import Top from './layouts/Top'
import Left from './layouts/Left'
import Right from './layouts/Right'
import Sandbox from './Sandbox'

class SearchWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    const textValue = this.state.value

    event.preventDefault()
    if (window.ipcRenderer) {
  		console.log(window.ipcRenderer)
  		window.ipcRenderer.send('pasteText', textValue)
  	}

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Search phrases..." value={this.state.value} onChange={this.handleChange} autoFocus="true"/>
      </form>
    )
  }
}

export default SearchWindow
