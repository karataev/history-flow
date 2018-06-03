import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import AppStore from "./state/AppStore";
import data from './data/data';

const appStore = new AppStore(data);

ReactDOM.render(<App appStore={appStore} />, document.getElementById('root'));
