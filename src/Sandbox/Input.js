import React from 'react';

export default class Input extends React.Component {
  render() {
    return (
          <div className="column">
            <div className="ui two column stackable grid">
              <div className="column">

                <div className="ui action left icon input">
                  <i className="search icon"></i>
                  <input type="text" placeholder="Search..."/>
                  <div className="ui teal button">Search</div>
                </div>

                <div className="ui divider"></div>
                <div className="ui input error">
                  <input placeholder="Search..." type="text"/>
                </div>
                <div className="ui divider"></div>

                <div className="ui right labeled input">
                  <input placeholder="Placeholder" type="text"/>
                  <div className="ui dropdown label">
                    <div className="text">Dropdown</div>
                    <i className="dropdown icon"></i>
                    <div className="menu">
                      <div className="item">Choice 1</div>
                      <div className="item">Choice 2</div>
                      <div className="item">Choice 3</div>
                    </div>
                  </div>
                </div>
                <div className="ui divider"></div>

                <div className="ui transparent icon input">
                  <input placeholder="Search..." type="text"/>
                  <i className="search icon"></i>
                </div>
                <div className="ui transparent left icon input">
                  <input placeholder="Search..." type="text"/>
                  <i className="search icon"></i>
                </div>
                <div className="ui divider"></div>
                <div className="ui left icon input loading">
                  <input placeholder="Loading..." type="text"/>
                  <i className="search icon"></i>
                </div>

                <div className="ui icon input loading">
                  <input placeholder="Loading..." type="text"/>
                  <i className="search icon"></i>
                </div>

              </div>
              <div className="column">
                <div className="ui right labeled left icon input">
                  <i className="tags icon"></i>
                  <input placeholder="Enter tags" type="text"/>
                  <a className="ui tag label">
                    Add Tag
                  </a>
                </div>
                <div className="ui divider"></div>
                <div className="ui labeled input">
                  <a className="ui label">
                    Label
                  </a>
                  <input type="text" placeholder="Placeholder..."/>
                </div>
                <div className="ui divider"></div>
                <div className="ui right labeled input">
                  <input type="text" placeholder="Placeholder..."/>
                  <a className="ui label">
                    Label
                  </a>
                </div>
                <div className="ui divider"></div>
                <div className="ui labeled icon input">
                  <div className="ui label">
                    http://
                  </div>
                  <input type="text" placeholder="domain.com"/>
                  <i className="add circle link icon"></i>
                </div>
                <div className="ui right action input">
                  <input type="text" placeholder="domain.com"/>
                  <div className="ui teal button">
                    <i className="add icon"></i>
                    Add
                  </div>
                </div>
                <div className="ui divider"></div>
                <div className="ui corner labeled input">
                  <input type="text" placeholder="Required Field"/>
                  <div className="ui corner label">
                    <i className="asterisk icon"></i>
                  </div>
                </div>

              </div>
            </div>
          </div>
    );
  }
}
