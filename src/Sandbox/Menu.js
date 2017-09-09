import React from 'react';

export default class Menu extends React.Component {
  render() {
    return (
          <div className="column">
            <div className="ui menu">
              <div className="header item">Brand</div>
              <a className="active item">Link</a>
              <a className="item">Link</a>
              <div className="ui dropdown item">
                Dropdown
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
              <div className="right menu">
                <div className="item">
                  <div className="ui action left icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Search"/>
                    <button className="ui button">Submit</button>
                  </div>
                </div>
                <a className="item">Link</a>
              </div>
            </div>
            <div className="ui inverted menu">
              <div className="header item">Brand</div>
              <div className="active item">Link</div>
              <a className="item">Link</a>
              <div className="ui dropdown item">
                Dropdown
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
              <div className="right menu">
                <div className="item">
                  <div className="ui transparent inverted icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Search"/>
                  </div>
                </div>
                <a className="item">Link</a>
              </div>
            </div>

            <div className="ui secondary menu">
              <div className="active item">Link</div>
              <a className="item">Link</a>
              <div className="ui dropdown item">
                Dropdown
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
              <div className="right menu">
                <div className="item">
                  <div className="ui action left icon input">
                    <i className="search icon"></i>
                    <input type="text" placeholder="Search"/>
                    <button className="ui button">Submit</button>
                  </div>
                </div>
                <div className="ui dropdown item">
                  Dropdown Left<i className="dropdown icon"></i>
                  <div className="menu">
                    <a className="item">Link</a>
                    <a className="item">Link</a>
                    <div className="divider"></div>
                    <div className="header">Header</div>
                    <div className="item">
                      <i className="dropdown icon"></i>
                      Sub Menu
                      <div className="menu">
                        <a className="item">Link</a>
                        <div className="item">
                          <i className="dropdown icon"></i>
                          Sub Sub Menu
                          <div className="menu">
                            <a className="item">Link</a>
                            <a className="item">Link</a>
                          </div>
                        </div>
                        <a className="item">Link</a>
                      </div>
                    </div>
                    <a className="item">Link</a>
                  </div>
                </div>
                <a className="item">Link</a>
              </div>
            </div>

            <div className="ui three column doubling grid">
              <div className="column">
                <div className="ui secondary pointing menu">
                  <div className="active item">Link</div>
                  <a className="item">Link</a>
                  <a className="item">Link</a>
                </div>
              </div>

              <div className="column">
                <div className="ui tabular menu">
                  <div className="active item">Link</div>
                  <a className="item">Link</a>
                  <a className="item">Link</a>
                </div>
              </div>

              <div className="column">
                <div className="ui pointing menu">
                  <div className="active item">Link</div>
                  <a className="item">Link</a>
                  <div className="right item">
                    Right Text
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
  }
}
