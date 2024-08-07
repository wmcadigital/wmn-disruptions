// IE 11 support
import 'react-app-polyfill/stable';
// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './components/App/App';
// Sentry logging
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://eec42d9779ba42eb84fa9623942bd149@o378798.ingest.sentry.io/5272889' });
}

const root = ReactDOM.createRoot(document.getElementById('disruptionsApp'));
root.render(
  <Sentry.ErrorBoundary>
    <App />
  </Sentry.ErrorBoundary>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
