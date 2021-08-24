import * as Sentry from '@sentry/browser';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import configureStore from './redux/store';

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

if (window.config?.sentry?.dsn !== undefined) {
  Sentry.init({
    dsn: window.config.sentry.dsn,
    release: window.config.sentry.release,
    environment: window.config.sentry.environment,
  });
}

const { store, persistor } = configureStore();

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
