import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.sass'
import { App } from './components/app/app';
import { store } from './store';
import { fetchUsersAction, fetchItemsAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchUsersAction());
store.dispatch(fetchItemsAction());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
