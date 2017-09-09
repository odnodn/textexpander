import React from 'react';
import QuickLink from '../components/QuickLink'
import NavigationTabView from '../components/NavigationTabView'

export default class Left extends React.Component {
  render() {
    return (
      <div className="ui segment">
        <QuickLink/>
        <div className="ui divider"></div>
        <NavigationTabView/>
      </div>
    );
  }
}
