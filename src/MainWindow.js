import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
// import 'react-sortable-tree/style.css'
import TreeNavigation from './components/TreeNavigation'
import NewPhraseForm from './components/NewPhraseForm'
import NewFolderForm from './components/NewFolderForm'
import TopMenu from './components/TopMenu'
import TreeBuilder from './data/TreeBuilder'


class MainWindow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
      treeData:[],
      folders:[]
    }
    this.openNewPhraseForm = this.openNewPhraseForm.bind(this)
    this.openNewFolderForm = this.openNewFolderForm.bind(this)
    this.onSubmitNewPhraseForm = this.onSubmitNewPhraseForm.bind(this)
    this.onSubmitNewFolderForm = this.onSubmitNewFolderForm.bind(this)
  }

  openNewPhraseForm() {
    $('#NewPhraseFormModal')
      .modal('setting', 'closable', false)
      .modal('show')
  }

  openNewFolderForm() {
    $('#NewFolderFormModal')
      .modal('setting', 'closable', false)
      .modal('show')
  }

  onSubmitNewPhraseForm(event) {
    console.log(event.values)
    if (window.ipcRenderer) {
  		window.ipcRenderer.send('submitNewPhrase', event.values)
  	}
  }

  onSubmitNewFolderForm(event) {
    console.log(event.values)
    if (window.ipcRenderer) {
  		window.ipcRenderer.send('submitNewFolder', event.values)
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
      window.ipcRenderer.on('createdFolder', (event, phrase) => {
        console.log('createdFolder', phrase)
        // TODO: more sophisticated handling rather than loading the whole
        this.loadData()
      })

    }
  }

  buildTree(data) {
    const phrases = data.phrases
    const folders = data.folders

    let treeBuilder = new TreeBuilder()

    folders.forEach((folder) => {
      treeBuilder.addFolder(folder)
    })

    phrases.forEach((phrase) => {
      treeBuilder.addPhrase(phrase)
    })

    return treeBuilder.toTreeData()
  }



  loadData() {
    if (window.ipcRenderer) {
      window.ipcRenderer.once('loadData', (event, data) => {
        const treeData = this.buildTree(data)
        // treeData.push({title: "", children: root})
        this.setState({treeData: treeData, folders:data.folders})
        console.log(treeData, data.folders)
      })
      window.ipcRenderer.send('loadData')
    }
  }

  render() {
    return (
      <div className="ui container">
        <TopMenu
          onNewPhraseButtonClicked={this.openNewPhraseForm}
          onNewFolderButtonClicked={this.openNewFolderForm}
        />

        <div className="ui container segment">
          <TreeNavigation treeData={this.state.treeData}/>
        </div>

        {/*hidden Modals*/}
        <div className="ui container">
          <NewPhraseForm folders={this.state.folders} onSubmit={this.onSubmitNewPhraseForm}/>
        </div>

        <div className="ui container">
          <NewFolderForm folders={this.state.folders} onSubmit={this.onSubmitNewFolderForm}/>
        </div>
      </div>
    )
  }
}

export default MainWindow
