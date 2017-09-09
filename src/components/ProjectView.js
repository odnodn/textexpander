import React from 'react';

export default class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {date: new Date()};
  }

  renderItem(item, index) {
    var sublist = null;
    if(item.list && item.list.length > 0)
    {
      const subitems = item.list.map((subitem, index) =>
        this.renderItem(subitem, index)
      )
      sublist = (<div className="list">
        {subitems}
        </div>
      )
    }
    return (<div className="item" key={index}>
      <i className="folder icon"></i>
      <div className="content">
        <div className="header">{item.name}</div>
        <div className="description">{item.description}</div>
        {sublist}
      </div>
    </div>);
  }

  render() {
    const items = [
      {name:"Administrative", description:"all adiministrative tasks",
        list: [
          {name:"home"},
          {name:"buy"}
        ]
      },
      {name:"Office"}
    ]

    const list = items.map((item, index) =>
      this.renderItem(item, index)
    )

    return (
      <div className="ui list">
        {list}
      </div>
    );
  }
}
