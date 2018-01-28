import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchWindow from './SearchWindow';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SearchWindow />, document.getElementById('root'));
registerServiceWorker();
