import React, { Component } from 'react'

export default class NewFolderForm extends Component
{
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onSubmit = this.props.onSubmit
  }

  componentDidMount() {
    $('#NewFolderForm')
      .form({
        fields: {
          name: 'empty'
        },
        inline: true,
        onSuccess: () => {
          $('.ui.modal').modal('hide')
          this.dispatchSubmitEvent()
        }
      })

    $('#NewFolderFormModal').modal('onShow', () => {
      this.clearForm()
    })
  }

  clearForm() {
    $('#NewFolderForm')
      .form('clear')
  }

  submit(event) {
    $('#NewFolderForm')
      .form('validate form')
    event.preventDefault()
  }

  cancel() {
    this.clearForm()
  }

  dispatchSubmitEvent() {
    const values = $('#NewFolderForm').form('get values')
    if(this.onSubmit)
      this.onSubmit({values:values})
  }

  render() {
    return (
      <div className="ui modal" id="NewFolderFormModal">
        <i className="close icon"></i>
        <div className="header">
          Create New Folder
        </div>
        <div className="content">
          <form className="ui form" id="NewFolderForm">
            <div className="required field">
              <label>Name</label>
              <div className="ui icon input">
                <input type="text" name="name" placeholder="Name of the folder"/>
                <i className="comment outline icon"></i>
              </div>
            </div>
            <div className="required field">
              <label>Parent Folder</label>
              <select name="parentId" className="ui fluid dropdown">
                <option value="-1">(Root)</option>
                {this.props.folders.map((folder) => {
                  return <option key={folder.id} value={folder.id}>{folder.name}</option>
                })}
              </select>
            </div>

            <div className="field">
              <label>Description</label>
              <div className="ui icon input">
                <textarea name="description" placeholder="Optional description"/>
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
