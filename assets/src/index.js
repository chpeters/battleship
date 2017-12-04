import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import App from './components/App/App.js';
import reducers from './reducers';
import './index.css';
import registerServiceWorker from './registerServiceWorker'

const initialState = {}

const middleware = [
	thunk,
	logger
]

const enhancers = applyMiddleware(...middleware)

const store = createStore(
	reducers,
	initialState,
	enhancers
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker()