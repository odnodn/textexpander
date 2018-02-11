import React from 'react';

const items = [
  {name:"Administrative", description:"all adiministrative tasks",
    list: [
      {name:"home" ,list: [{name:"chores"}]},
      {name:"buy"}
    ]
  },
  {name:"Office"}
]

export default class ProjectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"items": items};
  }

  renderList(list) {
    if(!list || list.length == 0)
      return null;

    const subitems = list.map((subitem, index) =>
      this.renderItem(subitem, index)
    )
    return (<div className="list">
      {subitems}
      </div>
    )
  }

  renderItem(item, index) {
    return (<div className="item" key={index}>
      <i className="folder icon"></i>
      <div className="content">
        <div className="header">{item.name}</div>
        <div className="description">{item.description}</div>
        {this.renderList(item.list)}
      </div>
    </div>);
  }

  render() {
    const list = this.state.items.map((item, index) =>
      this.renderItem(item, index)
    )

    return (
      <div className="ui list">
        {list}
      </div>
    );
  }
}
