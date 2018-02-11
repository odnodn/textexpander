import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainWindow from './MainWindow';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainWindow />, document.getElementById('root'));
registerServiceWorker();
