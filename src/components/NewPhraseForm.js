import React, { Component } from 'react'

export default class NewPhraseForm extends Component
{
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onSubmit = this.props.onSubmit
  }

  componentDidMount() {
    $('#NewPhraseForm')
      .form({
        fields: {
          shortText: 'empty',
          fullText: 'empty'
        },
        inline: true,
        onSuccess: () => {
          $('.ui.modal').modal('hide')
          this.dispatchSubmitEvent()
        }
      })

    $('#NewPhraseFormModal').modal('onShow', () => {
      this.clearForm()
    })
  }

  clearForm() {
    $('#NewPhraseForm')
      .form('clear')
  }

  submit(event) {
    $('#NewPhraseForm')
      .form('validate form')
    event.preventDefault()
  }

  cancel() {
    this.clearForm()
  }

  dispatchSubmitEvent() {
    const values = $('#NewPhraseForm').form('get values')
    if(this.onSubmit)
      this.onSubmit({values:values})
  }

  render() {
    return (
      <div className="ui modal" id="NewPhraseFormModal">
        <i className="close icon"></i>
        <div className="header">
          Create New Phrase
        </div>
        <div className="content">
          <form className="ui form" id="NewPhraseForm">
            <div className="required field">
              <label>Name</label>
              <div className="ui icon input">
                <input type="text" name="shortText" placeholder="Short text..."/>
                <i className="comment outline icon"></i>
              </div>
            </div>
            <div className="field">
              <label>Folder</label>
              <select name="folderId" className="ui fluid dropdown">
                <option value="-1">(Default)</option>
                {this.props.folders.map((folder) => {
                  return <option key={folder.id} value={folder.id}>{folder.name}</option>
                })}
              </select>
            </div>

            <div className="required field">
              <label>Phrase</label>
              <div className="ui icon input">
                <textarea name="fullText" placeholder="Expanded text..."/>
                <i className="comment outline icon"></i>
              </div>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui cancel button" onClick={this.cancel}>Cancel</div>
          <div className="ui primary submit button" onClick={this.submit}>OK</div>
        </div>
      </div>
    )
  }

}
