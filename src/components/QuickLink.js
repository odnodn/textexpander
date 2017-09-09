import React from 'react';

export default class QuickLink extends React.Component {
  render() {
    return (
      <div className="ui vertical menu fluid">
        <a className="active teal item">
          <span><i className="inbox icon"></i>Inbox</span>
          <div className="ui teal left pointing label">{this.props.numInbox ? this.props.numIndox : 0}</div>
        </a>
        <a className="item">
          <span><i className="calendar icon"></i>Today</span>
          <div className="ui label">{this.props.numToday ? this.props.numToday : 0}</div>
        </a>
        <a className="item">
          <span><i className="calendar icon"></i>Next 7 days</span>
          <div className="ui label">{this.props.num7Days ? this.props.num7Days : 0}</div>
        </a>
        <div className="item">
          <div className="ui transparent icon input">
            <input type="text" placeholder="Filter ..."/>
            <i className="search icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
