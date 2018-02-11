import React from 'react'

export function SettingsButton()
{
  return (
    <div className="ui dropdown icon item">
      <i className="setting large icon"/>
      <i className="dropdown icon"></i>
      <div className="menu">
        <div className="item">Action</div>
        <div className="item">Another Action</div>
        <div className="item">Something else here</div>
        <div className="divider"></div>
        <div className="item">Separated Link</div>
        <div className="divider"></div>
        <div className="item">One more separated link</div>
      </div>
    </div>
  );
}
