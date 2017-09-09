import React from 'react'
import ReactDOM from 'react-dom'
 
var HelloBox = React.createClass({
 
  render: function() {
    return (
      <div className="helloTag">
      Hello world!!! ElectronReactJs
      </div>
    );
  }
});
 
ReactDOM.render(<HelloBox/>, document.getElementById('helloTag'));
