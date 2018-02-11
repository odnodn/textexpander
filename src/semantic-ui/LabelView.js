import React from 'react';

export default class LabelView extends React.Component {
  render() {
    return (
      <div className="ui segment">
        {this.props.content}
      </div>
    );
  }
}
