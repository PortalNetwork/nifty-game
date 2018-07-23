import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppContainer from './container/AppContainer';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, 
  document.getElementById('root'));
registerServiceWorker();
