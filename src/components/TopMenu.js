import React, { Component } from 'react'

export default class TopMenu extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    $('#NewButton .ui.dropdown').dropdown()
  }

  renderFloatingButton() {
    return (
      <div className="ui blue buttons" id="NewButton">
        <div className="ui button" onClick={this.props.onNewPhraseButtonClicked}>New</div>
        <div className="ui floating dropdown icon button">
          <i className="dropdown icon"></i>
          <div className="menu">
            <div className="item" onClick={this.props.onNewPhraseButtonClicked}><i className="comment outline icon"></i> New Phrase</div>
            <div className="item" onClick={this.props.onNewFolderButtonClicked}><i className="folder open outline icon"></i> New Folder</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return(
      <div className="ui stackable menu">
        <div className="ui container">
          <a className="item">
            {this.renderFloatingButton()}
          </a>
          <div className="right item">
            <div className="ui input"><input type="text" placeholder="Search..."/></div>
          </div>
        </div>
      </div>
    )
  }
}
