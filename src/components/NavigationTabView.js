import React from 'react';
import ProjectView from './ProjectView'
import LabelView from './LabelView'

export default class NavigationTabView extends React.Component {
  render() {
    return (
      <div>
        <div className="ui top attached tabular menu">
          <a className="item active" data-tab="projects">Projects</a>
          <a className="item" data-tab="lables">Labels</a>
          <a className="item" data-tab="others">Others</a>
        </div>
        <div className="ui bottom attached tab segment active" data-tab="projects">
          <ProjectView/>
        </div>
        <div className="ui bottom attached tab segment" data-tab="lables">
          <LabelView/>
        </div>
        <div className="ui bottom attached tab segment" data-tab="others">
          others
        </div>
      </div>
    );
  }
}
