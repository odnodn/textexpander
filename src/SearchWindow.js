import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
// import List from './List'
import Sandbox from './Sandbox'
import Autocomplete from 'react-autocomplete'

class SearchWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {value: '', items : [
      { id: 'foo', label: 'foo' },
      { id: 'bar', label: 'bar' },
      { id: 'baz', label: 'baz' },
    ]}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getItemValue = this.getItemValue.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.shouldItemRender = this.shouldItemRender.bind(this)

    if (window.ipcRenderer) {
  		window.ipcRenderer.on('change', (items) =>  {
        this.setState({items: items})
      })
  	}
  }

  shouldItemRender(item, value) {
    return item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
  }

  getItemValue(item) {
    return item.label
  }

  renderItem(item, highlighted) {
    return  <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>
              {item.label}
            </div>
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

  handleSelect(value) {
    this.setState({value})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Autocomplete
          items={this.state.items}
          shouldItemRender={this.shouldItemRender}
          getItemValue={this.getItemValue}
          renderItem={this.renderItem}
          value={this.state.value}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          inputProps={{autoFocus:"true"}}
        />
      </form>
    )
  }
}

export default SearchWindow
