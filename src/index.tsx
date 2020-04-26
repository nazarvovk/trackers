import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import reducers from './redux/reducers';
import { getLocalStorageState, saveToLocalStorageObserver, mapLocalStorageToState } from './utils';

const localStorageState = getLocalStorageState();
const store = createStore(
  combineReducers(reducers),
  localStorageState && mapLocalStorageToState(localStorageState),
  composeWithDevTools(),
);

saveToLocalStorageObserver(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
