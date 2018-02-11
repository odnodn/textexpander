import React from 'react';

export default class TaskListItem extends React.Component {
  render() {
    return (
      <div className="item">
        <div className="right floated content">
          <i className="large ellipsis vertical icon"/>
        </div>
        <i className="big thin circle icon"/>
        <div className="content">
          {this.props.content}
        </div>
      </div>
    );
  }
}
