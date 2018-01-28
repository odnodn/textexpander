import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TrayWindow from './TrayWindow';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TrayWindow />, document.getElementById('root'));
registerServiceWorker();
