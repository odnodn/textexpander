import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import TreeNavigation from './components/TreeNavigation'
import NewPhraseForm from './components/NewPhraseForm'
import TopMenu from './components/TopMenu'


class MainWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
    }
    this.openNewPhraseForm = this.openNewPhraseForm.bind(this)
    this.onSubmitNewPhraseForm = this.onSubmitNewPhraseForm.bind(this)
  }

  openNewPhraseForm() {
    $('.ui.modal')
      .modal('setting', 'closable', false)
      .modal('show')
  }

  onSubmitNewPhraseForm(event) {
    console.log(event.values)
    if (window.ipcRenderer) {
  		console.log(window.ipcRenderer)
  		window.ipcRenderer.send('submitNewPhrase', event.values)
  	}
  }

  render() {
    return (
      <div className="ui container">
        <TopMenu
          onNewPhraseButtonClicked={this.openNewPhraseForm}
        />

        <div className="ui container segment">
          <TreeNavigation treeData={this.state.treeData}/>
        </div>

        {/*hidden Modal*/}
        <div className="ui container">
          <NewPhraseForm onSubmit={this.onSubmitNewPhraseForm}/>
        </div>
      </div>
    )
  }
}

export default MainWindow
