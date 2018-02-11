import React, { Component } from 'react'

export default class EditPhraseForm extends Component
{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ui icon input">
        <input className="" type="text" placeholder="Add phrase..."/>
        <i className="comment outline icon"></i>
      </div>
    )
  }

}
