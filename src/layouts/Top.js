import React from 'react';
import {Logo} from '../components/Logo'
import {SettingsButton} from '../components/SettingsButton'
import NotiButton from '../components/NotiButton'
import {SearchInput} from '../components/SearchInput'
import {NewTaskButton} from '../components/NewTaskButton'

export default class Top extends React.Component {
  render() {
    return (

        <div className="ui menu">
          <div className="ui left floated menu">
            <Logo/>
          </div>

          <div className="ui right menu">
            <SearchInput/>
            <NewTaskButton/>
            <NotiButton/>
            <SettingsButton/>
          </div>
        </div>


    );
  }
}
