import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, } from 'react-router-dom';

sessionStorage.setItem('app', JSON.stringify(store.getState().app));

store.subscribe(() => {
  sessionStorage.setItem('app', JSON.stringify(store.getState().app));
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);