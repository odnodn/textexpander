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
      // treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
      treeData:[]
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
  		window.ipcRenderer.send('submitNewPhrase', event.values)
  	}
  }

  componentDidMount() {
    this.loadData()
    if (window.ipcRenderer) {
      // created phrase
      window.ipcRenderer.on('createdPhrase', (event, phrase) => {
        console.log('createdPhrase', phrase)
        // TODO: more sophisticated handling rather than loading the whole
        this.loadData()
      })
    }
  }

  loadData() {
    if (window.ipcRenderer) {
      window.ipcRenderer.once('loadData', (event, phrases) => {
        let treeData = []
        for(let i = 0; i < phrases.length; i++)
        {
          const phrase = phrases[i]
          treeData.push({title: phrase.shortText})
        }
        // treeData.push({title: "", children: root})
        this.setState({treeData: treeData})
        console.log(treeData)
      })
  		window.ipcRenderer.send('loadData')
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
