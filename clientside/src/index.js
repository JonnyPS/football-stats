import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chart from './Chart';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('inputBox'));
// ReactDOM.render(<Chart />, document.getElementById('chartHolder'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
