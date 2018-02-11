import React from 'react';
import TaskListItem from './TaskListItem'

export default class TaskListView extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {date: new Date()};
  }

  render() {
    const tasks = [{title:'Lena'},{title:'Lindsay'},{title:'Mark'},{title:'molly'}];
    const listItems = tasks.map((task, index) =>
      <TaskListItem key={index} content={task.title}/>
    );
    return (
      <div>
        <h2>{this.props.title}</h2>
        <div className="ui middle aligned divided list">
          {listItems}
        </div>
      </div>
    );
  }
}
