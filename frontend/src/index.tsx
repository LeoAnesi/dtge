import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { store, persistor } from './redux/store';

declare global {
  interface Window {
    config?: {
      sentry?: {
        dsn: string;
        release: string;
        environment: string;
      };
    };
  }
}

const rootEl = document.getElementById('root');

if (rootEl) {
  ReactDOM.render(<App store={store} persistor={persistor} />, rootEl);
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default; // eslint-disable-line
    if (rootEl) {
      ReactDOM.render(<NextApp store={store} persistor={persistor} />, rootEl);
    }
  });
}
