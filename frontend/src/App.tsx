import React from 'react';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { history } from 'services/router';
import { Router } from 'react-router-dom';

import AppCrashFallback from './components/AppCrashFallback';
import ErrorBoundary from './components/ErrorBoundary';
import Root from './components/Root';
import Routes from './routes';

interface Props {
  persistor: Persistor;
  store: Store;
}

const App: React.FunctionComponent<Props> = ({ persistor, store }) => (
  <ErrorBoundary FallbackComponent={AppCrashFallback}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Root>
            <Routes />
          </Root>
        </Router>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);

export default App;
